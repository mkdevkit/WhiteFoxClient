import { _decorator, Component, Node, director, SceneAsset } from 'cc';
import { Entity } from '../../Core/Entity';

export class SceneManager extends Entity {
    private static instance: SceneManager;
    private currentScene: string = "";

    public static GetInstance(): SceneManager {
        if (!SceneManager.instance) {
            SceneManager.instance = new SceneManager();
        }
        return SceneManager.instance;
    }

    /**
     * 加载场景
     * @param sceneName 场景名称
     * @param onLaunched 加载完成回调
     */
    LoadScene(sceneName: string, onLaunched?: () => void): void {
        if (this.currentScene === sceneName) {
            console.warn(`Scene ${sceneName} is already loaded`);
            return;
        }

        director.loadScene(sceneName, () => {
            this.currentScene = sceneName;
            if (onLaunched) {
                onLaunched();
            }
        });
    }

    /**
     * 获取当前场景名称
     * @returns 当前场景名称
     */
    GetCurrentScene(): string {
        return this.currentScene;
    }

    /**
     * 预加载场景
     * @param sceneName 场景名称
     * @param onProgress 进度回调
     * @param onComplete 完成回调
     */
    PreloadScene(sceneName: string, onProgress?: (finish: number, total: number, item: any) => void, onComplete?: (error: Error | null) => void): void {
        director.preloadScene(sceneName, onProgress, onComplete);
    }

    /**
     * 添加到场景的节点
     * @param node 节点
     */
    AddToScene(node: Node): void {
        const scene = director.getScene();
        if (scene) {
            scene.addChild(node);
        }
    }

    /**
     * 从场景移除节点
     * @param node 节点
     */
    RemoveFromScene(node: Node): void {
        if (node.parent) {
            node.parent.removeChild(node);
        }
    }
}