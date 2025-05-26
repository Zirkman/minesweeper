# 🚀 GitHub Pages Deployment Guide

Follow these steps to deploy your Minesweeper game to GitHub Pages:

## Step 1: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "minesweeper" or "minesweeper-game")
5. Make sure it's set to "Public"
6. Don't initialize with README (we already have one)
7. Click "Create repository"

## Step 2: Upload Your Files

### Option A: Using Git Command Line

```bash
# Initialize git in your project folder
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Modern Minesweeper game"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Option B: Using GitHub Web Interface

1. On your new repository page, click "uploading an existing file"
2. Drag and drop all your files (`index.html`, `styles.css`, `script.js`, `README.md`)
3. Add a commit message like "Add Minesweeper game files"
4. Click "Commit changes"

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch
6. Select "/ (root)" as the folder
7. Click "Save"

## Step 4: Access Your Game

After a few minutes, your game will be available at:
```
https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME
```

## Step 5: Update the README

1. Edit the `README.md` file in your repository
2. Update the demo link to your actual GitHub Pages URL
3. Replace "yourusername" with your actual GitHub username

## 🎉 That's it!

Your modern Minesweeper game is now live and accessible to anyone on the internet!

## 🔄 Making Updates

To update your game:

1. Make changes to your local files
2. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Update game features"
   git push
   ```
3. GitHub Pages will automatically update your live site

## 🌐 Custom Domain (Optional)

If you have a custom domain:

1. Create a `CNAME` file in your repository root
2. Add your domain name (e.g., `minesweeper.yourdomain.com`)
3. Configure your domain's DNS to point to GitHub Pages
4. Enable "Enforce HTTPS" in repository settings

## 📱 Sharing Your Game

Share your game with friends using:
- Direct link: `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`
- QR code generators for mobile sharing
- Social media posts with screenshots

Enjoy your deployed game! 🎮✨ 