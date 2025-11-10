// 实体类
export class Entity {
    //构造函数
    constructor() {
    }

    public Init(): void {
        // 初始化实体
        this.OnPreInit();
        this.OnInit();
        this.OnPostInit();
    }

    /**
     * 实体前期初始化逻辑
     */
    public OnPreInit(): void {
        // 实体前期初始化逻辑
    }

    public OnInit(): void {
        // 实体初始化逻辑
    }

    public OnPostInit(): void {
        // 实体后期初始化逻辑
    }

    public Destroy(): void {
        // 实体销毁逻辑
        this.OnPreDestroy();
        this.OnDestroy();
        this.OnPostDestroy();
    }

    public OnDestroy(): void {
        // 实体销毁逻辑
    }

    public OnPreDestroy(): void {
        // 实体前期销毁逻辑
    }

    public OnPostDestroy(): void {
        // 实体后期销毁逻辑
    }
}
