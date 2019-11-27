/**
 * Simple boilerplate avoidance class for requestAnimationFrame looping
 * which runs an array of tasks you specify for frame. It's not clever -
 * it assumes you're keeping your frame tasks fast.
 */
export declare class AnimLoopEngine {
    private animate;
    private frameReqId;
    private frameTasks;
    private debugInterval;
    private debugTS;
    private loop;
    private debugLoop;
    addTasks(tasks: {
        id: number | string;
        fn: Function;
    }[]): void;
    deleteTask(taskId: number | string): void;
    start(debugInterval?: number): void;
    stop(): void;
}
