# UI Binder System

## 简介

这是一个为Cocos Creator和FairyGUI设计的数据绑定系统，灵感来源于Vue的响应式系统。该系统包含以下核心组件：

1. **Binder类** - 负责管理数据绑定和更新
2. **Window类** - 继承自Cocos Creator的Component，包含一个Binder实例
3. **ChildBinder** - 子Binder，可以通过Binder创建，用于管理窗口的局部区域

## 核心功能

### Binder类

- `BindText()` - 绑定文本组件
- `BindVisible()` - 绑定组件可见性
- `BindClick()` - 绑定点击事件
- `BindComponent()` - 创建子Binder
- `Update()` - 更新所有绑定
- `Unwatch()` - 取消所有绑定
- `Destroy()` - 销毁Binder

### Window类

- 继承自Cocos Creator的Component
- 自动管理Binder的生命周期
- 提供与Binder相同的绑定方法
- 在窗口销毁时自动销毁Binder

## 使用示例

```typescript
import { _decorator, Component } from 'cc';
import { Window } from './Window';

const { ccclass, property } = _decorator;

@ccclass('MyWindow')
export class MyWindow extends Window {
    private score: number = 0;
    private isVisible: boolean = true;
    
    // FairyGUI组件示例
    private scoreText: any; // FairyGUI的文本组件
    private button: any;    // FairyGUI的按钮组件

    protected onLoad(): void {
        super.onLoad();
        
        // 初始化FairyGUI组件
        // this.scoreText = this.uiComponent.getChild("scoreText");
        // this.button = this.uiComponent.getChild("button");
        
        // 绑定文本
        this.BindText("score", () => this.scoreText, () => `Score: ${this.score}`);
        
        // 绑定可见性
        this.BindVisible("button", () => this.button, () => this.isVisible);
        
        // 绑定点击事件
        this.BindClick("buttonClick", () => this.button, () => {
            this.score += 10;
        });
    }
    
    // 创建子Binder示例
    private CreateChildSection(): void {
        if (this.GetBinder()) {
            const childBinder = this.BindComponent("childSection");
            if (childBinder) {
                // 在子Binder中进行绑定操作
                // childBinder.binder.BindText(...);
            }
        }
    }
}
```

## 注意事项

1. 确保在窗口销毁时自动清理所有绑定
2. 子Binder会在父Binder销毁时自动销毁
3. 所有绑定方法都会检查Binder是否已被销毁
4. 可以根据实际使用的UI框架（Cocos Creator或FairyGUI）调整组件访问方式