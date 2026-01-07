import { Entity } from "../Core/Entity";
import { WindowsManager } from "./../Manager/WindowsManager";
import { AbstractSceneManager } from "../Manager/AbstractSceneManager";

export class App extends Entity {
    // private windowsManager: WindowsManager = WindowsManager.GetInstance();
    // private timerManager: CocosTimerManager = CocosTimerManager.GetInstance();
    // private sceneManager: CocosSceneManager = CocosSceneManager.GetInstance();
    static inst: App = null;
    windowsManager: WindowsManager = null;
    sceneManager: AbstractSceneManager = null;
    Update(deltaTime: number): void {
    }
}