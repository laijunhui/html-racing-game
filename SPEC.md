# Racing Game Specification Document

## 1. Project Overview

- **Project Name**: Speed Racer HTML5
- **Project Type**: Browser-based racing game
- **Core Functionality**: A vertical scrolling racing game where players dodge obstacles, collect items, and race through three increasingly difficult levels
- **Target Users**: Casual gamers on desktop and mobile devices

---

## 2. UI/UX Specification

### 2.1 Layout Structure

#### Screen Layouts
1. **Title Screen** (800x600 canvas)
   - Game logo/title at top (centered)
   - "START GAME" button (center)
   - "LEADERBOARD" button
   - "SETTINGS" button
   - Animated background with scrolling road

2. **Level Select Screen**
   - Three level buttons: City/Suburban/Highway
   - Level preview thumbnails
   - Difficulty indicators (stars)
   - Back button

3. **Game Screen**
   - Top HUD bar: Score, Coins, Distance, Current Item
   - Main game area (road + obstacles)
   - Player car at bottom
   - Bottom bar: Item slots (3 slots)
   - Pause button (top-right corner)

4. **Game Over Screen**
   - Final score display
   - Distance traveled
   - Coins collected
   - "NEW HIGH SCORE" badge (if applicable)
   - "PLAY AGAIN" button
   - "MAIN MENU" button

5. **Leaderboard Screen**
   - Top 10 scores display
   - Player name input for new high score
   - Clear scores button
   - Back button

6. **Settings Screen**
   - Sound toggle (on/off)
   - Music toggle
   - Control mode display
   - Credits

### 2.2 Visual Design

#### Color Palette
| Usage | Color | Hex Code |
|-------|-------|----------|
| Primary Background | Dark Navy | #0a0a1a |
| Secondary Background | Deep Purple | #1a1a2e |
| Road Surface | Dark Gray | #2d2d3a |
| Road Markings | White | #ffffff |
| Road Edges | Yellow | #ffd700 |
| UI Accent | Electric Blue | #00d4ff |
| UI Secondary | Neon Pink | #ff2d7c |
| Success/Score | Bright Green | #00ff88 |
| Warning/Danger | Red | #ff4444 |
| Gold/Coin | Gold | #ffd700 |
| Text Primary | White | #ffffff |
| Text Secondary | Light Gray | #b0b0b0 |

#### Typography
- **Primary Font**: "Orbitron" (Google Fonts) - Futuristic racing feel
- **Fallback**: "Segoe UI", sans-serif
- **Title Size**: 48px bold
- **Heading Size**: 32px bold
- **Body Size**: 18px regular
- **HUD Size**: 16px bold
- **Small Text**: 14px regular

#### Spacing System
- Base unit: 8px
- Small: 8px
- Medium: 16px
- Large: 24px
- XL: 32px
- XXL: 48px

#### Visual Effects
- Road scrolling: continuous vertical animation
- Car shadow: 4px offset, rgba(0,0,0,0.3)
- Button hover: scale(1.05) + glow effect
- Score popup: float up + fade out animation
- Item pickup: particle burst effect
- Screen shake on collision
- Speed lines at high velocity

### 2.3 Components

#### Buttons
- **Default**: Rounded rectangle, gradient background (#00d4ff to #0099cc), white text
- **Hover**: Brighten + add glow shadow
- **Active**: Scale down slightly
- **Disabled**: Grayed out, reduced opacity

#### HUD Elements
- Score: Digital counter with leading zeros
- Coins: Icon + count
- Distance: km counter
- Item indicator: Icon with countdown timer

#### Player Car
- 3-frame animation for engine idle
- Tilt animation when moving left/right
- Collision flash effect

#### Obstacles
- Cars: Various colors, 2-frame windshield animation
- Barriers: Orange/white stripes
- Road blocks: Red/white
- Oil puddles: Dark spreading effect

#### Power-ups
- Speed Boost: Lightning bolt icon (orange glow)
- Shield: Blue bubble effect
- Invincibility: Rainbow shimmer
- Coin: Spinning gold animation
- Magnet: Blue pull effect

---

## 3. 34 Image Assets Specification

### 3.1 Player Car Assets (6 images)
| # | Name | Description | Size | Format |
|---|------|-------------|------|--------|
| 1 | player_car_body | Main car body without wheels | 60x80px | PNG |
| 2 | player_car_wheels | Front and rear wheels | 20x20px | PNG |
| 3 | player_car_front | Front view (for effects) | 60x30px | PNG |
| 4 | player_car_exhaust | Exhaust flame (speed boost) | 15x25px | PNG |
| 5 | player_car_shield | Blue shield bubble | 80x100px | PNG |
| 6 | player_car_invincible | Rainbow aura effect | 90x110px | PNG |

### 3.2 Enemy/Vehicle Assets (8 images)
| # | Name | Description | Size | Format |
|---|------|-------------|------|--------|
| 7 | enemy_car_red | Red enemy car | 55x75px | PNG |
| 8 | enemy_car_blue | Blue enemy car | 55x75px | PNG |
| 9 | enemy_car_green | Green enemy car | 55x75px | PNG |
| 10 | enemy_car_yellow | Yellow enemy car | 55x75px | PNG |
| 11 | enemy_truck | Large delivery truck | 65x95px | PNG |
| 12 | enemy_bus | City bus | 70x110px | PNG |
| 13 | enemy_motorcycle | Motorcycle | 30x50px | PNG |
| 14 | enemy_police | Police car with lights | 55x75px | PNG |

### 3.3 Obstacle Assets (6 images)
| # | Name | Description | Size | Format |
|---|------|-------------|------|--------|
| 15 | barrier_cone | Traffic cone | 25x35px | PNG |
| 16 | barrier_block | Road block | 80x25px | PNG |
| 17 | barrier_tire | Discarded tire | 30x30px | PNG |
| 18 | oil_puddle | Oil spill | 50x50px | PNG |
| 19 | barrier_fence | Construction fence | 100x30px | PNG |
| 20 | barrier_crate | Wooden crate | 40x40px | PNG |

### 3.4 Power-up Assets (10 images)
| # | Name | Description | Size | Format |
|---|------|-------------|------|--------|
| 21 | item_speed | Speed boost (lightning) | 35x35px | PNG |
| 22 | item_shield | Shield (blue bubble) | 35x35px | PNG |
| 23 | item_invincible | Invincibility (star) | 35x35px | PNG |
| 24 | item_coin_single | Single coin | 25x25px | PNG |
| 25 | item_coin_bundle | Coin bundle (5 coins) | 40x25px | PNG |
| 26 | item_magnet | Magnet | 35x35px | PNG |
| 27 | item_box | Mystery item box | 45x45px | PNG |
| 28 | item_health | Extra life | 35x35px | PNG |
| 29 | item_star | Score multiplier | 35x35px | PNG |
| 30 | item_clock | Time extension | 35x35px | PNG |

### 3.5 UI/Environment Assets (4 images)
| # | Name | Description | Size | Format |
|---|------|-------------|------|--------|
| 31 | road_texture | Road surface tile | 100x100px | PNG |
| 32 | grass_texture | Grass/terrain tile | 100x100px | PNG |
| 33 | sky_city | City background | 800x200px | PNG |
| 34 | logo_game | Game title logo | 300x80px | PNG |

---

## 4. Functionality Specification

### 4.1 Core Game Mechanics

#### Player Movement
- Horizontal movement only (left/right)
- Movement speed: 8px per frame at 60fps
- Boundary constraints: Cannot leave road area
- Smooth acceleration/deceleration on input

#### Road System
- Vertical scrolling road
- Three lanes (or continuous movement within road bounds)
- Road width: 400px (canvas 800px - 200px margins each side)
- Lane markers: dashed white lines

#### Difficulty Levels

| Level | Base Speed | Max Speed | Obstacle Density | Enemy Variety | Distance/Level |
|-------|------------|-----------|------------------|---------------|----------------|
| City | 300px/s | 450px/s | Low (1 per 1.5s) | Cars only | 5000m |
| Suburban | 400px/s | 550px/s | Medium (1 per 1.2s) | Cars+Trucks | 8000m |
| Highway | 500px/s | 700px/s | High (1 per 0.8s) | All types | 12000m |

#### Collision Detection
- Rectangle-based collision
- Player hitbox: 50x70px (smaller than visual)
- Invincibility frames after hit: 60 frames (1 second)
- Shield absorbs one hit

### 4.2 Item/Power-up System

| Item | Effect | Duration | Spawn Rate |
|------|--------|----------|------------|
| Speed Boost | +50% speed temporarily | 5 seconds | 15% |
| Shield | Blocks one collision | Until hit | 10% |
| Invincibility | Pass through obstacles | 8 seconds | 8% |
| Coin | +10 to coin count | Instant | 40% |
| Magnet | Attracts nearby coins | 10 seconds | 12% |
| Mystery Box | Random item | Instant | 15% |

#### Item Spawning
- Random position within road bounds
- Spawn interval: 3-6 seconds (varies by level)
- Despawn after 4 seconds if not collected
- Maximum 3 items on screen

### 4.3 Scoring System

#### Score Calculation
```
Total Score = Distance Score + Coin Score + Level Bonus

Distance Score = meters_traveled * difficulty_multiplier
  - City: 1 point per meter
  - Suburban: 1.5 points per meter
  - Highway: 2 points per meter

Coin Score = coins_collected * 10

Level Completion Bonus:
  - Clear City: +1000 points
  - Clear Suburban: +2500 points
  - Clear Highway: +5000 points
```

### 4.4 Leaderboard System

#### Storage
- localStorage key: "racing_game_leaderboard"
- JSON array of max 10 entries
- Each entry: { name: string, score: number, level: string, date: string }

#### Display
- Ranked by score (descending)
- Shows: Rank, Name, Score, Level
- Highlights current player's entry

### 4.5 Controls

#### Keyboard
| Key | Action |
|-----|--------|
| Arrow Left / A | Move left |
| Arrow Right / D | Move right |
| Space | Use item (if available) |
| P / Escape | Pause game |
| Enter | Confirm/Select |

#### Touch/Mobile
- Left side tap: Move left
- Right side tap: Move right
- Swipe left/right: Move in direction
- Tap item slot: Use item
- Tap pause button: Pause

### 4.6 Audio System (Web Audio API)

#### Sound Effects
| Event | Sound Type | Parameters |
|-------|------------|------------|
| Game Start | Engine rev up | Oscillator sweep 100Hz→500Hz |
| Car Move | Tire squeak (subtle) | White noise + filter |
| Collect Item | Power-up chime | Triangle wave arpeggio |
| Get Coin | Coin ding | Sine wave 880Hz, quick decay |
| Speed Boost | Turbo whoosh | Noise + bandpass sweep |
| Shield Activate | Bubble pop | Sine wave with vibrato |
| Invincibility | Shield hum | Sawtooth + LFO |
| Hit Obstacle | Crash | Noise burst + distortion |
| Level Complete | Fanfare | Major chord arpeggio |
| Game Over | Descending tone | Sine sweep down |
| Button Click | UI blip | Short square wave |

#### Music (Optional Background)
- Procedurally generated chiptune
- 4-bar loop, tempo varies by level
- City: 100 BPM, minor key
- Suburban: 110 BPM, mixed
- Highway: 130 BPM, major key

---

## 5. Technical Architecture (OOP)

### 5.1 Class Structure

```
Game
├── GameEngine (main loop, state management)
├── InputManager (keyboard, touch)
├── AudioManager (Web Audio API)
├── StorageManager (localStorage)
├── Renderer (Canvas drawing)
│
├── GameObject (base class)
│   ├── Player
│   ├── Enemy
│   ├── Obstacle
│   ├── Item
│   ├── Road
│   ├── Particle
│   └── UIElement
│
├── GameState (enumeration)
│   ├── TITLE
│   ├── LEVEL_SELECT
│   ├── PLAYING
│   ├── PAUSED
│   ├── GAME_OVER
│   ├── LEADERBOARD
│   └── SETTINGS
│
└── Level (configuration)
    ├── City
    ├── Suburban
    └── Highway
```

### 5.2 Performance Requirements

- Target: 60 FPS (16.67ms frame budget)
- Object pooling for obstacles and particles
- RequestAnimationFrame for game loop
- Delta time for frame-independent movement
- Canvas optimization: minimize draw calls, use layers

---

## 6. Acceptance Criteria

### Visual Checkpoints
- [ ] Title screen displays with animated road background
- [ ] Three level buttons with difficulty indicators
- [ ] Player car renders with smooth animation
- [ ] Road scrolls smoothly without jitter
- [ ] HUD displays all information clearly
- [ ] Power-ups spawn with glow effects
- [ ] Collision effects visible (particles, flash)
- [ ] Game over screen shows all stats

### Functional Checkpoints
- [ ] Keyboard controls responsive
- [ ] Touch controls work on mobile
- [ ] All three levels playable
- [ ] Difficulty increases per level
- [ ] All five power-ups functional
- [ ] Scoring calculates correctly
- [ ] Leaderboard saves/loads properly
- [ ] Sound effects play on all events
- [ ] Game pauses/resumes correctly
- [ ] 60 FPS maintained during gameplay

### Edge Cases
- [ ] Window resize handled gracefully
- [ ] Touch and keyboard can work together
- [ ] localStorage unavailable: graceful fallback
- [ ] Audio context requires user interaction to start

---

## 7. File Structure

```
html-racing-game/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Styles (minimal, mostly canvas)
├── js/
│   ├── main.js         # Entry point
│   ├── Game.js         # Main game class
│   ├── GameEngine.js   # Game loop, timing
│   ├── InputManager.js # Input handling
│   ├── AudioManager.js # Web Audio
│   ├── StorageManager.js # localStorage
│   ├── Renderer.js     # Canvas rendering
│   ├── entities/
│   │   ├── GameObject.js
│   │   ├── Player.js
│   │   ├── Enemy.js
│   │   ├── Obstacle.js
│   │   ├── Item.js
│   │   ├── Road.js
│   │   └── Particle.js
│   ├── ui/
│   │   ├── Screen.js
│   │   ├── TitleScreen.js
│   │   ├── LevelSelect.js
│   │   ├── GameHUD.js
│   │   ├── GameOverScreen.js
│   │   ├── Leaderboard.js
│   │   └── Settings.js
│   └── data/
│       ├── Levels.js
│       └── Assets.js
├── assets/
│   └── images/          # 34 PNG files (placeholder/generated)
└── SPEC.md             # This document
```
