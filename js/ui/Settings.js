export class Settings {
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
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 42px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('设置', width / 2, 80);

        // Decorative line
        ctx.fillStyle = '#00d4ff';
        ctx.fillRect(300, 95, 200, 3);

        // Settings panel
        const panelX = 200;
        const panelY = 130;
        const panelW = 400;
        const panelH = 350;

        ctx.fillStyle = '#1a1a2e';
        ctx.beginPath();
        ctx.roundRect(panelX, panelY, panelW, panelH, 15);
        ctx.fill();

        ctx.strokeStyle = '#00d4ff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(panelX, panelY, panelW, panelH, 15);
        ctx.stroke();

        // Sound toggle
        this.renderToggle(
            ctx, panelX + 30, panelY + 50,
            '音效',
            this.game.audio.enabled,
            () => this.game.audio.toggleSound()
        );

        // Music toggle
        this.renderToggle(
            ctx, panelX + 30, panelY + 120,
            '音乐',
            this.game.audio.musicEnabled,
            () => this.game.audio.toggleMusic()
        );

        // Controls info
        this.renderControlsInfo(ctx, panelX + 30, panelY + 200);

        // Credits
        this.renderCredits(ctx, panelY + panelH - 50);

        // Back button
        this.renderBackButton(ctx, panelY + panelH + 20);
    }

    renderToggle(ctx, x, y, label, isOn, onClick) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText(label, x, y + 20);

        // Toggle background
        const toggleX = x + 250;
        const toggleY = y;
        const toggleW = 60;
        const toggleH = 30;

        ctx.fillStyle = isOn ? '#00ff88' : '#3a3a4a';
        ctx.beginPath();
        ctx.roundRect(toggleX, toggleY, toggleW, toggleH, 15);
        ctx.fill();

        // Toggle knob
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(toggleX + (isOn ? toggleW - 15 : 15), toggleY + toggleH / 2, 12, 0, Math.PI * 2);
        ctx.fill();

        // Status text
        ctx.fillStyle = isOn ? '#00ff88' : '#888888';
        ctx.font = '14px Orbitron';
        ctx.fillText(isOn ? 'ON' : 'OFF', toggleX + toggleW + 10, y + 22);
    }

    renderControlsInfo(ctx, x, y) {
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 16px Orbitron';
        ctx.textAlign = 'left';
        ctx.fillText('操作说明', x, y);

        ctx.fillStyle = '#888888';
        ctx.font = '14px Orbitron';
        ctx.fillText('键盘: 方向键/WASD 移动', x, y + 30);
        ctx.fillText('空格: 使用道具', x, y + 55);
        ctx.fillText('P/ESC: 暂停游戏', x, y + 80);
        ctx.fillText('触屏: 点击/滑动控制', x, y + 105);
    }

    renderCredits(ctx, y) {
        ctx.fillStyle = '#666666';
        ctx.font = '12px Orbitron';
        ctx.textAlign = 'center';
        ctx.fillText('Speed Racer HTML5 v1.0', 400, y);
        ctx.fillText('Built with Canvas API & Web Audio', 400, y + 20);
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
