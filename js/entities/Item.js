import { GameObject } from './GameObject.js';

export class Item extends GameObject {
    constructor(x, y, type = 'coin') {
        super(x, y, 35, 35);
        this.type = type;
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.rotation = 0;

        const colors = {
            speed: '#ff8800',
            shield: '#00aaff',
            invincible: '#ff00ff',
            coin: '#ffd700',
            magnet: '#00ff88',
            mystery: '#ff2d7c'
        };

        this.color = colors[type] || '#ffd700';
        this.value = type === 'coin' ? 5 : 1;
    }

    update(deltaTime) {
        // Fall down
        this.y += 150 * deltaTime;

        // Rotate
        this.rotation += deltaTime * 3;

        // Animation
        this.animationTimer += deltaTime * 1000;
        if (this.animationTimer > 100) {
            this.animationTimer = 0;
            this.animationFrame = (this.animationFrame + 1) % 4;
        }
    }

    render(renderer) {
        const ctx = renderer.ctx;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;

        if (this.type === 'coin') {
            this.drawCoin(ctx);
        } else if (this.type === 'speed') {
            this.drawSpeedItem(ctx);
        } else if (this.type === 'shield') {
            this.drawShieldItem(ctx);
        } else if (this.type === 'invincible') {
            this.drawInvincibleItem(ctx);
        } else if (this.type === 'magnet') {
            this.drawMagnetItem(ctx);
        } else {
            this.drawMysteryBox(ctx);
        }

        ctx.shadowBlur = 0;
        ctx.restore();
    }

    drawCoin(ctx) {
        const bounce = Math.sin(this.animationFrame * 0.5) * 3;

        // Outer ring
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.ellipse(0, bounce, 12, 12, 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner
        ctx.fillStyle = '#ffaa00';
        ctx.beginPath();
        ctx.ellipse(0, bounce, 8, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Dollar sign
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, bounce);
    }

    drawSpeedItem(ctx) {
        // Lightning bolt
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(5, -15);
        ctx.lineTo(-5, -5);
        ctx.lineTo(0, -5);
        ctx.lineTo(-5, 15);
        ctx.lineTo(5, 5);
        ctx.lineTo(0, 5);
        ctx.closePath();
        ctx.fill();
    }

    drawShieldItem(ctx) {
        // Bubble
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Ring
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.stroke();
    }

    drawInvincibleItem(ctx) {
        // Star shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI / 5) - Math.PI / 2;
            const x = Math.cos(angle) * 15;
            const y = Math.sin(angle) * 15;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();

        // Inner star
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI / 5) - Math.PI / 2;
            const x = Math.cos(angle) * 7;
            const y = Math.sin(angle) * 7;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }

    drawMagnetItem(ctx) {
        // U-shape magnet
        ctx.fillStyle = this.color;
        ctx.fillRect(-12, -10, 6, 20);
        ctx.fillRect(6, -10, 6, 20);
        ctx.fillRect(-12, -10, 24, 6);

        // Poles
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(-12, 8, 8, 4);
        ctx.fillStyle = '#0000ff';
        ctx.fillRect(4, 8, 8, 4);
    }

    drawMysteryBox(ctx) {
        // Box
        const gradient = ctx.createLinearGradient(-15, -15, 15, 15);
        gradient.addColorStop(0, '#ff2d7c');
        gradient.addColorStop(0.5, '#ff6b6b');
        gradient.addColorStop(1, '#ff2d7c');

        ctx.fillStyle = gradient;
        ctx.fillRect(-15, -15, 30, 30);

        // Question mark
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('?', 0, -2);
    }
}
