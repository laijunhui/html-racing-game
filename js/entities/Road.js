import { Enemy } from './Enemy.js';
import { Item } from './Item.js';
import { ITEM_TYPES } from '../data/Levels.js';

export class Road {
    constructor(canvasWidth, canvasHeight, level) {
        this.width = 400;
        this.height = canvasHeight;
        this.x = (canvasWidth - this.width) / 2;
        this.y = 0;

        this.level = level || {
            roadColor: '#2d2d3a',
            speedMultiplier: 1
        };

        this.scrollY = 0;
        this.scrollSpeed = 300;
        this.laneWidth = this.width / 3;
        this.lanes = [
            this.x + this.laneWidth / 2,
            this.x + this.laneWidth * 1.5,
            this.x + this.laneWidth * 2.5
        ];

        this.markingOffset = 0;
    }

    update(deltaTime, speedMultiplier = 1) {
        this.scrollSpeed = 300 * speedMultiplier;
        this.scrollY += this.scrollSpeed * deltaTime;
        if (this.scrollY > 100) {
            this.scrollY -= 100;
        }

        this.markingOffset = (this.markingOffset + this.scrollSpeed * deltaTime) % 80;
    }

    render(renderer) {
        const ctx = renderer.ctx;

        // Road surface
        ctx.fillStyle = this.level.roadColor;
        ctx.fillRect(this.x, 0, this.width, this.height);

        // Road texture (dashed lines for asphalt)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        for (let y = 0; y < this.height; y += 20) {
            for (let x = 0; x < this.width; x += 30) {
                if ((x + y) % 60 === 0) {
                    ctx.fillRect(this.x + x, y, 15, 10);
                }
            }
        }

        // Road edges (yellow lines)
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(this.x, 0, 8, this.height);
        ctx.fillRect(this.x + this.width - 8, 0, 8, this.height);

        // White edge lines
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 12, 0, 3, this.height);
        ctx.fillRect(this.x + this.width - 15, 0, 3, this.height);

        // Lane markings (dashed white lines)
        ctx.fillStyle = '#ffffff';
        for (let i = 1; i < 3; i++) {
            const laneX = this.x + this.laneWidth * i;
            for (let y = -80 + this.markingOffset; y < this.height; y += 80) {
                ctx.fillRect(laneX - 2, y, 4, 40);
            }
        }

        // Road shoulder/grass transition
        const grassGradient = ctx.createLinearGradient(this.x - 20, 0, this.x, 0);
        grassGradient.addColorStop(0, '#1a3a1a');
        grassGradient.addColorStop(1, 'transparent');
        ctx.fillStyle = grassGradient;
        ctx.fillRect(this.x - 20, 0, 20, this.height);

        const grassGradient2 = ctx.createLinearGradient(this.x + this.width, 0, this.x + this.width + 20, 0);
        grassGradient2.addColorStop(0, 'transparent');
        grassGradient2.addColorStop(1, '#1a3a1a');
        ctx.fillStyle = grassGradient2;
        ctx.fillRect(this.x + this.width, 0, 20, this.height);
    }

    getRandomLane() {
        return this.lanes[Math.floor(Math.random() * this.lanes.length)];
    }

    spawnEnemy(x, y, types) {
        const type = types[Math.floor(Math.random() * types.length)];
        return new Enemy(x, y, type);
    }

    spawnItem(x, y) {
        // Random item type based on probability
        const rand = Math.random();
        let cumulative = 0;
        let selectedType = 'coin';

        for (const [type, data] of Object.entries(ITEM_TYPES)) {
            cumulative += data.probability;
            if (rand < cumulative) {
                selectedType = type;
                break;
            }
        }

        return new Item(x, y, selectedType);
    }
}
