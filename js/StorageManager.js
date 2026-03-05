export class StorageManager {
    constructor() {
        this.leaderboardKey = 'racing_game_leaderboard';
        this.settingsKey = 'racing_game_settings';
    }

    // Leaderboard methods
    getLeaderboard() {
        try {
            const data = localStorage.getItem(this.leaderboardKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.warn('localStorage not available');
            return [];
        }
    }

    addToLeaderboard(entry) {
        try {
            const leaderboard = this.getLeaderboard();
            leaderboard.push(entry);
            leaderboard.sort((a, b) => b.score - a.score);
            leaderboard.splice(10); // Keep only top 10
            localStorage.setItem(this.leaderboardKey, JSON.stringify(leaderboard));
            return leaderboard;
        } catch (e) {
            console.warn('Could not save to localStorage');
            return [];
        }
    }

    clearLeaderboard() {
        try {
            localStorage.removeItem(this.leaderboardKey);
        } catch (e) {
            console.warn('Could not clear localStorage');
        }
    }

    isHighScore(score) {
        const leaderboard = this.getLeaderboard();
        return leaderboard.length < 10 || score > leaderboard[leaderboard.length - 1].score;
    }

    // Settings methods
    getSettings() {
        try {
            const data = localStorage.getItem(this.settingsKey);
            return data ? JSON.parse(data) : {
                soundEnabled: true,
                musicEnabled: true
            };
        } catch (e) {
            return { soundEnabled: true, musicEnabled: true };
        }
    }

    saveSettings(settings) {
        try {
            localStorage.setItem(this.settingsKey, JSON.stringify(settings));
        } catch (e) {
            console.warn('Could not save settings');
        }
    }
}
