# 💎 Minesweeper - Modern Edition

A beautiful, modern take on the classic Minesweeper game with stunning visual effects and unconventional graphics.

## 🎮 Live Demo

[Play the game here!](https://yourusername.github.io/minesweeper)

## ✨ Features

### 🎨 Modern Design
- **Glassmorphism UI** - Beautiful frosted glass effects throughout the interface
- **Gradient Backgrounds** - Dynamic animated gradients that shift and move
- **Particle Effects** - Stunning particle animations for interactions and events
- **Smooth Animations** - Fluid transitions and hover effects
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

### 🎯 Game Features
- **Three Difficulty Levels**:
  - Easy: 9×9 grid with 10 mines
  - Medium: 16×16 grid with 40 mines
  - Hard: 30×16 grid with 99 mines
- **Smart First Click** - Never hit a mine on your first click
- **Auto-reveal** - Empty cells automatically reveal their neighbors
- **Flag System** - Right-click to flag suspected mines
- **Timer** - Track your solving time
- **Mine Counter** - Keep track of remaining mines
- **Visual Feedback** - Different colors for different mine counts

### 🎪 Visual Effects
- **Explosion Particles** - Dramatic effects when hitting a mine
- **Win Celebration** - Confetti-like particles when you win
- **Mouse Trail** - Subtle particle trail following your cursor
- **Hover Effects** - Cells light up and scale on hover
- **Animated Icons** - Rotating gem icon and pulsing flags

## 🚀 How to Play

1. **Start the Game**: Click any cell to begin
2. **Reveal Cells**: Left-click to reveal what's under a cell
3. **Flag Mines**: Right-click to flag cells you think contain mines
4. **Use Numbers**: Numbers show how many mines are adjacent to that cell
5. **Win Condition**: Reveal all cells that don't contain mines
6. **Lose Condition**: Click on a mine and the game ends

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Advanced styling with:
  - CSS Grid for the game board
  - Flexbox for layouts
  - CSS animations and transitions
  - Backdrop filters for glassmorphism
  - CSS gradients and custom properties
- **Vanilla JavaScript** - Game logic and interactions:
  - ES6+ classes and modules
  - Event handling
  - DOM manipulation
  - Particle system

## 📱 Browser Support

- ✅ Chrome 88+
- ✅ Firefox 94+
- ✅ Safari 14+
- ✅ Edge 88+

## 🚀 Deployment to GitHub Pages

### Quick Setup

1. **Fork this repository** or create a new one with these files
2. **Go to your repository settings**
3. **Scroll down to "Pages" section**
4. **Select "Deploy from a branch"**
5. **Choose "main" branch and "/ (root)" folder**
6. **Click Save**

Your game will be available at: `https://yourusername.github.io/repository-name`

### Custom Domain (Optional)

1. Add a `CNAME` file with your domain name
2. Configure your domain's DNS to point to GitHub Pages
3. Enable "Enforce HTTPS" in repository settings

## 📁 Project Structure

```
minesweeper/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # Game logic and JavaScript
├── README.md           # This file
└── CNAME              # Custom domain (optional)
```

## 🎨 Customization

### Changing Colors
Edit the CSS custom properties in `styles.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --accent-color: #4ecdc4;
  --danger-color: #ff6b6b;
}
```

### Adjusting Difficulty
Modify the difficulty settings in `script.js`:

```javascript
this.difficulties = {
    easy: { rows: 9, cols: 9, mines: 10 },
    medium: { rows: 16, cols: 16, mines: 40 },
    hard: { rows: 16, cols: 30, mines: 99 }
};
```

### Adding New Particle Effects
Extend the particle system in the `createParticle` method to add new visual effects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the classic Microsoft Minesweeper
- Modern design trends and glassmorphism effects
- Particle effects inspired by modern web animations

---

**Enjoy playing! 🎮✨**

*Made with ❤️ and modern web technologies* 