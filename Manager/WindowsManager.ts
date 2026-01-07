import { Window } from "../UI/Window";
import { Entity } from '../Core/Entity';

export class WindowsManager extends Entity {
    private static instance: WindowsManager;
    private windows: Map<string, Window> = new Map();
    private showingWindows: Map<string, Window> = new Map();

    public static GetInstance(): WindowsManager {
        if (!WindowsManager.instance) {
            WindowsManager.instance = new WindowsManager();
        }
        return WindowsManager.instance;
    }

    /**
     * 注册窗口
     * @param name 窗口名称
     * @param windowNode 窗口节点
     */
    RegisterWindow(name: string, windowNode: Window): void {
        this.windows.set(name, windowNode);
    }

    /**
     * 显示窗口
     * @param name 窗口名称
     */
    ShowWindow(name: string): void {
        const windowNode = this.windows.get(name);
        if (windowNode) {
            windowNode.Show();
            this.showingWindows.set(name, windowNode);
        }
    }

    /**
     * 隐藏窗口
     * @param name 窗口名称
     */
    HideWindow(name: string): void {
        const windowNode = this.windows.get(name);
        if (windowNode) {
            windowNode.Hide();
            this.showingWindows.delete(name);
        }
    }

    /**
     * 获取窗口实例
     * @param name 窗口名称
     * @returns 窗口节点
     */
    GetWindow(name: string): Window | undefined {
        return this.windows.get(name);
    }

    /**
     * 关闭所有窗口
     */
    CloseAllWindows(): void {
        this.showingWindows.forEach((windowNode, name) => {
            // windowNode.active = false;
        });
        this.showingWindows.clear();
    }

    OnAfterSceneLaunch(): void {
    }
}
