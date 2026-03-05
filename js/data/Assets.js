// Asset configuration and specifications
// This file documents all 34 image assets as specified in SPEC.md

export const ASSETS = {
    // Player Car Assets (6 images)
    player: {
        body: { name: 'player_car_body', width: 60, height: 80, desc: 'Main car body' },
        wheels: { name: 'player_car_wheels', width: 20, height: 20, desc: 'Front and rear wheels' },
        front: { name: 'player_car_front', width: 60, height: 30, desc: 'Front view' },
        exhaust: { name: 'player_car_exhaust', width: 15, height: 25, desc: 'Exhaust flame' },
        shield: { name: 'player_car_shield', width: 80, height: 100, desc: 'Shield bubble' },
        invincible: { name: 'player_car_invincible', width: 90, height: 110, desc: 'Rainbow aura' }
    },

    // Enemy/Vehicle Assets (8 images)
    enemies: {
        redCar: { name: 'enemy_car_red', width: 55, height: 75, desc: 'Red enemy car' },
        blueCar: { name: 'enemy_car_blue', width: 55, height: 75, desc: 'Blue enemy car' },
        greenCar: { name: 'enemy_car_green', width: 55, height: 75, desc: 'Green enemy car' },
        yellowCar: { name: 'enemy_car_yellow', width: 55, height: 75, desc: 'Yellow enemy car' },
        truck: { name: 'enemy_truck', width: 65, height: 95, desc: 'Delivery truck' },
        bus: { name: 'enemy_bus', width: 70, height: 110, desc: 'City bus' },
        motorcycle: { name: 'enemy_motorcycle', width: 30, height: 50, desc: 'Motorcycle' },
        police: { name: 'enemy_police', width: 55, height: 75, desc: 'Police car' }
    },

    // Obstacle Assets (6 images)
    obstacles: {
        cone: { name: 'barrier_cone', width: 25, height: 35, desc: 'Traffic cone' },
        block: { name: 'barrier_block', width: 80, height: 25, desc: 'Road block' },
        tire: { name: 'barrier_tire', width: 30, height: 30, desc: 'Discarded tire' },
        oil: { name: 'oil_puddle', width: 50, height: 50, desc: 'Oil spill' },
        fence: { name: 'barrier_fence', width: 100, height: 30, desc: 'Construction fence' },
        crate: { name: 'barrier_crate', width: 40, height: 40, desc: 'Wooden crate' }
    },

    // Power-up Assets (10 images)
    items: {
        speed: { name: 'item_speed', width: 35, height: 35, desc: 'Speed boost' },
        shield: { name: 'item_shield', width: 35, height: 35, desc: 'Shield' },
        invincible: { name: 'item_invincible', width: 35, height: 35, desc: 'Invincibility' },
        coinSingle: { name: 'item_coin_single', width: 25, height: 25, desc: 'Single coin' },
        coinBundle: { name: 'item_coin_bundle', width: 40, height: 25, desc: 'Coin bundle' },
        magnet: { name: 'item_magnet', width: 35, height: 35, desc: 'Magnet' },
        mysteryBox: { name: 'item_box', width: 45, height: 45, desc: 'Mystery box' },
        health: { name: 'item_health', width: 35, height: 35, desc: 'Extra life' },
        star: { name: 'item_star', width: 35, height: 35, desc: 'Score multiplier' },
        clock: { name: 'item_clock', width: 35, height: 35, desc: 'Time extension' }
    },

    // UI/Environment Assets (4 images)
    environment: {
        roadTexture: { name: 'road_texture', width: 100, height: 100, desc: 'Road surface tile' },
        grassTexture: { name: 'grass_texture', width: 100, height: 100, desc: 'Grass tile' },
        skyCity: { name: 'sky_city', width: 800, height: 200, desc: 'City background' },
        logo: { name: 'logo_game', width: 300, height: 80, desc: 'Game title logo' }
    }
};

// Total: 6 + 8 + 6 + 10 + 4 = 34 assets
export const TOTAL_ASSETS = 34;
