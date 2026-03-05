import { GameObject } from './GameObject.js';

export class Enemy extends GameObject {
    constructor(x, y, type = 'car') {
        const sizes = {
            car: { width: 45, height: 70 },
            truck: { width: 55, height: 90 },
            bus: { width: 60, height: 100 },
            motorcycle: { width: 25, height: 45 }
        };

        const size = sizes[type] || sizes.car;
        super(x, y, size.width, size.height);

        this.type = type;
        this.speed = 100 + Math.random() * 100;
        this.color = this.getRandomColor();
        this.animationFrame = 0;
        this.animationTimer = 0;
    }

    getRandomColor() {
        const colors = {
            car: ['#3366ff', '#33cc33', '#ffcc00', '#ff6633', '#9933ff'],
            truck: ['#666666', '#888888', '#555555'],
            bus: ['#ffcc00', '#ff6600'],
            motorcycle: ['#ff0000', '#000000', '#ffffff']
        };

        const typeColors = colors[this.type] || colors.car;
        return typeColors[Math.floor(Math.random() * typeColors.length)];
    }

    update(deltaTime, road) {
        // Move downward (player is moving up, enemies move down relative to player)
        this.y += this.speed * deltaTime;

        // Slight wobble for variety
        this.x += Math.sin(this.y / 50) * 0.5;

        // Animation
        this.animationTimer += deltaTime * 1000;
        if (this.animationTimer > 150) {
            this.animationTimer = 0;
            this.animationFrame = (this.animationFrame + 1) % 2;
        }
    }

    render(renderer) {
        const ctx = renderer.ctx;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, this.height / 2 + 5, this.width / 2, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        if (this.type === 'car') {
            this.drawCar(ctx);
        } else if (this.type === 'truck') {
            this.drawTruck(ctx);
        } else if (this.type === 'bus') {
            this.drawBus(ctx);
        } else if (this.type === 'motorcycle') {
            this.drawMotorcycle(ctx);
        }

        ctx.restore();
    }

    drawCar(ctx) {
        // Body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(-this.width / 2 + 3, this.height / 2 - 5);
        ctx.lineTo(-this.width / 2, 0);
        ctx.lineTo(-this.width / 2, -this.height / 2 + 15);
        ctx.lineTo(-this.width / 2 + 8, -this.height / 2);
        ctx.lineTo(this.width / 2 - 8, -this.height / 2);
        ctx.lineTo(this.width / 2, -this.height / 2 + 15);
        ctx.lineTo(this.width / 2, 0);
        ctx.lineTo(this.width / 2 - 3, this.height / 2 - 5);
        ctx.closePath();
        ctx.fill();

        // Windows
        ctx.fillStyle = '#1a3a5c';
        ctx.fillRect(-this.width / 2 + 5, -this.height / 2 + 5, this.width - 10, 15);

        // Wheels
        ctx.fillStyle = '#222222';
        ctx.fillRect(-this.width / 2 - 2, -10, 5, 12);
        ctx.fillRect(this.width / 2 - 3, -10, 5, 12);
        ctx.fillRect(-this.width / 2 - 2, this.height / 2 - 15, 5, 12);
        ctx.fillRect(this.width / 2 - 3, this.height / 2 - 15, 5, 12);
    }

    drawTruck(ctx) {
        // Cab
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height * 0.35);

        // Cargo area
        ctx.fillStyle = '#888888';
        ctx.fillRect(-this.width / 2, -this.height / 2 + this.height * 0.35, this.width, this.height * 0.6);

        // Windows
        ctx.fillStyle = '#1a3a5c';
        ctx.fillRect(-this.width / 2 + 5, -this.height / 2 + 5, this.width - 10, this.height * 0.25);

        // Wheels
        ctx.fillStyle = '#222222';
        ctx.fillRect(-this.width / 2 - 3, -this.height / 2 + this.height * 0.4, 6, 15);
        ctx.fillRect(this.width / 2 - 3, -this.height / 2 + this.height * 0.4, 6, 15);
        ctx.fillRect(-this.width / 2 - 3, this.height / 2 - 20, 6, 15);
        ctx.fillRect(this.width / 2 - 3, this.height / 2 - 20, 6, 15);
    }

    drawBus(ctx) {
        // Body
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        // Windows
        ctx.fillStyle = '#2a5a8c';
        ctx.fillRect(-this.width / 2 + 3, -this.height / 2 + 5, this.width - 6, 25);
        ctx.fillRect(-this.width / 2 + 3, -this.height / 2 + 35, this.width - 6, 25);
        ctx.fillRect(-this.width / 2 + 3, -this.height / 2 + 65, this.width - 6, 25);

        // Wheels
        ctx.fillStyle = '#222222';
        ctx.beginPath();
        ctx.arc(-this.width / 2 + 10, this.height / 2 - 5, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.width / 2 - 10, this.height / 2 - 5, 10, 0, Math.PI * 2);
        ctx.fill();
    }

    drawMotorcycle(ctx) {
        // Body
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width / 2, this.height / 3, 0, 0, Math.PI * 2);
        ctx.fill();

        // Wheels
        ctx.fillStyle = '#333333';
        ctx.beginPath();
        ctx.arc(0, -this.height / 2 + 5, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, this.height / 2 - 5, 10, 0, Math.PI * 2);
        ctx.fill();

        // Rider (simplified)
        ctx.fillStyle = '#1a1a1a';
        ctx.beginPath();
        ctx.arc(0, -5, 8, 0, Math.PI * 2);
        ctx.fill();
    }
}
