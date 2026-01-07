import { _decorator, Node, TiledMap, TiledLayer, Vec2, Vec3 } from 'cc';

const { ccclass } = _decorator;

/**
 * TmxMap 管理类（适配 Cocos Creator）
 * - 管理一个 TiledMap 组件实例
 * - 提供常用的图层/瓦片/坐标转换/对象层访问方法
 *
 * 使用示例:
 *   const mgr = new TmxMap(node.getComponent(TiledMap));
 *   const gid = mgr.getTileGID('Ground', 10, 5);
 */
@ccclass('TmxMap')
export default class TmxMap {
    private tiledMap: TiledMap | null = null;

    constructor(tiledMap?: TiledMap | null) {
        if (tiledMap) this.Attach(tiledMap);
    }

    // 绑定一个已有的 TiledMap 组件
    private Attach(tiledMap: TiledMap) {
        this.tiledMap = tiledMap;
    }

    // 返回绑定节点（如果有）
    GetNode(): Node | null {
        return this.tiledMap ? (this.tiledMap as any).node ?? null : null;
    }

    // 获取图层对象（TiledLayer），不存在返回 null
    GetLayer(name: string): TiledLayer | null {
        if (!this.tiledMap) return null;
        try {
            // getLayer 在 v2/v3 均可用
            const layer = (this.tiledMap as any).getLayer(name);
            return layer ?? null;
        } catch {
            return null;
        }
    }

    // 获取指定图层某格子的 GID（x,y 为 tile 坐标）
    GetTileGID(layerName: string, x: number, y: number): number {
        const layer = this.GetLayer(layerName);
        if (!layer) return 0;
        try {
            // 支持不同版本 API 传参形式
            if (typeof (layer.getTileGIDAt) === 'function') {
                // 尝试多种调用形式
                // try { return layer.getTileGIDAt(new Vec2(x, y)); } catch { /* ignore */ }
                try { return layer.getTileGIDAt(x, y); } catch { /* ignore */ }
            }
        } catch {
            // ignore
        }
        return 0;
    }

    // 设置指定图层某格子的 GID（返回是否成功）
    SetTileGID(layerName: string, x: number, y: number, gid: number): boolean {
        const layer = this.GetLayer(layerName);
        if (!layer) return false;
        try {
            if (typeof (layer.setTileGIDAt) === 'function') {
                // try { layer.setTileGIDAt(gid, new Vec2(x, y)); return true; } catch { /* ignore */ }
                try { layer.setTileGIDAt(gid, x, y); return true; } catch { /* ignore */ }
            }
        } catch {}
        return false;
    }

    // 获取 GID 对应的属性（如果地图资源提供了）
    GetPropertiesForGID(gid: number): any | null {
        if (!this.tiledMap) return null;
        try {
            const props = (this.tiledMap as any).getPropertiesForGID(gid);
            return props ?? null;
        } catch {
            return null;
        }
    }

    // 获取对象层（object group）里的对象数组
    GetObjectGroup(name: string): any[] | null {
        if (!this.tiledMap) return null;
        try {
            const group = (this.tiledMap as any).getObjectGroup(name);
            // v3 返回的是 TiledObjectGroup（可能带出 objects 属性）
            if (!group) return null;
            if (Array.isArray(group)) return group;
            return group.objects ?? null;
        } catch {
            return null;
        }
    }

    // 基于正交地图简单的 世界坐标 -> tile 坐标 转换（返回整数 tile 坐标）
    WorldToTile(worldPos: Vec2 | Vec3): Vec2 | null {
        if (!this.tiledMap) return null;
        try {
            const mapSize = (this.tiledMap as any).getMapSize();
            const tileSize = (this.tiledMap as any).getTileSize();
            if (!mapSize || !tileSize) return null;
            const x = Math.floor((worldPos.x + (tileSize.width * 0.5)) / tileSize.width);
            const y = Math.floor(((mapSize.height * tileSize.height) - worldPos.y + (tileSize.height * 0.5)) / tileSize.height);
            return new Vec2(x, y);
        } catch {
            return null;
        }
    }

    // 基于正交地图简单的 tile 坐标 -> 世界坐标（返回瓦片中心）
    TileToWorld(tx: number, ty: number): Vec2 | null {
        if (!this.tiledMap) return null;
        try {
            const mapSize = (this.tiledMap as any).getMapSize();
            const tileSize = (this.tiledMap as any).getTileSize();
            if (!mapSize || !tileSize) return null;
            const x = tx * tileSize.width + tileSize.width * 0.5;
            const y = (mapSize.height - ty - 1) * tileSize.height + tileSize.height * 0.5;
            return new Vec2(x, y);
        } catch {
            return null;
        }
    }

    // 简单清理
    Destroy() {
        this.tiledMap = null;
    }
}