// Enhanced portfolio with dark/light mode + Multiple mini-games
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Dark/Light mode toggle
  (function themeManager() {
    const THEME_KEY = 'as_portfolio_theme';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem(THEME_KEY);
    const isDark = saved ? saved === 'dark' : prefersDark;

    function applyTheme(dark) {
      if (dark) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
      if (btn) btn.textContent = dark ? '☀️' : '🌙';
    }

    const btn = document.createElement('button');
    btn.id = 'themeToggle';
    btn.setAttribute('aria-label', 'Toggle dark mode');
    btn.addEventListener('click', () => {
      const isDarkNow = document.body.classList.contains('dark-mode');
      applyTheme(!isDarkNow);
    });

    const nav = document.querySelector('.site-header nav');
    if (nav) nav.appendChild(btn);

    applyTheme(isDark);
  })();

  // Simple nav active state sync
  const links = document.querySelectorAll('.site-header nav a');
  links.forEach(a => {
    if (location.pathname.endsWith(a.getAttribute('href'))) a.classList.add('active');
  });

  // Determine which page we're on
  const isHome = /index\.html?$/.test(location.pathname) || location.pathname === '/' || location.pathname === '';
  const isResume = /resume\.html?$/.test(location.pathname);
  const isProjects = /projects\.html?$/.test(location.pathname);
  const isContact = /contact\.html?$/.test(location.pathname);

  const gameSection = document.getElementById('gameSection');
  if (!gameSection) return;

  // ===== DINO GAME (Home Page) =====
  if (isHome) {
    const gameSectionWrapper = document.querySelector('section.container');
    if (!gameSectionWrapper) return;

    const dinoSection = document.createElement('section');
    dinoSection.className = 'container';
    
    const gameCard = document.createElement('div');
    gameCard.className = 'card game-card';
    
    const title = document.createElement('h2');
    title.textContent = 'Dino Jump';
    
    const hint = document.createElement('p');
    hint.className = 'muted';
    hint.textContent = 'Press Space or Tap to jump. Avoid cacti and flying pterodactyls!';

    const canvas = document.createElement('canvas');
    canvas.width = 720; canvas.height = 160;
    canvas.style.width = '100%';
    canvas.style.maxWidth = '720px';
    canvas.style.display = 'block';
    canvas.style.marginTop = '12px';

    gameCard.appendChild(title);
    gameCard.appendChild(hint);
    gameCard.appendChild(canvas);
    dinoSection.appendChild(gameCard);
    gameSectionWrapper.insertAdjacentElement('afterend', dinoSection);

    const ctx = canvas.getContext('2d');
    let playing = false;
    let score = 0; let high = parseInt(localStorage.getItem('dino_high') || '0', 10);

    const G = 0.6;
    const groundY = canvas.height - 40;
    const dino = { x: 50, y: groundY - 30, w: 30, h: 30, vy: 0, jump() { if (this.y >= groundY - this.h - 0.5) { this.vy = -11; } } };
    let obstacles = [];
    let t = 0;

    function reset() {
      score = 0; t = 0; obstacles = []; dino.y = groundY - dino.h; dino.vy = 0; playing = true;
    }

    function spawnObstacle() {
      const isFlying = Math.random() < 0.3;
      const h = isFlying ? 20 : 30;
      const w = 20;
      const y = isFlying ? groundY - 60 : groundY - h;
      const gap = 300 + Math.min(200, Math.random() * (400 - Math.min(300, score)));
      const lastX = obstacles.length ? obstacles[obstacles.length - 1].x : canvas.width;
      obstacles.push({ x: Math.max(canvas.width, lastX + gap), y, w, h, isFlying });
    }

    function update() {
      if (!playing) return;
      t++;
      score += 0.1;
      dino.vy += G; dino.y += dino.vy; if (dino.y > groundY - dino.h) { dino.y = groundY - dino.h; dino.vy = 0; }

      if (t % 60 === 0) spawnObstacle();

      const speed = 6 + Math.min(6, Math.floor(score / 50));
      obstacles.forEach(o => o.x -= speed);
      obstacles = obstacles.filter(o => o.x + o.w > 0);

      for (const o of obstacles) {
        if (dino.x < o.x + o.w && dino.x + dino.w > o.x && dino.y < o.y + o.h && dino.y + dino.h > o.y) {
          playing = false;
          high = Math.max(high, Math.floor(score));
          localStorage.setItem('dino_high', String(high));
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f1f5f9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Ground
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(0, groundY, canvas.width, 4);
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, groundY + 4, 20, 2);
      }

      // Dino
      ctx.fillStyle = '#059669';
      ctx.fillRect(dino.x, dino.y, dino.w, dino.h);
      ctx.fillStyle = '#047857';
      ctx.fillRect(dino.x + 8, dino.y + 5, 6, 6);

      // Obstacles
      obstacles.forEach(o => {
        if (o.isFlying) {
          ctx.fillStyle = '#dc2626';
          ctx.beginPath();
          ctx.moveTo(o.x, o.y + o.h / 2);
          ctx.lineTo(o.x + o.w, o.y);
          ctx.lineTo(o.x + o.w, o.y + o.h);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillStyle = '#92400e';
          ctx.fillRect(o.x, o.y, o.w / 2, o.h);
          ctx.fillRect(o.x + o.w / 2 + 2, o.y, o.w / 2 - 2, o.h);
        }
      });

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 14px Inter, Arial, sans-serif';
      ctx.fillText('Score: ' + Math.floor(score) + '  High: ' + high + (playing ? '' : '  — Press Space/Tap to restart'), 10, 18);
    }

    function loop() { update(); draw(); requestAnimationFrame(loop); }
    function onJump() { if (!playing) reset(); else dino.jump(); }
    window.addEventListener('keydown', (e) => { if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); onJump(); } });
    canvas.addEventListener('pointerdown', onJump);

    reset();
    loop();
  }

  // ===== FLAPPY BIRD GAME (Resume Page) =====
  if (isResume) {
    const gameCard = document.createElement('div');
    gameCard.className = 'card game-card';
    
    const title = document.createElement('h2');
    title.textContent = 'Flappy Bird';
    
    const hint = document.createElement('p');
    hint.className = 'muted';
    hint.textContent = 'Press Space or Click to flap. Navigate through the pipes! Avoid hitting walls or ground.';

    const canvas = document.createElement('canvas');
    canvas.width = 500; canvas.height = 350;
    canvas.style.width = '100%';
    canvas.style.maxWidth = '500px';
    canvas.style.display = 'block';
    canvas.style.marginTop = '12px';

    gameCard.appendChild(title);
    gameCard.appendChild(hint);
    gameCard.appendChild(canvas);
    gameSection.appendChild(gameCard);

    const ctx = canvas.getContext('2d');
    let playing = false;
    let score = 0; let high = parseInt(localStorage.getItem('flappy_high') || '0', 10);

    const bird = { x: 80, y: canvas.height / 2, w: 24, h: 24, vy: 0, rotation: 0 };
    const gravity = 0.5;
    const flapPower = -9;
    let pipes = [];
    let frameCount = 0;
    let gameOver = false;

    function reset() {
      score = 0; frameCount = 0; pipes = []; bird.y = canvas.height / 2; bird.vy = 0; bird.rotation = 0; playing = true; gameOver = false;
    }

    function spawnPipe() {
      const gap = 100;
      const minH = 50;
      const maxH = canvas.height - gap - minH;
      const h = minH + Math.random() * (maxH - minH);
      pipes.push({ x: canvas.width, top: h, gap, scored: false });
    }

    function update() {
      if (!playing) return;
      frameCount++;
      bird.vy += gravity;
      bird.y += bird.vy;
      bird.rotation = Math.min(Math.PI / 4, bird.vy * 0.05);

      if (frameCount % 90 === 0) spawnPipe();

      pipes.forEach(p => p.x -= 5);
      pipes = pipes.filter(p => p.x + 60 > 0);

      for (const p of pipes) {
        if (!p.scored && bird.x + bird.w > p.x && bird.x < p.x + 60) {
          if (bird.y < p.top || bird.y + bird.h > p.top + p.gap) {
            playing = false;
            gameOver = true;
            high = Math.max(high, score);
            localStorage.setItem('flappy_high', String(high));
          }
        }
        if (!p.scored && bird.x > p.x + 60) {
          p.scored = true;
          score++;
        }
      }

      if (bird.y + bird.h > canvas.height || bird.y < 0) {
        playing = false;
        gameOver = true;
        high = Math.max(high, score);
        localStorage.setItem('flappy_high', String(high));
      }
    }

    function draw() {
      // Sky gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#87ceeb');
      gradient.addColorStop(1, '#e0f6ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ground
      ctx.fillStyle = '#8b7355';
      ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
      ctx.fillStyle = '#a0826d';
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.fillRect(i, canvas.height - 30, 20, 10);
      }

      // Bird with rotation
      ctx.save();
      ctx.translate(bird.x + bird.w / 2, bird.y + bird.h / 2);
      ctx.rotate(bird.rotation);
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(0, 0, bird.w / 2, bird.h / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(6, -4, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Pipes with gradient
      pipes.forEach(p => {
        const pipeGradient = ctx.createLinearGradient(p.x, 0, p.x + 60, 0);
        pipeGradient.addColorStop(0, '#1f2937');
        pipeGradient.addColorStop(1, '#374151');
        ctx.fillStyle = pipeGradient;
        ctx.fillRect(p.x, 0, 60, p.top);
        ctx.fillRect(p.x, p.top + p.gap, 60, canvas.height - p.top - p.gap);
        
        // Pipe caps
        ctx.fillStyle = '#111827';
        ctx.fillRect(p.x - 5, p.top - 8, 70, 8);
        ctx.fillRect(p.x - 5, p.top + p.gap, 70, 8);
      });

      // Score display
      ctx.fillStyle = '#000';
      ctx.font = 'bold 20px Inter, Arial, sans-serif';
      ctx.fillText('Score: ' + score, 20, 35);
      ctx.font = 'bold 16px Inter, Arial, sans-serif';
      ctx.fillText('High: ' + high, 20, 60);

      if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 32px Inter, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = 'bold 18px Inter, Arial, sans-serif';
        ctx.fillText('Press Space or Click to restart', canvas.width / 2, canvas.height / 2 + 30);
        ctx.textAlign = 'left';
      }
    }

    function loop() { update(); draw(); requestAnimationFrame(loop); }
    function flap() { if (!playing) reset(); else bird.vy = flapPower; }
    window.addEventListener('keydown', (e) => { if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); flap(); } });
    canvas.addEventListener('pointerdown', flap);

    reset();
    loop();
  }

  // ===== MAZE ESCAPE GAME (Projects Page) =====
  if (isProjects) {
    const gameCard = document.createElement('div');
    gameCard.className = 'card game-card';
    
    const title = document.createElement('h2');
    title.textContent = 'Escape the Maze';
    
    const hint = document.createElement('p');
    hint.className = 'muted';
    hint.textContent = 'Use WASD keys to move. Reach the exit (green square)!';

    const canvas = document.createElement('canvas');
    canvas.width = 400; canvas.height = 300;
    canvas.style.width = '100%';
    canvas.style.maxWidth = '400px';
    canvas.style.display = 'block';
    canvas.style.marginTop = '12px';

    gameCard.appendChild(title);
    gameCard.appendChild(hint);
    gameCard.appendChild(canvas);
    gameSection.appendChild(gameCard);

    const ctx = canvas.getContext('2d');
    const player = { x: 20, y: 20, w: 15, h: 15, speed: 3 };
    let exit = { x: canvas.width - 40, y: canvas.height - 40, w: 20, h: 20 };
    let walls = [];

    function generateMaze() {
      walls = [];
      const wallConfigs = [
        // Maze 1: Simple L-shaped path
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 40, y: 40, w: 320, h: 20 },
          { x: 40, y: 40, w: 20, h: 100 },
          { x: 40, y: 120, w: 320, h: 20 },
          { x: 340, y: 120, w: 20, h: 100 },
          { x: 60, y: 200, w: 300, h: 20 }
        ],
        // Maze 2: Simple zigzag
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 60, y: 50, w: 280, h: 20 },
          { x: 60, y: 50, w: 20, h: 70 },
          { x: 60, y: 100, w: 280, h: 20 },
          { x: 320, y: 100, w: 20, h: 70 },
          { x: 60, y: 150, w: 280, h: 20 },
          { x: 60, y: 150, w: 20, h: 70 },
          { x: 60, y: 200, w: 280, h: 20 }
        ],
        // Maze 3: T-shaped maze
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 100, y: 40, w: 200, h: 20 },
          { x: 100, y: 40, w: 20, h: 100 },
          { x: 280, y: 40, w: 20, h: 100 },
          { x: 40, y: 120, w: 320, h: 20 },
          { x: 40, y: 120, w: 20, h: 100 },
          { x: 340, y: 120, w: 20, h: 100 },
          { x: 60, y: 200, w: 280, h: 20 }
        ],
        // Maze 4: Cross maze
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 80, y: 60, w: 240, h: 20 },
          { x: 180, y: 40, w: 20, h: 100 },
          { x: 80, y: 120, w: 240, h: 20 },
          { x: 80, y: 160, w: 240, h: 20 },
          { x: 180, y: 140, w: 20, h: 100 },
          { x: 80, y: 220, w: 240, h: 20 }
        ],
        // Maze 5: Spiral path
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 50, y: 50, w: 300, h: 20 },
          { x: 50, y: 50, w: 20, h: 80 },
          { x: 50, y: 110, w: 300, h: 20 },
          { x: 330, y: 110, w: 20, h: 80 },
          { x: 70, y: 170, w: 260, h: 20 },
          { x: 70, y: 170, w: 20, h: 60 },
          { x: 70, y: 220, w: 260, h: 20 }
        ],
        // Maze 6: Double corridor
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 100, y: 50, w: 200, h: 20 },
          { x: 100, y: 50, w: 20, h: 80 },
          { x: 280, y: 50, w: 20, h: 80 },
          { x: 100, y: 110, w: 200, h: 20 },
          { x: 60, y: 150, w: 280, h: 20 },
          { x: 60, y: 150, w: 20, h: 80 },
          { x: 320, y: 150, w: 20, h: 80 },
          { x: 80, y: 220, w: 240, h: 20 }
        ],
        // Maze 7: Winding path
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 60, y: 50, w: 280, h: 20 },
          { x: 60, y: 50, w: 20, h: 60 },
          { x: 60, y: 90, w: 280, h: 20 },
          { x: 320, y: 90, w: 20, h: 60 },
          { x: 60, y: 130, w: 280, h: 20 },
          { x: 60, y: 130, w: 20, h: 60 },
          { x: 60, y: 170, w: 280, h: 20 },
          { x: 320, y: 170, w: 20, h: 60 },
          { x: 60, y: 220, w: 280, h: 20 }
        ],
        // Maze 8: Ladder with gaps
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 80, y: 50, w: 20, h: 80 },
          { x: 160, y: 50, w: 20, h: 80 },
          { x: 240, y: 50, w: 20, h: 80 },
          { x: 320, y: 50, w: 20, h: 80 },
          { x: 80, y: 110, w: 260, h: 20 },
          { x: 80, y: 160, w: 20, h: 80 },
          { x: 160, y: 160, w: 20, h: 80 },
          { x: 240, y: 160, w: 20, h: 80 },
          { x: 320, y: 160, w: 20, h: 80 },
          { x: 80, y: 220, w: 260, h: 20 }
        ],
        // Maze 9: Simple chambers
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 80, y: 60, w: 240, h: 20 },
          { x: 80, y: 60, w: 20, h: 100 },
          { x: 300, y: 60, w: 20, h: 100 },
          { x: 80, y: 140, w: 240, h: 20 },
          { x: 120, y: 160, w: 160, h: 20 },
          { x: 120, y: 160, w: 20, h: 80 },
          { x: 260, y: 160, w: 20, h: 80 }
        ],
        // Maze 10: Branching paths
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 60, y: 50, w: 280, h: 20 },
          { x: 60, y: 50, w: 20, h: 70 },
          { x: 140, y: 50, w: 20, h: 70 },
          { x: 220, y: 50, w: 20, h: 70 },
          { x: 300, y: 50, w: 20, h: 70 },
          { x: 60, y: 100, w: 280, h: 20 },
          { x: 100, y: 100, w: 20, h: 70 },
          { x: 180, y: 100, w: 20, h: 70 },
          { x: 260, y: 100, w: 20, h: 70 },
          { x: 60, y: 160, w: 280, h: 20 },
          { x: 80, y: 160, w: 20, h: 80 },
          { x: 240, y: 160, w: 20, h: 80 },
          { x: 60, y: 230, w: 280, h: 20 }
        ],
        // Maze 11: Offset corridors
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 40, y: 60, w: 320, h: 20 },
          { x: 40, y: 60, w: 20, h: 80 },
          { x: 340, y: 60, w: 20, h: 80 },
          { x: 60, y: 120, w: 280, h: 20 },
          { x: 60, y: 120, w: 20, h: 80 },
          { x: 320, y: 120, w: 20, h: 80 },
          { x: 80, y: 190, w: 240, h: 20 }
        ],
        // Maze 12: Staircase pattern
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 50, y: 50, w: 300, h: 20 },
          { x: 50, y: 50, w: 20, h: 60 },
          { x: 50, y: 100, w: 300, h: 20 },
          { x: 330, y: 100, w: 20, h: 60 },
          { x: 70, y: 150, w: 260, h: 20 },
          { x: 70, y: 150, w: 20, h: 60 },
          { x: 70, y: 200, w: 260, h: 20 }
        ],
        // Maze 13: Hourglass shape
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 60, y: 50, w: 280, h: 20 },
          { x: 60, y: 50, w: 20, h: 60 },
          { x: 320, y: 50, w: 20, h: 60 },
          { x: 120, y: 100, w: 160, h: 20 },
          { x: 120, y: 100, w: 20, h: 80 },
          { x: 260, y: 100, w: 20, h: 80 },
          { x: 60, y: 170, w: 280, h: 20 },
          { x: 60, y: 170, w: 20, h: 60 },
          { x: 320, y: 170, w: 20, h: 60 }
        ],
        // Maze 14: Rectangular chambers
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 50, y: 60, w: 300, h: 20 },
          { x: 50, y: 60, w: 20, h: 100 },
          { x: 330, y: 60, w: 20, h: 100 },
          { x: 50, y: 140, w: 300, h: 20 },
          { x: 100, y: 160, w: 200, h: 20 },
          { x: 100, y: 160, w: 20, h: 80 },
          { x: 280, y: 160, w: 20, h: 80 }
        ],
        // Maze 15: Twisted path
        [
          { x: 0, y: 0, w: 400, h: 20 },
          { x: 0, y: 280, w: 400, h: 20 },
          { x: 0, y: 0, w: 20, h: 300 },
          { x: 380, y: 0, w: 20, h: 300 },
          { x: 40, y: 50, w: 320, h: 20 },
          { x: 340, y: 50, w: 20, h: 70 },
          { x: 60, y: 110, w: 280, h: 20 },
          { x: 60, y: 110, w: 20, h: 70 },
          { x: 60, y: 170, w: 280, h: 20 },
          { x: 320, y: 170, w: 20, h: 70 },
          { x: 80, y: 230, w: 240, h: 20 }
        ]
      ];
      const config = wallConfigs[Math.floor(Math.random() * wallConfigs.length)];
      walls = config.map(w => ({ ...w }));
      exit.x = canvas.width - 40;
      exit.y = canvas.height - 40;
    }

    const keys = {};
    window.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; });
    window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; });

    function update() {
      let nx = player.x;
      let ny = player.y;

      if (keys['w']) ny -= player.speed;
      if (keys['s']) ny += player.speed;
      if (keys['a']) nx -= player.speed;
      if (keys['d']) nx += player.speed;

      let collision = false;
      for (const wall of walls) {
        if (nx + player.w > wall.x && nx < wall.x + wall.w && ny + player.h > wall.y && ny < wall.y + wall.h) {
          collision = true;
          break;
        }
      }

      if (!collision && nx >= 0 && nx + player.w <= canvas.width && ny >= 0 && ny + player.h <= canvas.height) {
        player.x = nx;
        player.y = ny;
      }

      if (player.x + player.w > exit.x && player.x < exit.x + exit.w && player.y + player.h > exit.y && player.y < exit.y + exit.h) {
        player.x = 20;
        player.y = 20;
        generateMaze();
      }
    }

    function draw() {
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#666';
      walls.forEach(w => ctx.fillRect(w.x, w.y, w.w, w.h));

      ctx.fillStyle = '#22c55e';
      ctx.fillRect(exit.x, exit.y, exit.w, exit.h);

      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(player.x, player.y, player.w, player.h);
    }

    function loop() { update(); draw(); requestAnimationFrame(loop); }
    generateMaze();
    loop();
  }
})();
