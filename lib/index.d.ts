/**
 * Simple boilerplate avoidance class for requestAnimationFrame looping
 * which runs an array of tasks you specify for frame. It's not clever -
 * it assumes you're keeping your frame tasks fast.
 */
export declare class AnimLoopEngine {
    private animate;
    private frameReqId;
    private frameTasks;
    private lastFrameTaskId;
    constructor();
    private loop;
    addTask(task: Function): number;
    addTasks(tasks: Function[]): number[];
    deleteTask(taskId: number): void;
    start(debugInterval?: number): void;
    stop(): void;
}
