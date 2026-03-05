export class Renderer {
    constructor(ctx, width, height) {
        this.ctx = ctx;
        this.width = width;
        this.height = height;
    }

    clear() {
        this.ctx.fillStyle = '#0a0a1a';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawBackground(level) {
        // Sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 200);

        if (level === 'city') {
            gradient.addColorStop(0, '#1a1a2e');
            gradient.addColorStop(1, '#16213e');
        } else if (level === 'suburban') {
            gradient.addColorStop(0, '#2d1b4e');
            gradient.addColorStop(1, '#1a1a2e');
        } else {
            gradient.addColorStop(0, '#0f3460');
            gradient.addColorStop(1, '#1a1a2e');
        }

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, 200);

        // Draw buildings/cityscape for city level
        if (level === 'city') {
            this.drawCityScape();
        } else if (level === 'suburban') {
            this.drawSuburbanScape();
        } else {
            this.drawHighwayScape();
        }

        // Ground/grass
        this.ctx.fillStyle = '#1a3a1a';
        this.ctx.fillRect(0, 200, this.width, 50);
    }

    drawCityScape() {
        const buildings = [
            { x: 50, w: 60, h: 120 },
            { x: 130, w: 40, h: 80 },
            { x: 190, w: 70, h: 140 },
            { x: 280, w: 50, h: 100 },
            { x: 350, w: 80, h: 160 },
            { x: 450, w: 45, h: 90 },
            { x: 520, w: 65, h: 130 },
            { x: 600, w: 55, h: 110 },
            { x: 680, w: 70, h: 150 }
        ];

        buildings.forEach(b => {
            // Building body
            this.ctx.fillStyle = '#0d1117';
            this.ctx.fillRect(b.x, 200 - b.h, b.w, b.h);

            // Windows
            const windowRows = Math.floor(b.h / 20);
            const windowCols = Math.floor(b.w / 15);

            for (let row = 0; row < windowRows; row++) {
                for (let col = 0; col < windowCols; col++) {
                    if (Math.random() > 0.3) {
                        const wx = b.x + 5 + col * 15;
                        const wy = 200 - b.h + 10 + row * 20;
                        this.ctx.fillStyle = Math.random() > 0.5 ? '#ffd700' : '#00d4ff';
                        this.ctx.globalAlpha = 0.5 + Math.random() * 0.5;
                        this.ctx.fillRect(wx, wy, 8, 12);
                        this.ctx.globalAlpha = 1;
                    }
                }
            }
        });
    }

    drawSuburbanScape() {
        // Houses silhouette
        for (let i = 0; i < 8; i++) {
            const x = i * 110 + 30;
            const h = 60 + Math.random() * 40;

            // House body
            this.ctx.fillStyle = '#1a1a2e';
            this.ctx.fillRect(x, 200 - h, 70, h);

            // Roof
            this.ctx.beginPath();
            this.ctx.moveTo(x - 5, 200 - h);
            this.ctx.lineTo(x + 35, 200 - h - 30);
            this.ctx.lineTo(x + 75, 200 - h);
            this.ctx.closePath();
            this.ctx.fillStyle = '#2d2d3a';
            this.ctx.fill();
        }

        // Trees
        for (let i = 0; i < 6; i++) {
            const x = i * 140 + 80;
            this.drawTree(x, 190);
        }
    }

    drawTree(x, y) {
        // Trunk
        this.ctx.fillStyle = '#2d1810';
        this.ctx.fillRect(x - 5, y - 30, 10, 30);

        // Foliage
        this.ctx.fillStyle = '#1a3a1a';
        this.ctx.beginPath();
        this.ctx.arc(x, y - 45, 20, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawHighwayScape() {
        // Distant mountains
        this.ctx.fillStyle = '#16213e';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 200);
        this.ctx.lineTo(100, 140);
        this.ctx.lineTo(200, 180);
        this.ctx.lineTo(300, 130);
        this.ctx.lineTo(400, 170);
        this.ctx.lineTo(500, 120);
        this.ctx.lineTo(600, 160);
        this.ctx.lineTo(700, 130);
        this.ctx.lineTo(800, 180);
        this.ctx.lineTo(800, 200);
        this.ctx.closePath();
        this.ctx.fill();

        // Far mountains
        this.ctx.fillStyle = '#1a2a4a';
        this.ctx.beginPath();
        this.ctx.moveTo(0, 200);
        this.ctx.lineTo(150, 150);
        this.ctx.lineTo(250, 180);
        this.ctx.lineTo(400, 145);
        this.ctx.lineTo(550, 175);
        this.ctx.lineTo(700, 150);
        this.ctx.lineTo(800, 185);
        this.ctx.lineTo(800, 200);
        this.ctx.closePath();
        this.ctx.fill();
    }

    // Utility drawing methods
    drawRoundedRect(x, y, w, h, r, color) {
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(x + r, y);
        this.ctx.lineTo(x + w - r, y);
        this.ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        this.ctx.lineTo(x + w, y + h - r);
        this.ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        this.ctx.lineTo(x + r, y + h);
        this.ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        this.ctx.lineTo(x, y + r);
        this.ctx.quadraticCurveTo(x, y, x + r, y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    drawButton(x, y, w, h, text, isHovered = false) {
        // Button gradient
        const gradient = this.ctx.createLinearGradient(x, y, x, y + h);
        if (isHovered) {
            gradient.addColorStop(0, '#00e5ff');
            gradient.addColorStop(1, '#00a8cc');
        } else {
            gradient.addColorStop(0, '#00d4ff');
            gradient.addColorStop(1, '#0099cc');
        }

        this.drawRoundedRect(x, y, w, h, 10, gradient);

        // Glow effect on hover
        if (isHovered) {
            this.ctx.shadowColor = '#00d4ff';
            this.ctx.shadowBlur = 20;
            this.drawRoundedRect(x, y, w, h, 10, gradient);
            this.ctx.shadowBlur = 0;
        }

        // Text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 20px Orbitron';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text, x + w / 2, y + h / 2);
    }

    drawText(text, x, y, size, color, align = 'center') {
        this.ctx.fillStyle = color;
        this.ctx.font = `bold ${size}px Orbitron`;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }

    drawGlowText(text, x, y, size, color) {
        this.ctx.shadowColor = color;
        this.ctx.shadowBlur = 15;
        this.drawText(text, x, y, size, color);
        this.ctx.shadowBlur = 0;
    }
}
