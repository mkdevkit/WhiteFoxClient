import { Entity } from '../../Core/Entity';

export class TimerManager extends Entity {
    private static instance: TimerManager;
    private timers: Map<number, TimerInfo> = new Map();
    private timerIdCounter: number = 0;

    public static GetInstance(): TimerManager {
        if (!TimerManager.instance) {
            TimerManager.instance = new TimerManager();
        }
        return TimerManager.instance;
    }

    /**
     * 添加一次性定时器
     * @param callback 回调函数
     * @param delay 延迟时间(毫秒)
     * @returns 定时器ID
     */
    SetTimeout(callback: Function, delay: number): number {
        this.timerIdCounter++;
        const timerId = this.timerIdCounter;
        
        const timerInfo: TimerInfo = {
            id: timerId,
            callback: callback,
            delay: delay,
            startTime: Date.now(),
            repeat: false,
            interval: 0
        };
        
        this.timers.set(timerId, timerInfo);
        return timerId;
    }

    /**
     * 添加循环定时器
     * @param callback 回调函数
     * @param interval 间隔时间(毫秒)
     * @returns 定时器ID
     */
    SetInterval(callback: Function, interval: number): number {
        this.timerIdCounter++;
        const timerId = this.timerIdCounter;
        
        const timerInfo: TimerInfo = {
            id: timerId,
            callback: callback,
            delay: interval,
            startTime: Date.now(),
            repeat: true,
            interval: interval
        };
        
        this.timers.set(timerId, timerInfo);
        return timerId;
    }

    /**
     * 清除定时器
     * @param timerId 定时器ID
     */
    ClearTimeout(timerId: number): void {
        this.timers.delete(timerId);
    }

    /**
     * 清除循环定时器
     * @param timerId 定时器ID
     */
    ClearInterval(timerId: number): void {
        this.timers.delete(timerId);
    }

    /**
     * 更新定时器，需要在每帧调用
     * @param deltaTime 帧间隔时间
     */
    Update(deltaTime: number): void {
        const now = Date.now();
        const finishedTimers: number[] = [];

        this.timers.forEach((timerInfo, timerId) => {
            const elapsed = now - timerInfo.startTime;
            
            if (elapsed >= timerInfo.delay) {
                try {
                    timerInfo.callback();
                } catch (error) {
                    console.error("Timer callback error:", error);
                }
                
                if (timerInfo.repeat) {
                    // 循环定时器重置开始时间
                    timerInfo.startTime = now;
                } else {
                    // 一次性定时器标记为完成
                    finishedTimers.push(timerId);
                }
            }
        });

        // 清除已完成的定时器
        finishedTimers.forEach(timerId => {
            this.timers.delete(timerId);
        });
    }
}

interface TimerInfo {
    id: number;
    callback: Function;
    delay: number;
    startTime: number;
    repeat: boolean;
    interval: number;
}