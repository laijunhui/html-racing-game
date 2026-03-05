export class Leaderboard {
    constructor(game) {
        this.game = game;
    }

    render() {
        const renderer = this.game.renderer;
        const ctx = renderer.ctx;
        const width = renderer.width;
        const height = renderer.height;

        // Background
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, width, height);

        // Title
        ctx.save();
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;

        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 42px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('排行榜', width / 2, 80);

        ctx.restore();

        // Decorative line
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(250, 95, 300, 3);

        // Leaderboard panel
        const panelX = 150;
        const panelY = 120;
        const panelW = 500;
        const panelH = 400;

        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.roundRect(panelX, panelY, panelW, panelH, 15);
        ctx.fill();

        // Header row
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 14px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText('排名', panelX + 30, panelY + 35);
        ctx.fillText('玩家', panelX + 100, panelY + 35);
        ctx.fillText('分数', panelX + 280, panelY + 35);
        ctx.fillText('关卡', panelX + 400, panelY + 35);

        // Divider
        ctx.strokeStyle = '#3a3a4a';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(panelX + 20, panelY + 50);
        ctx.lineTo(panelX + panelW - 20, panelY + 50);
        ctx.stroke();

        // Get leaderboard data
        const leaderboard = this.game.storage.getLeaderboard();

        if (leaderboard.length === 0) {
            ctx.fillStyle = '#888888';
            ctx.font = '18px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText('暂无记录', width / 2, panelY + 200);
            ctx.font = '14px Orbitron';
            ctx.fillText('开始游戏来创造记录吧!', width / 2, panelY + 230);
        } else {
            // Render top 10
            for (let i = 0; i < Math.min(leaderboard.length, 10); i++) {
                const entry = leaderboard[i];
                const rowY = panelY + 70 + i * 35;

                // Row background on hover
                if (i % 2 === 0) {
                    ctx.fillStyle = 'rgba(0, 212, 255, 0.05)';
                    ctx.fillRect(panelX + 20, rowY - 20, panelW - 40, 35);
                }

                // Rank
                const rankColors = ['#ffd700', '#c0c0c0', '#cd7f32'];
                ctx.fillStyle = rankColors[i] || '#ffffff';
                ctx.font = 'bold 18px Orbitron';
                ctx.fillText(`${i + 1}`, panelX + 40, rowY);

                // Name
                ctx.fillStyle = '#ffffff';
                ctx.font = '16px Orbitron';
                ctx.fillText(entry.name.substring(0, 10), panelX + 100, rowY);

                // Score
                ctx.fillStyle = '#00ff88';
                ctx.font = 'bold 16px Orbitron';
                ctx.fillText(String(entry.score).padStart(8, '0'), panelX + 280, rowY);

                // Level
                ctx.fillStyle = '#ff2d7c';
                ctx.font = '14px Orbitron';
                ctx.fillText(entry.level, panelX + 400, rowY);
            }
        }

        // Back button
        this.renderBackButton(ctx, panelY + panelH + 20);

        // Clear button
        if (leaderboard.length > 0) {
            ctx.fillStyle = '#ff4444';
            ctx.font = '14px Orbitron';
            ctx.textAlign = 'center';
            ctx.fillText('清除记录', width / 2, panelY + panelH + 20);
        }

        // Hint
        ctx.fillStyle = '#666666';
        ctx.font = '12px Orbitron';
        ctx.fillText('按 ESC 或 点击返回', width / 2, height - 20);
    }

    renderBackButton(ctx, y) {
        const x = 300;
        const w = 200;
        const h = 45;

        const gradient = ctx.createLinearGradient(x, y, x, y + h);
        gradient.addColorStop(0, '#3a3a4a');
        gradient.addColorStop(1, '#2a2a3a');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 10);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('返回', x + w / 2, y + 28);
    }
}
