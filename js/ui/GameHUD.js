export class GameHUD {
    constructor(game) {
        this.game = game;
    }

    render() {
        const renderer = this.game.renderer;
        const ctx = renderer.ctx;
        const width = renderer.width;
        const height = renderer.height;

        // Simple HUD - just bars
        ctx.fillStyle = 'rgba(10, 10, 26, 0.85)';
        ctx.fillRect(0, 0, width, 50);
        ctx.fillRect(0, height - 60, width, 60);

        // Divider
        ctx.fillStyle = '#00d4ff';
        ctx.fillRect(0, 50, width, 2);

        // Simple text
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 16px Orbitron';
        ctx.fillText('SCORE', 20, 20);
        ctx.fillStyle = '#ffffff';
        ctx.fillText(String(this.game.score || 0), 20, 42);

        // Level
        ctx.fillStyle = '#ff2d7c';
        ctx.font = 'bold 18px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText(this.game.currentLevel?.displayName || 'Unknown', width / 2, 32);
    }

    renderScore(ctx, x) {
        ctx.fillStyle = '#00ff88';
        ctx.font = 'bold 16px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText('SCORE', x, 20);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Orbitron';
        ctx.fillText(String(this.game.score).padStart(8, '0'), x, 42);
    }

    renderCoins(ctx, x) {
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 16px Orbitron';
        ctx.fillText('COINS', x, 20);

        // Coin icon
        ctx.beginPath();
        ctx.arc(x + 10, 35, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Orbitron';
        ctx.fillText(String(this.game.coins).padStart(4, '0'), x + 25, 42);
    }

    renderDistance(ctx, x) {
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 16px Orbitron';
        ctx.fillText('DISTANCE', x, 20);

        const km = (this.game.distance / 1000).toFixed(2);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 24px Orbitron';
        ctx.fillText(`${km}km`, x, 42);
    }

    renderActiveItem(ctx, x) {
        ctx.textAlign = 'right';

        if (this.game.activeItem) {
            const itemColors = {
                speed: '#ff8800',
                shield: '#00aaff',
                invincible: '#ff00ff',
                magnet: '#00ff88'
            };

            ctx.fillStyle = itemColors[this.game.activeItem] || '#ffffff';
            ctx.font = 'bold 14px Orbitron';
            ctx.fillText('ACTIVE', x, 20);

            // Item icon
            const itemNames = {
                speed: '⚡',
                shield: '🛡️',
                invincible: '⭐',
                magnet: '🧲'
            };

            ctx.font = '24px Arial';
            ctx.fillText(itemNames[this.game.activeItem] || '?', x, 42);
        } else {
            ctx.fillStyle = '#666666';
            ctx.font = 'bold 14px Orbitron';
            ctx.fillText('NO ITEM', x, 30);
        }
    }

    renderLives(ctx, x) {
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 16px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText('LIVES', x, 20);

        // Draw heart icons
        for (let i = 0; i < this.game.player?.lives || 3; i++) {
            this.drawHeart(ctx, x + 10 + i * 25, 30);
        }
    }

    drawHeart(ctx, x, y) {
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.moveTo(x, y + 3);
        ctx.bezierCurveTo(x, y, x - 5, y, x - 5, y + 5);
        ctx.bezierCurveTo(x - 5, y + 10, x, y + 15, x, y + 18);
        ctx.bezierCurveTo(x, y + 15, x + 5, y + 10, x + 5, y + 5);
        ctx.bezierCurveTo(x + 5, y, x, y, x, y + 3);
        ctx.fill();
    }

    renderLevel(ctx, x) {
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ff2d7c';
        ctx.font = 'bold 18px Orbitron';
        const levelName = this.game.currentLevel?.displayName || '未知';
        ctx.fillText(levelName, x, 32);
    }

    renderItemSlots(ctx) {
        const renderer = this.game.renderer;
        const slotY = renderer.height - 45;
        const slotSize = 40;

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText('ITEMS:', 20, slotY - 5);

        for (let i = 0; i < 3; i++) {
            const slotX = 90 + i * 55;

            // Slot background
            ctx.fillStyle = '#1a1a2e';
            ctx.strokeStyle = '#3a3a4a';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(slotX, slotY - 25, slotSize, slotSize, 5);
            ctx.fill();
            ctx.stroke();

            // Item in slot
            const item = this.game.itemSlots[i];
            if (item) {
                const itemIcons = {
                    speed: '⚡',
                    shield: '🛡️',
                    invincible: '⭐',
                    coin: '💰',
                    magnet: '🧲',
                    mystery: '❓'
                };
                ctx.font = '24px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(itemIcons[item] || '?', slotX + slotSize / 2, slotY + 8);
            } else {
                // Empty slot number
                ctx.fillStyle = '#4a4a5a';
                ctx.font = '14px Orbitron';
                ctx.textAlign = 'center';
                ctx.fillText(i + 1, slotX + slotSize / 2, slotY + 3);
            }
        }

        // Use hint
        ctx.fillStyle = '#888888';
        ctx.font = '12px Orbitron';
        ctx.textAlign = 'right';
        ctx.fillText('SPACE 使用道具', renderer.width - 20, slotY - 5);
    }

    renderPauseButton(ctx) {
        const renderer = this.game.renderer;
        const x = renderer.width - 50;
        const y = 10;
        const size = 30;

        ctx.fillStyle = '#3a3a4a';
        ctx.beginPath();
        ctx.roundRect(x, y, size, size, 5);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('⏸', x + size / 2, y + 21);
    }
}
