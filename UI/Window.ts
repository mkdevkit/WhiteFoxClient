import { Binder } from './Binder';
import { Entity } from '../Core/Entity';

export class Window extends Entity {
    protected binder: Binder = new Binder();
    protected isWindowDestroyed: boolean = false;

    /**
     * 获取窗口的Binder实例
     */
    GetBinder(): Binder | null {
        return this.binder;
    }

    Show(): void {
        // 显示窗口逻辑
        this.OnShow();
    }

    Hide(): void {
        // 隐藏窗口逻辑
        this.OnHide();
    }

    protected OnShow(): void {
        // 子类重写以实现显示逻辑
    }

    protected OnHide(): void {
        // 子类重写以实现隐藏逻辑
    }

    /**
     * 销毁窗口及其Binder
     */
    public OnDestroy(): void {
        this.DestroyWindow();
    }

    /**
     * 销毁窗口
     */
    DestroyWindow(): void {
        if (this.isWindowDestroyed) return;

        if (this.binder) {
            this.binder.Destroy();
            this.binder = null;
        }

        this.isWindowDestroyed = true;
    }

    /**
     * 检查窗口是否已被销毁
     */
    IsWindowDestroyed(): boolean {
        return this.isWindowDestroyed;
    }
}