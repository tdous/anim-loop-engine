/**
 * Simple boilerplate avoidance class for requestAnimationFrame looping
 * which runs an array of tasks you specify for frame. It's not clever -
 * it assumes you're keeping your frame tasks fast.
 */
export class AnimLoopEngine {
    constructor() {
        this.animate = false;
        this.frameReqId = 0;
        this.frameTasks = [];
        this.lastFrameTaskId = 0;
        this.loop = (ts = 0) => {
            const numTasks = this.frameTasks.length;
            for (let i = 0; i < numTasks; i++) {
                this.frameTasks[i].fn(ts);
            }
            this.frameReqId = requestAnimationFrame(this.loop);
        };
        this.addTasks = this.addTasks.bind(this);
    }
    addTask(task) {
        this.addTasks([task]);
    }
    addTasks(tasks) {
        if (tasks.length > 0) {
            const createdIds = [];
            tasks.forEach(task => {
                this.frameTasks.push({ id: this.lastFrameTaskId, fn: task });
                createdIds.push(this.lastFrameTaskId);
                this.lastFrameTaskId++;
            });
            return createdIds;
        }
    }
    deleteTask(taskId) {
        this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
    }
    start(debugInterval) {
        if (!this.animate) {
            this.animate = true;
            this.loop();
        }
    }
    stop() {
        cancelAnimationFrame(this.frameReqId);
        this.animate = false;
    }
}
//# sourceMappingURL=index.js.map