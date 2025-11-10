import * as fgui from "fairygui-cc";
import { Window } from "../../UI/Window";

export class CocosFairyWindow extends Window {
    protected view: fgui.GComponent | null = null;
    protected window: fgui.Window | null = null;

    //构造函数
    constructor() {
        super();

        this.view = fgui.UIPackage.createObject(this.GetPackageName(), this.GetComponentName()).asCom;
        this.window = new fgui.Window();
        this.window.contentPane = this.view;

        super.Init();
    }

    Destroy(): void {
        super.Destroy();

        this.window.dispose();
    }

    public OnShow(): void {
        this.window.show();
    }

    public OnHide(): void {
        this.window.hide();
    }

    public GetPackageName(): string {
        return "";
    }

    public GetComponentName(): string {
        return "";
    }

    public GetView(): fgui.GComponent {
        return this.view;
    }

    public GetChild(name: string): fgui.GObject | null {
        return this.view.getChild(name);
    }
}