import { GameObject } from './GameObject.js';

export class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 50, 80);
        this.speed = 8;
        this.lives = 3;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.speedBoost = false;
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.tilt = 0;
    }

    update(deltaTime, input, road) {
        // Horizontal movement
        let moveX = 0;

        if (input.isLeft()) moveX = -1;
        if (input.isRight()) moveX = 1;

        // Touch/mouse delta
        const touchDelta = input.getTouchDelta();
        if (Math.abs(touchDelta) > 5) {
            moveX = Math.sign(touchDelta) * Math.min(Math.abs(touchDelta) / 20, 1);
        }

        // Apply movement
        const currentSpeed = this.speedBoost ? this.speed * 1.5 : this.speed;
        this.x += moveX * currentSpeed * deltaTime * 60;

        // Boundary constraints
        const roadLeft = road ? road.x + 30 : 150;
        const roadRight = road ? road.x + road.width - 30 : 650;
        this.x = Math.max(roadLeft, Math.min(roadRight, this.x));

        // Tilt effect
        this.tilt = moveX * 15;
        this.tilt += (input.getTouchDelta() / 30);
        this.tilt = Math.max(-20, Math.min(20, this.tilt));

        // Animation
        this.animationTimer += deltaTime * 1000;
        if (this.animationTimer > 100) {
            this.animationTimer = 0;
            this.animationFrame = (this.animationFrame + 1) % 3;
        }

        // Invincibility timer
        if (this.invincibleTimer > 0) {
            this.invincibleTimer -= deltaTime * 1000;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
    }

    hit() {
        if (this.invincible) return;

        this.lives--;
        this.invincible = true;
        this.invincibleTimer = 1500; // 1.5 seconds invincibility
    }

    render(renderer) {
        const ctx = renderer.ctx;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.tilt * Math.PI / 180);

        // Flicker when invincible
        if (this.invincible && Math.floor(this.invincibleTimer / 100) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        // Draw shield effect
        if (this.invincible) {
            ctx.strokeStyle = '#ff00ff';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, 55, 0, Math.PI * 2);
            ctx.stroke();

            // Rainbow effect
            const gradient = ctx.createLinearGradient(-55, 0, 55, 0);
            gradient.addColorStop(0, '#ff0000');
            gradient.addColorStop(0.2, '#ffff00');
            gradient.addColorStop(0.4, '#00ff00');
            gradient.addColorStop(0.6, '#00ffff');
            gradient.addColorStop(0.8, '#0000ff');
            gradient.addColorStop(1, '#ff00ff');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        // Speed boost exhaust
        if (this.speedBoost) {
            this.drawExhaust(ctx);
        }

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 45, 25, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        // Car body
        this.drawCarBody(ctx);

        // Wheels
        this.drawWheels(ctx);

        // Windows
        this.drawWindows(ctx);

        ctx.restore();
    }

    drawCarBody(ctx) {
        // Main body
        const gradient = ctx.createLinearGradient(-25, -40, 25, -40);
        gradient.addColorStop(0, '#cc0000');
        gradient.addColorStop(0.5, '#ff3333');
        gradient.addColorStop(1, '#aa0000');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(-22, 40);
        ctx.lineTo(-25, 20);
        ctx.lineTo(-25, -20);
        ctx.lineTo(-20, -35);
        ctx.lineTo(20, -35);
        ctx.lineTo(25, -20);
        ctx.lineTo(25, 20);
        ctx.lineTo(22, 40);
        ctx.closePath();
        ctx.fill();

        // Outline
        ctx.strokeStyle = '#880000';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    drawWheels(ctx) {
        ctx.fillStyle = '#222222';

        // Front wheels
        ctx.fillRect(-27, -10, 8, 15);
        ctx.fillRect(19, -10, 8, 15);

        // Rear wheels
        ctx.fillRect(-27, 20, 8, 15);
        ctx.fillRect(19, 20, 8, 15);

        // Wheel rims
        ctx.fillStyle = '#666666';
        ctx.beginPath();
        ctx.arc(-23, -2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(23, -2, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-23, 27, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(23, 27, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    drawWindows(ctx) {
        // Windshield
        const gradient = ctx.createLinearGradient(0, -25, 0, -10);
        gradient.addColorStop(0, '#1a3a5c');
        gradient.addColorStop(1, '#2a5a8c');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(-18, -15);
        ctx.lineTo(-18, -25);
        ctx.lineTo(-12, -30);
        ctx.lineTo(12, -30);
        ctx.lineTo(18, -25);
        ctx.lineTo(18, -15);
        ctx.closePath();
        ctx.fill();

        // Rear window
        ctx.fillStyle = '#1a3a5c';
        ctx.beginPath();
        ctx.moveTo(-15, 15);
        ctx.lineTo(-15, 25);
        ctx.lineTo(15, 25);
        ctx.lineTo(15, 15);
        ctx.closePath();
        ctx.fill();

        // Headlights
        ctx.fillStyle = '#ffff99';
        ctx.beginPath();
        ctx.ellipse(-15, -36, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(15, -36, 5, 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Taillights
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.ellipse(-18, 38, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(18, 38, 4, 2, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    drawExhaust(ctx) {
        // Flame effect
        const flameLength = 15 + Math.random() * 10;

        const gradient = ctx.createLinearGradient(0, 45, 0, 45 + flameLength);
        gradient.addColorStop(0, '#ff8800');
        gradient.addColorStop(0.3, '#ffff00');
        gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(-8, 45);
        ctx.lineTo(0, 45 + flameLength);
        ctx.lineTo(8, 45);
        ctx.closePath();
        ctx.fill();
    }
}
