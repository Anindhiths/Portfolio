# Anindhith Sankanna - Interactive Portfolio Website

A modern, interactive portfolio website featuring a resume, project showcase, and engaging mini-games built with HTML, CSS, and JavaScript.

## 🌟 Features

### 📱 Multi-Page Website
- **Home Page** - Introduction with Dino Jump game
- **Resume Page** - Professional resume with Flappy Bird game
- **Projects Page** - Showcase of featured projects with Escape the Maze game
- **Contact Page** - Contact information and social links

### 🎮 Interactive Mini-Games

#### 1. **Dino Jump** (Home Page)
- Classic dinosaur jumping game
- Avoid cacti and flying pterodactyls
- Increasing difficulty as score increases
- High score tracking with localStorage
- **Controls**: Space bar or tap to jump

#### 2. **Flappy Bird** (Resume Page)
- Navigate through moving pipes
- Smooth bird physics with rotation animation
- Beautiful gradient backgrounds
- Game over overlay with restart option
- **Controls**: Space bar or click to flap

#### 3. **Escape the Maze** (Projects Page)
- 15 unique, solvable maze designs
- Randomized maze generation after each escape
- Guaranteed solutions - no dead ends
- Varied difficulty levels
- **Controls**: WASD keys to move

### 🎨 Design Features
- **Dark/Light Mode Toggle** - Automatic system preference detection with manual override
- **Responsive Design** - Mobile-optimized with smooth animations
- **Professional Styling** - Modern UI with gradients, shadows, and transitions
- **Smooth Animations** - Canvas-based games with requestAnimationFrame
- **localStorage Support** - High scores persist across sessions

## 📋 Project Information

### About
B.E. Computer Science student at RV Institute of Technology and Management with a strong foundation in Software Engineering and passion for financial analysis.

### Key Projects Featured
- **Overruled!** - Interactive courtroom drama game on Monad blockchain with AI-powered characters
- **Reverse the Sign** - 2D game entry for GMTK 2023 Game Jam
- **Tetris** - Classic block-stacking game built with Python and Pygame
- **Amazon Discount Checker** - Automated product monitoring tool
- **Movie Recommender** - AI-based recommendation system using TensorFlow

### Technologies
- **Languages**: C++, C, Java, Python, C#, SQL
- **Web**: HTML5, CSS3, JavaScript (ES6+)
- **Frameworks**: React Native, TensorFlow/PyTorch
- **Tools**: MySQL, MongoDB, Google Cloud Platform, Docker

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anindhiths/portfolio.git
   cd portfolio
   ```

2. **Open locally**
   ```bash
   # Simply open index.html in your browser
   open index.html
   ```

3. **Or use a local server**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

## 📁 Project Structure

```
portfolio/
├── index.html              # Home page
├── resume.html             # Resume page
├── projects.html           # Projects showcase
├── contact.html            # Contact page
├── assets/
│   ├── styles.css          # Main stylesheet with dark/light mode
│   └── script.js           # Game logic and theme manager
└── README.md               # This file
```

## 🎮 Game Details

### Dino Jump
- **Objective**: Jump over obstacles to survive
- **Scoring**: Score increases over time
- **Difficulty**: Increases with higher scores
- **High Score**: Saved in localStorage

### Flappy Bird
- **Objective**: Navigate through pipe gaps
- **Scoring**: +1 point per pipe passed
- **Difficulty**: Random pipe heights
- **Game Over**: Collision with pipes or ground

### Escape the Maze
- **Objective**: Navigate from start to exit
- **Mazes**: 15 unique, solvable designs
- **Randomization**: New maze after each escape
- **Difficulty**: Varies from simple paths to complex branching

## 🎨 Maze Designs

All 15 mazes feature:
- ✅ Guaranteed solutions
- ✅ No blocked exits
- ✅ Varied complexity levels
- ✅ Proven maze design principles

**Maze Types**:
1. Simple L-shaped path
2. Simple zigzag
3. T-shaped maze
4. Cross maze
5. Spiral path
6. Double corridor
7. Winding path
8. Ladder with gaps
9. Simple chambers
10. Branching paths
11. Offset corridors
12. Staircase pattern
13. Hourglass shape
14. Rectangular chambers
15. Twisted path

## 🌓 Dark/Light Mode

- **Auto-Detection**: Respects system preference (prefers-color-scheme)
- **Manual Toggle**: Click the 🌙/☀️ button in the header
- **Persistence**: Theme preference saved in localStorage
- **Smooth Transitions**: CSS transitions for theme switching

## 💾 Data Storage

The portfolio uses browser localStorage to persist:
- `as_portfolio_theme` - Dark/light mode preference
- `runner_high` - Dino Jump high score
- `flappy_high` - Flappy Bird high score
- `maze_high` - Escape the Maze high score (if implemented)

## 📱 Browser Compatibility

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Requirements**: Canvas API support, ES6 JavaScript

## 🔗 Links

- **Email**: [anindhiths@gmail.com](mailto:anindhiths@gmail.com)
- **LinkedIn**: [linkedin.com/in/anindhith-s/](https://www.linkedin.com/in/anindhith-s/)
- **GitHub**: [github.com/Anindhiths](https://github.com/Anindhiths)

### Featured Projects
- [Overruled!](https://github.com/Anindhiths/Overruled) - Courtroom drama game on blockchain
- [Tetris](https://github.com/Anindhiths/Tetris) - Classic game with Pygame
- [Amazon Discount Checker](https://github.com/Anindhiths/Amazon-Discount-Checker) - Price monitoring tool
- [Movie Recommender](https://github.com/Anindhiths/Movie-Reccomender) - AI recommendation system

## 🚀 Deployment

### GitHub Pages

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/Anindhiths/portfolio.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose `main` branch and `/root` folder
   - Save

3. **Access your portfolio**
   - Live at: `https://anindhiths.github.io/portfolio/`

### Other Hosting Options
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront

## 🎯 Performance

- **No External Dependencies**: Pure HTML, CSS, JavaScript
- **Optimized Canvas Rendering**: requestAnimationFrame for smooth 60fps
- **Efficient Collision Detection**: O(n) complexity
- **Minimal Bundle Size**: ~50KB total (HTML + CSS + JS)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest improvements
- Add new games
- Enhance existing features

## 📧 Contact

For inquiries or collaboration opportunities:
- **Email**: anindhiths@gmail.com
- **LinkedIn**: [Anindhith S](https://www.linkedin.com/in/anindhith-s/)
- **GitHub**: [@Anindhiths](https://github.com/Anindhiths)

---

**Last Updated**: 2024
**Version**: 1.0.0

Made with ❤️ by Anindhith Sankanna
