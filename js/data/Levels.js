export const LEVELS = {
    city: {
        id: 'city',
        name: 'City',
        displayName: '城市道路',
        baseSpeed: 300,
        maxSpeed: 450,
        speedMultiplier: 1,
        difficultyMultiplier: 1,
        targetDistance: 5000,
        enemySpawnRate: 0.7, // per second
        maxEnemies: 3,
        enemyTypes: ['car'],
        roadColor: '#2d2d3a',
        laneCount: 3
    },
    suburban: {
        id: 'suburban',
        name: 'Suburban',
        displayName: '郊区道路',
        baseSpeed: 400,
        maxSpeed: 550,
        speedMultiplier: 1.3,
        difficultyMultiplier: 1.5,
        targetDistance: 8000,
        enemySpawnRate: 0.85,
        maxEnemies: 4,
        enemyTypes: ['car', 'truck'],
        roadColor: '#3d3d4a',
        laneCount: 3
    },
    highway: {
        id: 'highway',
        name: 'Highway',
        displayName: '高速公路',
        baseSpeed: 500,
        maxSpeed: 700,
        speedMultiplier: 1.7,
        difficultyMultiplier: 2,
        targetDistance: 12000,
        enemySpawnRate: 1.2,
        maxEnemies: 5,
        enemyTypes: ['car', 'truck', 'bus', 'motorcycle'],
        roadColor: '#4d4d5a',
        laneCount: 3
    }
};

export const ITEM_TYPES = {
    speed: { name: '加速', color: '#ff8800', probability: 0.15 },
    shield: { name: '护盾', color: '#00aaff', probability: 0.10 },
    invincible: { name: '无敌', color: '#ff00ff', probability: 0.08 },
    coin: { name: '金币', color: '#ffd700', probability: 0.40, value: 5 },
    magnet: { name: '磁铁', color: '#00ff88', probability: 0.12 },
    mystery: { name: '神秘箱', color: '#ff2d7c', probability: 0.15 }
};
