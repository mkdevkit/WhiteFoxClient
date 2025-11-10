import { watch } from './vue/reactivity/watch';

export interface BinderHandler {
    SetText?: (comp: any, newValue: string) => void;
    SetVisible?: (comp: any, newValue: boolean) => void;
    OnClick?: (comp: any, callback: any) => void;
}

export class Binder {
    private watchers: Map<number, any> = new Map();
    private childBinders: Map<string, Binder> = new Map();
    private isDestroyed: boolean = false;
    private keyIndex : number = 0;
    public static handler: BinderHandler = null;

    constructor() {
        // 构造函数
    }

    AddWatcher(unwatch: any): number {
        if (this.isDestroyed) return;

        this.keyIndex++;
        this.watchers.set(this.keyIndex, unwatch);

        return this.keyIndex;
    }

    /**
     * 绑定文本组件
     * @param key 唯一标识符
     * @param getTextComponent 获取文本组件的函数
     * @param getData 获取数据的函数
     */
    BindText(comp: any, getData: () => string): number {
        if (this.isDestroyed || !Binder.handler) return;

        const watcher = watch(getData, (newValue: string, oldValue: string) => {
            Binder.handler.SetText?.(comp, newValue);
        }, { immediate: true });

        return this.AddWatcher(watcher);
    }

    /**
     * 绑定可见性
     * @param key 唯一标识符
     * @param getComponent 获取组件的函数
     * @param getData 获取数据的函数
     */
    BindVisible(comp: any, getData: () => boolean): number {
        
        if (this.isDestroyed) return;

        const watcher = watch(getData, (newValue: boolean, oldValue: boolean) => {
            Binder.handler.SetVisible?.(comp, newValue);
        }, { immediate: true });

        return this.AddWatcher(watcher);
    }

    /**
     * 绑定点击事件
     * @param key 唯一标识符
     * @param getComponent 获取组件的函数
     * @param callback 点击事件处理函数
     */
    BindClick(comp: any, callback: any): void {
        if (this.isDestroyed) return;

        Binder.handler.OnClick?.(comp, callback);
    }

    /**
     * 创建子Binder
     * @param key 唯一标识符
     * @returns Binder对象
     */
    // BindComponent(key: string): Binder {
    //     if (this.isDestroyed) {
    //         throw new Error("Binder已销毁，无法创建子Binder");
    //     }

    //     // 如果已存在同名的childBinder，先销毁它
    //     if (this.childBinders.has(key)) {
    //         this.childBinders.get(key)?.unwatch();
    //     }

    //     const childBinder = new Binder();
    //     const childBinderObj: ChildBinder = {
    //         binder: childBinder,
    //         unwatch: () => {
    //             if (!this.isDestroyed) {
    //                 childBinder.Destroy();
    //                 this.childBinders.delete(key);
    //             }
    //         }
    //     };

    //     this.childBinders.set(key, childBinderObj);
    //     return childBinderObj;
    // }

    /**
     * 取消所有绑定
     */
    Unwatch(): void {
        if (this.isDestroyed) return;

        this.watchers.forEach((unwatch) => {
            unwatch();
        });

        // 清理所有watchers
        this.watchers.clear();

        // 清理所有childBinders
        this.childBinders.forEach((childBinderObj) => {
            childBinderObj.Unwatch();
        });
        this.childBinders.clear();
    }

    /**
     * 销毁Binder及其所有子Binder
     */
    Destroy(): void {
        if (this.isDestroyed) return;

        this.Unwatch();
        this.isDestroyed = true;
    }

    /**
     * 检查Binder是否已被销毁
     */
    IsDestroyed(): boolean {
        return this.isDestroyed;
    }
}