export class GameEngine {
    constructor(game) {
        this.game = game;
        this.lastTime = 0;
        this.isRunning = false;
        this.isPaused = false;
        this.fixedDeltaTime = 1000 / 60; // 60 FPS target
        this.accumulator = 0;
    }

    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop();
    }

    stop() {
        this.isRunning = false;
    }

    pause() {
        this.isPaused = true;
    }

    resume() {
        this.isPaused = false;
        this.lastTime = performance.now();
        this.accumulator = 0;
    }

    gameLoop = (currentTime = 0) => {
        if (!this.isRunning) return;

        requestAnimationFrame(this.gameLoop);

        if (this.isPaused) return;

        const deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        // Cap delta time to avoid spiral of death
        const cappedDelta = Math.min(deltaTime, 0.1);

        try {
            // Update game logic
            this.game.update(cappedDelta);

            // Render
            this.game.render();
        } catch (e) {
            console.error('Game error:', e);
        }
    }
}
