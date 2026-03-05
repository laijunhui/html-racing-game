import { GameEngine } from './GameEngine.js';
import { InputManager } from './InputManager.js';
import { AudioManager } from './AudioManager.js';
import { StorageManager } from './StorageManager.js';
import { Renderer } from './Renderer.js';
import { TitleScreen } from './ui/TitleScreen.js';
import { LevelSelect } from './ui/LevelSelect.js';
import { GameHUD } from './ui/GameHUD.js';
import { GameOverScreen } from './ui/GameOverScreen.js';
import { Leaderboard } from './ui/Leaderboard.js';
import { Settings } from './ui/Settings.js';
import { Player } from './entities/Player.js';
import { Road } from './entities/Road.js';
import { LEVELS } from './data/Levels.js';

// Game states
export const GameState = {
    TITLE: 'TITLE',
    LEVEL_SELECT: 'LEVEL_SELECT',
    PLAYING: 'PLAYING',
    PAUSED: 'PAUSED',
    GAME_OVER: 'GAME_OVER',
    LEADERBOARD: 'LEADERBOARD',
    SETTINGS: 'SETTINGS'
};

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Managers
        this.engine = new GameEngine(this);
        this.input = new InputManager(this);
        this.audio = new AudioManager();
        this.storage = new StorageManager();
        this.renderer = new Renderer(this.ctx, canvas.width, canvas.height);

        // Screens
        this.titleScreen = new TitleScreen(this);
        this.levelSelect = new LevelSelect(this);
        this.gameHUD = new GameHUD(this);
        this.gameOverScreen = new GameOverScreen(this);
        this.leaderboard = new Leaderboard(this);
        this.settings = new Settings(this);

        // Game state
        this.state = GameState.TITLE;
        this.currentLevel = null;
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.items = [];
        this.enemies = [];
        this.obstacles = [];
        this.particles = [];
        this.player = null;
        this.road = null;

        // Item inventory (3 slots)
        this.itemSlots = [null, null, null];
        this.activeItem = null;

        // Timing
        this.lastItemSpawn = 0;
        this.lastEnemySpawn = 0;
    }

    start() {
        this.audio.init();
        this.engine.start();
        this.input.init();
    }

    handleResize() {
        const container = document.getElementById('game-container');
        const rect = container.getBoundingClientRect();
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.renderer.width = 800;
        this.renderer.height = 600;
    }

    // State transitions
    showTitleScreen() {
        this.state = GameState.TITLE;
        this.audio.playMusic('title');
    }

    showLevelSelect() {
        this.state = GameState.LEVEL_SELECT;
    }

    startLevel(levelId) {
        this.currentLevel = LEVELS[levelId];
        this.resetGame();
        this.state = GameState.PLAYING;
        try {
            this.audio.playMusic('game');
            this.audio.playSound('engineStart');
        } catch (e) {
            console.log('Audio error:', e);
        }
    }

    resetGame() {
        this.score = 0;
        this.coins = 0;
        this.distance = 0;
        this.items = [];
        this.enemies = [];
        this.obstacles = [];
        this.particles = [];
        this.itemSlots = [null, null, null];
        this.activeItem = null;
        this.lastItemSpawn = 0;
        this.lastEnemySpawn = 0;

        // Create player and road
        this.player = new Player(this.renderer.width / 2, this.renderer.height - 120);
        this.road = new Road(this.renderer.width, this.renderer.height, this.currentLevel);
    }

    pause() {
        if (this.state === GameState.PLAYING) {
            this.state = GameState.PAUSED;
            this.engine.pause();
        }
    }

    resume() {
        if (this.state === GameState.PAUSED) {
            this.state = GameState.PLAYING;
            this.engine.resume();
        }
    }

    gameOver() {
        this.state = GameState.GAME_OVER;
        this.audio.playSound('gameOver');

        // Check for high score
        const leaderboard = this.storage.getLeaderboard();
        const isHighScore = leaderboard.length < 10 ||
            this.score > leaderboard[leaderboard.length - 1].score;

        this.gameOverScreen.setResults({
            score: this.score,
            distance: this.distance,
            coins: this.coins,
            isHighScore: isHighScore,
            level: this.currentLevel?.name || 'Unknown'
        });
    }

    showLeaderboard() {
        this.state = GameState.LEADERBOARD;
    }

    showSettings() {
        this.state = GameState.SETTINGS;
    }

    // Save score to leaderboard
    saveScore(name) {
        const entry = {
            name: name,
            score: this.score,
            level: this.currentLevel?.name || 'Unknown',
            date: new Date().toISOString()
        };
        this.storage.addToLeaderboard(entry);
    }

    // Main game loop update
    update(deltaTime) {
        if (this.state !== GameState.PLAYING) return;

        const level = this.currentLevel;

        // Update road
        this.road.update(deltaTime, level.speedMultiplier);

        // Update distance
        const speed = level.baseSpeed * level.speedMultiplier * deltaTime;
        this.distance += speed / 1000; // Convert to meters

        // Update score (distance points)
        const scoreGain = Math.floor(this.distance * level.difficultyMultiplier / 10);
        if (scoreGain > this.score) {
            this.score = scoreGain;
        }

        // Update player
        this.player.update(deltaTime, this.input, this.road);

        // Spawn enemies
        this.spawnEnemies(deltaTime);

        // Spawn items
        this.spawnItems(deltaTime);

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(deltaTime, this.road));

        // Update items
        this.items.forEach(item => item.update(deltaTime));

        // Update particles
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= deltaTime * 2;
            return p.life > 0;
        });

        // Check collisions
        this.checkCollisions();

        // Apply active item effects
        this.updateActiveItem(deltaTime);

        // Remove off-screen entities
        this.cleanupEntities();

        // Check level completion
        if (this.distance >= level.targetDistance) {
            this.completeLevel();
        }
    }

    spawnEnemies(deltaTime) {
        const level = this.currentLevel;
        const spawnInterval = 1000 / level.enemySpawnRate;

        this.lastEnemySpawn += deltaTime * 1000;
        if (this.lastEnemySpawn >= spawnInterval && this.enemies.length < level.maxEnemies) {
            this.lastEnemySpawn = 0;

            // Find a lane that doesn't have a recent enemy
            const lanes = this.road.lanes;
            const minY = 100; // Minimum distance between enemies in same lane

            for (const laneX of lanes) {
                // Check if this lane is clear
                let canSpawn = true;
                for (const existing of this.enemies) {
                    if (Math.abs(existing.x - laneX) < 30 && existing.y < minY) {
                        canSpawn = false;
                        break;
                    }
                }
                if (canSpawn) {
                    const enemy = this.road.spawnEnemy(laneX, -80, level.enemyTypes);
                    this.enemies.push(enemy);
                    break;
                }
            }
        }
    }

    spawnItems(deltaTime) {
        const level = this.currentLevel;
        const spawnInterval = 2000 + Math.random() * 3000;

        this.lastItemSpawn += deltaTime * 1000;
        if (this.lastItemSpawn >= spawnInterval && this.items.length < 3) {
            this.lastItemSpawn = 0;
            const x = this.road.getRandomLane();
            const item = this.road.spawnItem(x, -50);
            this.items.push(item);
        }
    }

    checkCollisions() {
        if (!this.player) return;

        const playerHitbox = this.player.getHitbox();

        // Check enemy collisions
        for (const enemy of this.enemies) {
            if (this.checkRectCollision(playerHitbox, enemy.getHitbox())) {
                if (this.activeItem === 'shield') {
                    this.useItem();
                    this.enemies = this.enemies.filter(e => e !== enemy);
                    this.audio.playSound('shieldHit');
                } else if (this.activeItem === 'invincible') {
                    // Pass through, destroy enemy
                    this.createExplosion(enemy.x, enemy.y);
                    this.enemies = this.enemies.filter(e => e !== enemy);
                } else if (!this.player.invincible) {
                    this.player.hit();
                    this.createExplosion(this.player.x, this.player.y);
                    this.audio.playSound('crash');
                    if (this.player.lives <= 0) {
                        this.gameOver();
                    }
                }
            }
        }

        // Check item pickups
        for (const item of this.items) {
            if (this.checkRectCollision(playerHitbox, item.getHitbox())) {
                this.collectItem(item);
                this.items = this.items.filter(i => i !== item);
            }
        }

        // Check coin collection (with magnet effect)
        this.checkCoinCollection();
    }

    checkCoinCollection() {
        if (!this.player || this.activeItem !== 'magnet') return;

        // Magnet attracts nearby coins/items
        const magnetRange = 200;
        this.items.forEach(item => {
            if (item.type === 'coin') {
                const dx = this.player.x - item.x;
                const dy = this.player.y - item.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < magnetRange) {
                    item.x += (this.player.x - item.x) * 0.1;
                    item.y += (this.player.y - item.y) * 0.1;
                }
            }
        });
    }

    collectItem(item) {
        this.audio.playSound('collectItem');

        switch (item.type) {
            case 'speed':
                this.activateItem('speed');
                break;
            case 'shield':
                this.activateItem('shield');
                break;
            case 'invincible':
                this.activateItem('invincible');
                break;
            case 'coin':
                this.coins += item.value || 1;
                this.score += 10 * (item.value || 1);
                this.createCoinParticles(item.x, item.y, item.value || 1);
                break;
            case 'magnet':
                this.activateItem('magnet');
                break;
        }
    }

    activateItem(type) {
        // If shield or invincible already active, don't stack
        if ((type === 'shield' || type === 'invincible') && this.activeItem) return;

        this.activeItem = type;

        const durations = {
            speed: 5000,
            invincible: 8000,
            magnet: 10000
        };

        if (durations[type]) {
            setTimeout(() => {
                if (this.activeItem === type) {
                    this.activeItem = null;
                }
            }, durations[type]);
        }

        // Play sound
        this.audio.playSound(type);
    }

    useItem() {
        if (!this.activeItem) return;

        if (this.activeItem === 'speed') {
            this.player.speedBoost = false;
        }

        this.activeItem = null;
    }

    updateActiveItem(deltaTime) {
        if (this.player) {
            if (this.activeItem === 'speed') {
                this.player.speedBoost = true;
            } else {
                this.player.speedBoost = false;
            }

            if (this.activeItem === 'invincible') {
                this.player.invincible = true;
            } else {
                this.player.invincible = false;
            }
        }
    }

    checkRectCollision(a, b) {
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y;
    }

    createExplosion(x, y) {
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color: Math.random() > 0.5 ? '#ff4444' : '#ff8800',
                size: 3 + Math.random() * 5
            });
        }
    }

    createCoinParticles(x, y, count) {
        for (let i = 0; i < count * 3; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color: '#ffd700',
                size: 2 + Math.random() * 3
            });
        }
    }

    cleanupEntities() {
        const screenHeight = this.renderer.height + 100;
        this.enemies = this.enemies.filter(e => e.y < screenHeight);
        this.items = this.items.filter(i => i.y < screenHeight);
        this.particles = this.particles.filter(p => p.life > 0);
    }

    completeLevel() {
        const level = this.currentLevel;
        const bonus = {
            city: 1000,
            suburban: 2500,
            highway: 5000
        };

        this.score += bonus[level.id] || 0;
        this.audio.playSound('levelComplete');

        // Show next level or game complete
        if (level.id === 'highway') {
            this.gameOver(); // Game complete!
        } else {
            // Progress to next level
            const nextLevelId = level.id === 'city' ? 'suburban' : 'highway';
            this.startLevel(nextLevelId);
        }
    }

    // Main render
    render() {
        this.renderer.clear();

        switch (this.state) {
            case GameState.TITLE:
                this.titleScreen.render();
                break;
            case GameState.LEVEL_SELECT:
                this.levelSelect.render();
                break;
            case GameState.PLAYING:
            case GameState.PAUSED:
                this.renderGame();
                this.gameHUD.render();
                if (this.state === GameState.PAUSED) {
                    this.renderPauseOverlay();
                }
                break;
            case GameState.GAME_OVER:
                this.renderGame();
                this.gameOverScreen.render();
                break;
            case GameState.LEADERBOARD:
                this.leaderboard.render();
                break;
            case GameState.SETTINGS:
                this.settings.render();
                break;
        }
    }

    renderGame() {
        // Background
        this.renderer.drawBackground(this.currentLevel?.id);

        // Road
        if (this.road) this.road.render(this.renderer);

        // Enemies
        this.enemies.forEach(enemy => enemy.render(this.renderer));

        // Items
        this.items.forEach(item => item.render(this.renderer));

        // Player
        if (this.player) this.player.render(this.renderer);

        // Particles
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }

    renderPauseOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.renderer.width, this.renderer.height);

        this.ctx.fillStyle = '#00d4ff';
        this.ctx.font = 'bold 48px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('PAUSED', this.renderer.width / 2, this.renderer.height / 2);

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '18px Orbitron';
        this.ctx.fillText('Press P or tap to resume', this.renderer.width / 2, this.renderer.height / 2 + 50);
    }
}
