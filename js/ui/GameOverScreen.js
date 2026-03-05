export class GameOverScreen {
    constructor(game) {
        this.game = game;
        this.results = {
            score: 0,
            distance: 0,
            coins: 0,
            isHighScore: false,
            level: 'Unknown'
        };
        this.nameInput = '';
        this.isEnteringName = false;
    }

    setResults(results) {
        this.results = results;
        this.nameInput = '';
        this.isEnteringName = results.isHighScore;
    }

    handleKeyDown(e) {
        if (!this.isEnteringName) return;

        if (e.code === 'Backspace') {
            this.nameInput = this.nameInput.slice(0, -1);
        } else if (e.code === 'Enter') {
            // Confirm name and save
            const name = this.nameInput.trim() || 'Player';
            this.game.saveScore(name);
            this.isEnteringName = false;
            this.nameInput = name;
        } else if (e.key.length === 1 && this.nameInput.length < 10) {
            // Add character
            this.nameInput += e.key;
        }
    }

    render() {
        const renderer = this.game.renderer;
        const ctx = renderer.ctx;
        const width = renderer.width;
        const height = renderer.height;

        // Semi-transparent overlay
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(0, 0, width, height);

        // Game Over title
        ctx.save();
        ctx.shadowColor = '#ff4444';
        ctx.shadowBlur = 20;

        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 56px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', width / 2, 120);

        ctx.restore();

        // Results panel
        const panelX = 250;
        const panelY = 170;
        const panelW = 300;
        const panelH = 300;

        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.roundRect(panelX, panelY, panelW, panelH, 15);
        ctx.fill();

        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(panelX, panelY, panelW, panelH, 15);
        ctx.stroke();

        // Stats
        ctx.textAlign = 'left';

        this.renderStat(ctx, panelX + 30, panelY + 50, 'SCORE', String(this.results.score).padStart(8, '0'), '#00ff88');
        this.renderStat(ctx, panelX + 30, panelY + 100, 'DISTANCE', `${(this.results.distance / 1000).toFixed(2)} km`, '#00d4ff');
        this.renderStat(ctx, panelX + 30, panelY + 150, 'COINS', String(this.results.coins).padStart(4, '0'), '#ffd700');
        this.renderStat(ctx, panelX + 30, panelY + 200, 'LEVEL', this.results.level, '#ff2d7c');

        // High score badge
        if (this.results.isHighScore) {
            this.renderHighScoreBadge(ctx, width / 2, panelY + 250);
        }

        // Buttons
        const buttonY = panelY + panelH + 30;
        this.renderButton(ctx, width / 2 - 110, buttonY, 220, 50, '再来一局', true);
        this.renderButton(ctx, width / 2 - 110, buttonY + 65, 220, 50, '主菜单', false);

        // If high score, show name input
        if (this.results.isHighScore) {
            this.renderNameInput(ctx, panelX + 30, panelY + 270, panelW - 60);

            // Input hint
            ctx.fillStyle = '#ffd700';
            ctx.font = '12px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText('输入名字，按回车确认', width / 2, panelY + panelH + 25);
        }
    }

    renderStat(ctx, x, y, label, value, color) {
        ctx.fillStyle = '#888888';
        ctx.font = 'bold 14px Orbitron';
        ctx.fillText(label, x, y);

        ctx.fillStyle = color;
        ctx.font = 'bold 28px Orbitron';
        ctx.fillText(value, x, y + 30);
    }

    renderHighScoreBadge(ctx, x, y) {
        ctx.save();
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 15;

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 18px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('🏆 新纪录!', x, y);

        ctx.restore();
    }

    renderButton(ctx, x, y, w, h, text, isPrimary) {
        const gradient = ctx.createLinearGradient(x, y, x, y + h);

        if (isPrimary) {
            gradient.addColorStop(0, '#00e5ff');
            gradient.addColorStop(1, '#00a8cc');
        } else {
            gradient.addColorStop(0, '#3a3a4a');
            gradient.addColorStop(1, '#2a2a3a');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 10);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(text, x + w / 2, y + h / 2 + 6);
    }

    renderNameInput(ctx, x, y, w) {
        // Input background
        ctx.fillStyle = '#0a0a1a';
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(x, y, w, 35, 5);
        ctx.fill();
        ctx.stroke();

        // Text
        ctx.fillStyle = this.nameInput ? '#ffffff' : '#666666';
        ctx.font = 'bold 16px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText(this.nameInput || '输入你的名字...', x + 10, y + 24);
    }
}
