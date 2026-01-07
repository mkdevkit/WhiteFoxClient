import { _decorator, Component, Node, director, Director, game, Game } from 'cc';
import { App } from '../../App/App';

import * as fgui from 'fairygui-cc';
const { ccclass, property } = _decorator;

@ccclass('CocosFairyGUIcomponent')
export class CocosFairyGUIcomponent extends Component {
    // 场景切换时的清理（可选，避免内存泄漏）
    onLoad() {
        // 监听场景切换事件，可在此处理 UI 清理（但不销毁 GRoot）
        director.on(Director.EVENT_BEFORE_SCENE_LOADING, this.OnBeforeSceneLoad, this);
        director.on(Director.EVENT_AFTER_SCENE_LAUNCH, this.OnAfterSceneLaunch, this);
    }

    onDestroy() {
        director.off(Director.EVENT_BEFORE_SCENE_LOADING, this.OnBeforeSceneLoad, this);
        director.off(Director.EVENT_AFTER_SCENE_LAUNCH, this.OnAfterSceneLaunch, this);
    }

    // 场景切换前的处理（比如隐藏/清理当前 UI，但保留 GRoot）
    private OnBeforeSceneLoad() {
        // this.gRoot.removeChildren();
    }

    private OnAfterSceneLaunch() {
        // 示例：重新初始化 GRoot（如果场景切换后需要重新适配屏幕）
        fgui.GRoot.create();

        App.inst?.windowsManager?.OnAfterSceneLaunch();
    }
}
