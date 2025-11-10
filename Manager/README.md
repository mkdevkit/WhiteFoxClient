# GamePlay Framework

## 管理器使用说明

### WindowsManager - 窗口管理器
用于管理游戏中的UI窗口，支持注册、显示、隐藏窗口等操作。

```typescript
// 获取实例
const windowsManager = WindowsManager.GetInstance();

// 注册窗口
windowsManager.RegisterWindow("mainWindow", windowNode);

// 显示窗口
windowsManager.ShowWindow("mainWindow");

// 隐藏窗口
windowsManager.HideWindow("mainWindow");
```

### TimerManager - 定时器管理器
用于管理游戏中的定时器，支持一次性定时器和循环定时器。

```typescript
// 获取实例
const timerManager = TimerManager.GetInstance();

// 创建一次性定时器
const timerId = timerManager.SetTimeout(() => {
    console.log("定时器触发");
}, 1000);

// 创建循环定时器
const intervalId = timerManager.SetInterval(() => {
    console.log("循环定时器触发");
}, 2000);

// 清除定时器
timerManager.ClearTimeout(timerId);
timerManager.ClearInterval(intervalId);
```

### SceneManager - 场景管理器
用于管理游戏场景的加载和切换。

```typescript
// 获取实例
const sceneManager = SceneManager.GetInstance();

// 加载场景
sceneManager.LoadScene("GameScene");

// 预加载场景
sceneManager.PreloadScene("GameScene", (finish, total, item) => {
    console.log(`预加载进度: ${finish}/${total}`);
}, (error) => {
    if (error) {
        console.error("预加载失败:", error);
    } else {
        console.log("预加载完成");
    }
});
```

### GameManager - 游戏管理器
作为全局管理器，整合了所有其他管理器。

```typescript

// 获取各个管理器
const windowsManager = gameManager.GetWindowsManager();
const timerManager = gameManager.GetTimerManager();
const sceneManager = gameManager.GetSceneManager();
```