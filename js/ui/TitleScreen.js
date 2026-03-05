export class TitleScreen {
    constructor(game) {
        this.game = game;
        this.animationTime = 0;
    }

    render() {
        const renderer = this.game.renderer;
        const ctx = renderer.ctx;

        this.animationTime += 0.016;

        // Animated background - scrolling road
        this.renderAnimatedBackground();

        // Title
        ctx.save();

        // Title glow
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 30;

        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 56px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('SPEED RACER', renderer.width / 2, 120);

        ctx.restore();

        // Subtitle
        ctx.fillStyle = '#ff2d7c';
        ctx.font = 'bold 24px Orbitron';
        ctx.fillText('HTML5 RACING GAME', renderer.width / 2, 160);

        // Decorative racing stripe
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(200, 175, 400, 4);

        // Draw car silhouette in center
        this.drawCarSilhouette(ctx, renderer.width / 2, 320);

        // Buttons
        const buttonY = 400;
        const buttonWidth = 220;
        const buttonHeight = 50;

        // Start button
        this.drawButton(ctx, renderer.width / 2 - buttonWidth / 2, buttonY, buttonWidth, buttonHeight, '开始游戏', true);

        // Leaderboard button
        this.drawButton(ctx, renderer.width / 2 - buttonWidth / 2, buttonY + 70, buttonWidth, buttonHeight, '排行榜', false);

        // Settings button
        this.drawButton(ctx, renderer.width / 2 - buttonWidth / 2, buttonY + 140, buttonWidth, buttonHeight, '设置', false);

        // Version info
        ctx.fillStyle = '#666666';
        ctx.font = '14px Orbitron';
        ctx.fillText('v1.0 | 60 FPS | Canvas API', renderer.width / 2, 570);

        // Controls hint
        ctx.fillStyle = '#888888';
        ctx.font = '12px Orbitron';
        ctx.fillText('方向键/WASD 移动 | 空格 使用道具 | P 暂停', renderer.width / 2, 585);
    }

    renderAnimatedBackground() {
        const renderer = this.game.renderer;
        const ctx = renderer.ctx;

        // Sky gradient
        const gradient = ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, '#0a0a1a');
        gradient.addColorStop(0.5, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 800, 600);

        // Animated stars
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 50; i++) {
            const x = (i * 73 + this.animationTime * 10) % 800;
            const y = (i * 47) % 200;
            const size = (Math.sin(this.animationTime * 2 + i) + 1) * 1.5;
            ctx.globalAlpha = 0.3 + Math.sin(this.animationTime * 3 + i * 0.5) * 0.3;
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;

        // Scrolling road (simplified)
        const roadX = 200;
        const roadWidth = 400;
        const scrollOffset = (this.animationTime * 100) % 80;

        ctx.fillStyle = '#2d2d3a';
        ctx.fillRect(roadX, 0, roadWidth, 600);

        // Road edges
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(roadX, 0, 8, 600);
        ctx.fillRect(roadX + roadWidth - 8, 0, 8, 600);

        // Lane markings
        ctx.fillStyle = '#ffffff';
        for (let y = -80 + scrollOffset; y < 600; y += 80) {
            ctx.fillRect(roadX + 130, y, 4, 40);
            ctx.fillRect(roadX + 265, y, 4, 40);
        }

        // Speed lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 10; i++) {
            const x = roadX + 50 + Math.random() * 300;
            const y = (this.animationTime * 500 + i * 100) % 600;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y - 30 - Math.random() * 20);
            ctx.stroke();
        }
    }

    drawCarSilhouette(ctx, x, y) {
        ctx.fillStyle = '#ff2d7c';
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(0.8, 0.8);

        // Simple car silhouette
        ctx.beginPath();
        ctx.moveTo(-80, 20);
        ctx.lineTo(-85, -10);
        ctx.lineTo(-60, -30);
        ctx.lineTo(60, -30);
        ctx.lineTo(85, -10);
        ctx.lineTo(80, 20);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    drawButton(ctx, x, y, w, h, text, isPrimary) {
        const gradient = ctx.createLinearGradient(x, y, x, y + h);

        if (isPrimary) {
            gradient.addColorStop(0, '#00e5ff');
            gradient.addColorStop(1, '#00a8cc');
            ctx.shadowColor = '#00d4ff';
            ctx.shadowBlur = 15;
        } else {
            gradient.addColorStop(0, '#3a3a4a');
            gradient.addColorStop(1, '#2a2a3a');
            ctx.shadowColor = '#000000';
            ctx.shadowBlur = 5;
        }

        ctx.fillStyle = gradient;
        this.drawRoundedRect(ctx, x, y, w, h, 10);
        ctx.fill();

        ctx.shadowBlur = 0;

        // Border
        ctx.strokeStyle = isPrimary ? '#00d4ff' : '#4a4a5a';
        ctx.lineWidth = 2;
        this.drawRoundedRect(ctx, x, y, w, h, 10);
        ctx.stroke();

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Orbitron';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + w / 2, y + h / 2);
    }

    drawRoundedRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    }
}
