import { _decorator, Component, resources, Node, director } from 'cc';
// import { CocosTimerManager } from '../Manager/CocosTimerManager';
// import { CocosSceneManager } from '../Manager/CocosSceneManager';
import { Binder } from '../../UI/Binder';
import { CocosFairyBinderHandler } from '../UI/CocosFairyBinderHandler';
import { CocosFairyGUIcomponent } from './CocosFairyGUIcomponent';
import { App } from '../../App/App';

const { ccclass, property } = _decorator;

@ccclass('CoscosAppComponent')
export abstract class CoscosAppComponent extends Component {
    private static inited: boolean = false;
    // private windowsManager: WindowsManager = WindowsManager.GetInstance();
    // private timerManager: CocosTimerManager = CocosTimerManager.GetInstance();
    // private sceneManager: CocosSceneManager = CocosSceneManager.GetInstance();

    CreatePersistRootNode(): void {
        // 创建全局节点承载管理器
        const appNode = new Node('App');

        // 设置为常驻节点，场景切换不销毁
        director.addPersistRootNode(appNode);

        // director.getScene().addChild(appNode);
        appNode.addComponent(CocosFairyGUIcomponent);
    }

    abstract OnAppLoad(): void;

    SetApp(app: App): void {
        App.inst = app;
    }

    protected onLoad(): void {
        if (CoscosAppComponent.inited) {
            this.node.destroy();
            return;
        }

        CoscosAppComponent.inited = true;

        this.CreatePersistRootNode();

        Binder.handler = CocosFairyBinderHandler;

        this.OnAppLoad()
    }

    protected update(deltaTime: number): void {
        // 更新定时器
        App.inst?.Update(deltaTime);
    }
}