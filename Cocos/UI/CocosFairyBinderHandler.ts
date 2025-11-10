import { BinderHandler } from "../../UI/Binder";


export class CocosFairyBinderHandler implements BinderHandler {
    public static SetText(comp: any, newValue: string): void {
        const textComponent = comp;
        if (textComponent && textComponent.text !== undefined) {
            textComponent.text = newValue;
        }
    };

    public static SetVisible(comp: any, newValue: boolean): void {
        const visibleComponent = comp;
        if (visibleComponent) {
            visibleComponent.visible = newValue;
        }
    }

    public static OnClick(comp: any, callback: any): void {
        const component = comp;
        if (component) {
            if (component.onClick) {
                component.onClick(callback);
            }
        }
    }
}
