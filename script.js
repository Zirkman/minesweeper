class MinesweeperGame {
    constructor() {
        this.board = [];
        this.gameState = 'waiting'; // waiting, playing, won, lost
        this.timer = 0;
        this.timerInterval = null;
        this.firstClick = true;
        
        // Difficulty settings
        this.difficulties = {
            easy: { rows: 9, cols: 9, mines: 10 },
            medium: { rows: 16, cols: 16, mines: 40 },
            hard: { rows: 16, cols: 30, mines: 99 }
        };
        
        this.currentDifficulty = 'medium';
        this.settings = this.difficulties[this.currentDifficulty];
        
        this.initializeElements();
        this.bindEvents();
        this.createBoard();
    }
    
    initializeElements() {
        this.gameBoard = document.getElementById('game-board');
        this.minesCount = document.getElementById('mines-count');
        this.timerDisplay = document.getElementById('timer');
        this.gameStatus = document.getElementById('game-status');
        this.statusMessage = this.gameStatus.querySelector('.status-message');
        this.newGameBtn = document.getElementById('new-game');
        this.difficultySelect = document.getElementById('difficulty');
        this.particlesContainer = document.getElementById('particles');
    }
    
    bindEvents() {
        this.newGameBtn.addEventListener('click', () => this.newGame());
        this.difficultySelect.addEventListener('change', (e) => {
            this.currentDifficulty = e.target.value;
            this.settings = this.difficulties[this.currentDifficulty];
            this.newGame();
        });
        
        // Prevent context menu on right click
        document.addEventListener('contextmenu', (e) => {
            if (e.target.classList.contains('cell')) {
                e.preventDefault();
            }
        });
    }
    
    createBoard() {
        this.board = [];
        this.gameBoard.innerHTML = '';
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.settings.cols}, 1fr)`;
        
        // Initialize board data
        for (let row = 0; row < this.settings.rows; row++) {
            this.board[row] = [];
            for (let col = 0; col < this.settings.cols; col++) {
                this.board[row][col] = {
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                };
            }
        }
        
        // Create DOM elements
        for (let row = 0; row < this.settings.rows; row++) {
            for (let col = 0; col < this.settings.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.addEventListener('click', (e) => this.handleCellClick(e));
                cell.addEventListener('contextmenu', (e) => this.handleRightClick(e));
                
                this.gameBoard.appendChild(cell);
            }
        }
        
        this.updateMinesCount();
        this.updateStatus('Click a cell to start!');
    }
    
    placeMines(excludeRow, excludeCol) {
        let minesPlaced = 0;
        
        while (minesPlaced < this.settings.mines) {
            const row = Math.floor(Math.random() * this.settings.rows);
            const col = Math.floor(Math.random() * this.settings.cols);
            
            // Don't place mine on first click or if already has mine
            if ((row === excludeRow && col === excludeCol) || this.board[row][col].isMine) {
                continue;
            }
            
            this.board[row][col].isMine = true;
            minesPlaced++;
        }
        
        this.calculateNeighborMines();
    }
    
    calculateNeighborMines() {
        for (let row = 0; row < this.settings.rows; row++) {
            for (let col = 0; col < this.settings.cols; col++) {
                if (!this.board[row][col].isMine) {
                    this.board[row][col].neighborMines = this.countNeighborMines(row, col);
                }
            }
        }
    }
    
    countNeighborMines(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                
                if (newRow >= 0 && newRow < this.settings.rows && 
                    newCol >= 0 && newCol < this.settings.cols &&
                    this.board[newRow][newCol].isMine) {
                    count++;
                }
            }
        }
        return count;
    }
    
    handleCellClick(e) {
        if (this.gameState === 'won' || this.gameState === 'lost') return;
        
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const cell = this.board[row][col];
        
        if (cell.isFlagged || cell.isRevealed) return;
        
        // First click - place mines
        if (this.firstClick) {
            this.placeMines(row, col);
            this.startTimer();
            this.gameState = 'playing';
            this.firstClick = false;
        }
        
        this.revealCell(row, col);
        this.checkWinCondition();
    }
    
    handleRightClick(e) {
        e.preventDefault();
        
        if (this.gameState === 'won' || this.gameState === 'lost') return;
        
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const cell = this.board[row][col];
        
        if (cell.isRevealed) return;
        
        this.toggleFlag(row, col);
    }
    
    revealCell(row, col) {
        const cell = this.board[row][col];
        const cellElement = this.getCellElement(row, col);
        
        if (cell.isRevealed || cell.isFlagged) return;
        
        cell.isRevealed = true;
        cellElement.classList.add('revealed');
        
        if (cell.isMine) {
            cellElement.textContent = '💣';
            cellElement.classList.add('mine');
            this.gameOver(false);
            this.createExplosionParticles(cellElement);
            return;
        }
        
        if (cell.neighborMines > 0) {
            cellElement.textContent = cell.neighborMines;
            cellElement.classList.add(`num-${cell.neighborMines}`);
        } else {
            // Auto-reveal neighbors for empty cells
            this.revealNeighbors(row, col);
        }
        
        this.createRevealParticles(cellElement);
    }
    
    revealNeighbors(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                const newRow = row + i;
                const newCol = col + j;
                
                if (newRow >= 0 && newRow < this.settings.rows && 
                    newCol >= 0 && newCol < this.settings.cols) {
                    setTimeout(() => this.revealCell(newRow, newCol), Math.random() * 100);
                }
            }
        }
    }
    
    toggleFlag(row, col) {
        const cell = this.board[row][col];
        const cellElement = this.getCellElement(row, col);
        
        cell.isFlagged = !cell.isFlagged;
        
        if (cell.isFlagged) {
            cellElement.textContent = '🚩';
            cellElement.classList.add('flagged');
        } else {
            cellElement.textContent = '';
            cellElement.classList.remove('flagged');
        }
        
        this.updateMinesCount();
    }
    
    getCellElement(row, col) {
        return this.gameBoard.children[row * this.settings.cols + col];
    }
    
    updateMinesCount() {
        const flaggedCount = this.board.flat().filter(cell => cell.isFlagged).length;
        this.minesCount.textContent = Math.max(0, this.settings.mines - flaggedCount);
    }
    
    startTimer() {
        this.timer = 0;
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.timerDisplay.textContent = this.timer.toString().padStart(3, '0');
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    checkWinCondition() {
        const totalCells = this.settings.rows * this.settings.cols;
        const revealedCells = this.board.flat().filter(cell => cell.isRevealed).length;
        
        if (revealedCells === totalCells - this.settings.mines) {
            this.gameOver(true);
        }
    }
    
    gameOver(won) {
        this.gameState = won ? 'won' : 'lost';
        this.stopTimer();
        
        if (won) {
            this.updateStatus('🎉 Congratulations! You won!', 'status-win');
            this.createWinParticles();
        } else {
            this.updateStatus('💥 Game Over! Try again!', 'status-lose');
            this.revealAllMines();
        }
    }
    
    revealAllMines() {
        for (let row = 0; row < this.settings.rows; row++) {
            for (let col = 0; col < this.settings.cols; col++) {
                const cell = this.board[row][col];
                if (cell.isMine && !cell.isRevealed) {
                    const cellElement = this.getCellElement(row, col);
                    cellElement.textContent = '💣';
                    cellElement.classList.add('mine');
                }
            }
        }
    }
    
    updateStatus(message, className = '') {
        this.statusMessage.textContent = message;
        this.statusMessage.className = `status-message ${className}`;
    }
    
    newGame() {
        this.gameState = 'waiting';
        this.firstClick = true;
        this.timer = 0;
        this.timerDisplay.textContent = '000';
        this.stopTimer();
        this.createBoard();
        this.clearParticles();
    }
    
    // Particle effects
    createRevealParticles(cellElement) {
        const rect = cellElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 5; i++) {
            this.createParticle(centerX, centerY, '#4ecdc4');
        }
    }
    
    createExplosionParticles(cellElement) {
        const rect = cellElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 15; i++) {
            this.createParticle(centerX, centerY, '#ff6b6b');
        }
    }
    
    createWinParticles() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                this.createParticle(x, y, '#4CAF50');
            }, i * 100);
        }
    }
    
    createParticle(x, y, color) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.background = `radial-gradient(circle, ${color}, transparent)`;
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 50 + 25;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        this.particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 3000);
    }
    
    clearParticles() {
        this.particlesContainer.innerHTML = '';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MinesweeperGame();
});

// Add some extra visual enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add subtle mouse trail effect
    let mouseTrail = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        // Keep only recent trail points
        mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 500);
        
        // Occasionally create a trail particle
        if (Math.random() < 0.1) {
            createTrailParticle(e.clientX, e.clientY);
        }
    });
    
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.animation = 'particleFloat 1s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}); 