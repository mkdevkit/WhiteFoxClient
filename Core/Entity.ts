// 实体类
export class Entity {
    //构造函数
    constructor() {
    }

    public Init(): void {
        // 初始化实体
        this.PreInit();
        this.OnInit();
        this.PostInit();
    }

    /**
     * 实体前期初始化逻辑
     */
    protected OnPreInit(): void {
        // 实体前期初始化逻辑
    }

    protected PreInit(): void {
        // 实体前期初始化逻辑
        this.OnPreInit();
    }

    protected OnInit(): void {
        // 实体初始化逻辑
    }

    protected OnPostInit(): void {
        // 实体后期初始化逻辑
    }

    protected PostInit(): void {
        // 实体后期初始化逻辑
        this.OnPostInit();
    }

    public Destroy(): void {
        // 实体销毁逻辑
        this.PreDestroy();
        this.OnDestroy();
        this.PostDestroy();
    }

    protected OnDestroy(): void {
        // 实体销毁逻辑
    }

    protected OnPreDestroy(): void {
        // 实体前期销毁逻辑
    }

    protected PreDestroy(): void {
        // 实体前期销毁逻辑
        this.OnPreDestroy();
    }

    protected OnPostDestroy(): void {
        // 实体后期销毁逻辑
    }

    protected PostDestroy(): void {
        // 实体后期销毁逻辑
        this.OnPostDestroy();
    }
}
