# Racing Game 开发总结 - Claude Code 使用报告

## 一、项目概述

创建了一个 HTML5 Canvas 赛车网页游戏，包含以下功能：
- 三个难度关卡（城市/郊区/高速公路）
- 五种道具系统（加速/护盾/无敌/金币/磁铁）
- 排行榜系统（localStorage 存储前 10 名）
- 计分系统（距离分+金币分+过关奖励）
- 键盘和触屏操作
- Web Audio API 合成音效

## 二、Claude Code 使用情况

### 2.1 需求阶段

| 操作 | 描述 |
|------|------|
| 创建 SPEC.md | 详细规划了 34 张图片素材规格、游戏机制、UI布局、计分系统等 |
| 文件结构设计 | 规划了完整的 OOP 类结构（Game, GameEngine, InputManager 等） |

### 2.2 开发阶段

| 工具/命令 | 用途 |
|------------|------|
| `Write` | 创建所有 JS 文件（20+ 个） |
| `Glob` | 查找项目中的文件 |
| `Read` | 读取现有代码进行修改 |
| `Edit` | 修改代码修复 bug |

### 2.3 Bug 修复阶段

#### 问题 1：选择关卡页面点击无反应

**原因分析**：
- 点击事件绑定在 canvas 上，可能被 CSS 阻挡
- 坐标计算问题

**使用的提示词/命令**：
```bash
# 检查文件结构
Glob pattern="**/*.js"

# 读取输入管理器代码
Read file_path="/Users/dingmaomao/Workplace/html-racing-game/js/InputManager.js"

# 检查状态切换逻辑
Grep pattern="state === 'LEVEL_SELECT'"
```

**解决方案**：将点击事件改为绑定到 `window`，确保能捕获所有点击。

#### 问题 2：游戏开始后关卡选择一闪而过

**原因**：点击事件处理逻辑问题

**使用的提示词**：
```bash
# 搜索菜单点击处理
Grep pattern="handleMenuTouch"
```

#### 问题 3：分数为 0

**原因**：分数计算公式错误（除以 1000 导致结果始终为 0）

**使用的提示词**：
```bash
# 搜索分数相关代码
Grep pattern="score \+="
```

**解决方案**：改为基于 `distance * difficultyMultiplier / 10`

#### 问题 4：汽车重叠

**原因**：敌人生成时没有检测重叠

**使用的提示词**：
```bash
# 搜索敌人生成代码
Grep pattern="spawnEnemies"
```

**解决方案**：添加车道和最小距离检测

#### 问题 5：排行榜名字无法输入

**原因**：键盘事件没有正确路由到名字输入处理

**使用的提示词**：
```bash
# 搜索键盘事件处理
Grep pattern="onKeyDown"
```

**解决方案**：在 `onKeyDown` 中添加对 GAME_OVER 状态的特殊处理

### 2.4 调试技巧

| 技巧 | 说明 |
|------|------|
| `调试 | 在关键console.log` 位置添加日志输出 |
| 逐步注释代码 | 注释掉可疑代码逐步排查 |
| 简化代码 | 将复杂函数拆分为简单版本 |
| 语法检查 | `node --check file.js` |

## 三、项目文件结构

```
html-racing-game/
├── index.html
├── SPEC.md                    # 规格文档
├── css/style.css
└── js/
    ├── main.js               # 入口点
    ├── Game.js               # 主游戏类
    ├── GameEngine.js         # 60fps 游戏循环
    ├── InputManager.js       # 输入处理
    ├── AudioManager.js       # Web Audio 音效
    ├── StorageManager.js     # localStorage
    ├── Renderer.js           # Canvas 渲染
    ├── entities/
    │   ├── Player.js
    │   ├── Enemy.js
    │   ├── Item.js
    │   └── Road.js
    ├── ui/
    │   ├── TitleScreen.js
    │   ├── LevelSelect.js
    │   ├── GameHUD.js
    │   ├── GameOverScreen.js
    │   ├── Leaderboard.js
    │   └── Settings.js
    └── data/
        ├── Levels.js
        └── Assets.js
```

## 四、后续优化建议

### 4.1 更高效的 Bug 报告方式

| 建议 | 说明 |
|------|------|
| 提供具体错误信息 | 直接粘贴浏览器控制台的错误信息，而不是仅描述现象 |
| 复现步骤 | 说明"第几步操作后出现问题" |
| 期望行为 vs 实际行为 | 明确说出期望发生什么、实际发生了什么 |

### 4.2 更准确的代码修改

| 建议 | 说明 |
|------|------|
| 指定文件路径 | 直接告诉我要修改哪个文件的哪一行 |
| 批量修改 | 如果多个文件有相同问题，一次性说明 |
| 查看当前代码 | 修改前先读取文件，避免覆盖之前的修改 |

### 4.3 开发流程优化

1. **先测试再修改**：每次修改后立即测试，而不是批量修改多个问题
2. **小步提交**：每次修复一个独立的问题
3. **保留备份**：重要修改前备份原始代码

### 4.4 自动化建议

- 添加单元测试框架（如 Jest）
- 使用 ESLint 进行代码检查
- 配置 CI/CD 自动构建和测试

### 4.5 代码质量建议

- 添加 TypeScript 类型检查
- 完善 JSDoc 注释
- 分离业务逻辑和渲染逻辑
- 添加游戏状态机管理

## 五、经验总结

### 成功经验
1. **SPEC.md 文档很重要**：提前规划好功能、UI、数据结构，避免后期大幅修改
2. **模块化设计**：OOP 架构使得修改某个功能不影响其他模块
3. **逐步迭代**：先实现核心功能，再逐步添加细节

### 教训
1. **调试信息不足**：早期没有足够的日志，导致排查问题困难
2. **代码简化不足**：部分函数过于复杂，应该拆分
3. **测试不充分**：应该在开发过程中就进行测试，而不是等所有功能完成

---

*本文档总结于 2026年3月*
