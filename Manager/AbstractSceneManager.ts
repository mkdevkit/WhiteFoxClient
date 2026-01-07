import { Entity } from "../Core/Entity";

export abstract class AbstractSceneManager extends Entity {
    abstract LoadScene(sceneName: string, onLaunched?: () => void): void;
    abstract GetCurrentScene(): string;
    abstract PreloadScene(sceneName: string, onProgress?: (finish: number, total: number, item: any) => void, onComplete?: (error: Error | null) => void): void;
}
