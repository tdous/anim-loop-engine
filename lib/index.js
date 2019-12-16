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
        this.tsDiff = 0; // Diff between new and last timestamp
        this.tsLast = 0; // Previous timestamp
        this.tsProg = 0; // Only incremented while animating
        this.loop = (ts = 0) => {
            if (!this.animate) {
                return;
            }
            if (this.tsLast !== ts) {
                this.tsDiff = ts - this.tsLast;
                this.tsProg += this.tsDiff;
                const numTasks = this.frameTasks.length;
                for (let i = 0; i < numTasks; i++) {
                    this.frameTasks[i].fn(this.tsProg, this.tsDiff, ts);
                }
            }
            this.tsLast = ts;
            this.frameReqId = window.requestAnimationFrame(this.loop);
        };
        this.addTasks = this.addTasks.bind(this);
    }
    addTask(task) {
        return this.addTasks([task])[0];
    }
    addTasks(tasks) {
        const createdIds = [];
        if (tasks.length == 0) {
            return createdIds;
        }
        tasks.forEach(task => {
            this.frameTasks.push({ id: this.lastFrameTaskId, fn: task });
            createdIds.push(this.lastFrameTaskId);
            this.lastFrameTaskId++;
        });
        return createdIds;
    }
    deleteTask(taskId) {
        this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
    }
    start(debugInterval) {
        this.frameReqId = requestAnimationFrame(this.loop);
        this.animate = true;
    }
    stop() {
        window.cancelAnimationFrame(this.frameReqId);
        this.animate = false;
    }
}
//# sourceMappingURL=index.js.map