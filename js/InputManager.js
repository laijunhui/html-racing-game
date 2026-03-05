export class InputManager {
    constructor(game) {
        this.game = game;
        this.keys = {};
        this.touchDeltaX = 0;
        this.isTouching = false;
    }

    init() {
        // Keyboard events
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));

        // Click only on canvas
        this.game.canvas.addEventListener('click', (e) => this.onClick(e));
    }

    onClick(e) {
        const rect = this.game.canvas.getBoundingClientRect();
        const scaleX = this.game.canvas.width / rect.width;
        const scaleY = this.game.canvas.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        this.handleMenuClick(x, y);
    }

    onKeyDown(e) {
        this.keys[e.code] = true;

        // Handle name input in game over screen
        if (this.game.state === 'GAME_OVER' && this.game.gameOverScreen.isEnteringName) {
            this.game.gameOverScreen.handleKeyDown(e);
            return;
        }

        // Pause/Resume
        if (e.code === 'Escape' || e.code === 'KeyP') {
            if (this.game.state === 'PLAYING') {
                this.game.pause();
            } else if (this.game.state === 'PAUSED') {
                this.game.resume();
            } else if (this.game.state === 'LEVEL_SELECT') {
                this.game.showTitleScreen();
            } else if (this.game.state === 'LEADERBOARD' || this.game.state === 'SETTINGS') {
                this.game.showTitleScreen();
            } else if (this.game.state === 'GAME_OVER' && !this.game.gameOverScreen.isEnteringName) {
                this.game.showTitleScreen();
            }
        }

        // Use item
        if (e.code === 'Space' && this.game.activeItem) {
            this.game.useItem();
        }
    }

    onKeyUp(e) {
        this.keys[e.code] = false;
    }

    handleMenuClick(x, y) {
        const state = this.game.state;

        // Ignore during gameplay
        if (state === 'PLAYING') return;

        // Helper to check button bounds
        const inBounds = (bx, by, bw, bh) => x >= bx && x <= bx + bw && y >= by && y <= by + bh;

        if (state === 'TITLE') {
            // Start Game button: (290, 400, 220, 50)
            if (inBounds(290, 400, 220, 50)) {
                this.game.showLevelSelect();
            }
            // Leaderboard button: (290, 470, 220, 50)
            else if (inBounds(290, 470, 220, 50)) {
                this.game.showLeaderboard();
            }
            // Settings button: (290, 540, 220, 50)
            else if (inBounds(290, 540, 220, 50)) {
                this.game.showSettings();
            }
        } else if (state === 'LEVEL_SELECT') {
            // Level buttons
            if (inBounds(200, 150, 400, 80)) {
                this.game.startLevel('city');
            } else if (inBounds(200, 245, 400, 80)) {
                this.game.startLevel('suburban');
            } else if (inBounds(200, 340, 400, 80)) {
                this.game.startLevel('highway');
            } else if (inBounds(300, 500, 200, 50)) {
                this.game.showTitleScreen();
            }
        } else if (state === 'GAME_OVER') {
            // If entering name, ignore clicks (let user type and press Enter)
            if (this.game.gameOverScreen.isEnteringName) return;

            // Restart
            if (inBounds(270, 500, 220, 50)) {
                if (this.game.currentLevel) {
                    this.game.startLevel(this.game.currentLevel.id);
                }
            }
            // Main menu
            else if (inBounds(270, 555, 220, 50)) {
                this.game.showTitleScreen();
            }
        } else if (state === 'PAUSED') {
            this.game.resume();
        } else if (state === 'LEADERBOARD' || state === 'SETTINGS') {
            if (inBounds(300, 540, 200, 45)) {
                this.game.showTitleScreen();
            }
        }
    }

    isLeft() {
        return this.keys['ArrowLeft'] || this.keys['KeyA'];
    }

    isRight() {
        return this.keys['ArrowRight'] || this.keys['KeyD'];
    }

    getTouchDelta() {
        return this.touchDeltaX;
    }
}
