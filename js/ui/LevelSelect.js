import { LEVELS } from '../data/Levels.js';

export class LevelSelect {
    constructor(game) {
        this.game = game;
        this.selectedIndex = 0;
    }

    render() {
        const renderer = this.game.renderer;
        const ctx = renderer.ctx;

        // Background
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, 800, 600);

        // Title
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 36px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('选择关卡', 400, 60);

        // Decorative line
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(250, 75, 300, 3);

        // Level buttons
        this.renderLevelButton(ctx, 150, 'city', '城市道路', '简单', '🏙️', '#3366ff');
        this.renderLevelButton(ctx, 260, 'suburban', '郊区道路', '中等', '🏡', '#33cc66');
        this.renderLevelButton(ctx, 370, 'highway', '高速公路', '困难', '🛣️', '#ff6633');

        // Back button
        this.renderBackButton(ctx, 520);

        // Controls hint
        ctx.fillStyle = '#888888';
        ctx.font = '14px Orbitron';
        ctx.fillText('点击关卡开始游戏 | ESC 返回', 400, 580);
    }

    renderLevelButton(ctx, y, levelId, name, difficulty, icon, color) {
        const x = 200;
        const w = 400;
        const h = 80;

        // Button background
        const gradient = ctx.createLinearGradient(x, y, x + w, y);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#0d0d1a');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 10);
        ctx.fill();

        // Border
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 10);
        ctx.stroke();

        // Glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Icon
        ctx.font = '40px Arial';
        ctx.fillText(icon, x + 50, y + 45);

        // Level name
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText(name, x + 110, y + 35);

        // Difficulty
        ctx.fillStyle = color;
        ctx.font = '16px Orbitron';
        ctx.fillText(difficulty, x + 110, y + 60);

        // Distance info
        ctx.fillStyle = '#888888';
        ctx.font = '14px Orbitron';
        ctx.textAlign = 'right';
        const level = LEVELS[levelId];
        ctx.fillText(`目标: ${level.targetDistance}m`, x + w - 20, y + 45);
    }

    renderBackButton(ctx, y) {
        const x = 300;
        const w = 200;
        const h = 50;

        ctx.fillStyle = '#3a3a4a';
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 10);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('返回', x + w / 2, y + 30);
    }
}
