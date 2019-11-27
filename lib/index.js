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
        this.debugInterval = 0;
        this.debugTS = 0;
        this.loop = (ts = 0) => {
            const numTasks = this.frameTasks.length;
            for (let i = 0; i < numTasks; i++) {
                this.frameTasks[i].fn();
            }
            this.frameReqId = requestAnimationFrame(this.loop);
        };
        // Debugging loop to avoid a conditional within the loop
        this.debugLoop = (ts = 0) => {
            if (ts - this.debugTS > this.debugInterval) {
                this.debugTS = ts;
                const numTasks = this.frameTasks.length;
                for (let i = 0; i < numTasks; i++) {
                    this.frameTasks[i].fn();
                }
            }
            this.frameReqId = requestAnimationFrame(this.debugLoop);
        };
    }
    addTasks(tasks) {
        if (tasks.length > 0) {
            this.frameTasks = [...this.frameTasks, ...tasks];
        }
    }
    deleteTask(taskId) {
        this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
    }
    start(debugInterval) {
        if (!this.animate) {
            this.animate = true;
            if (debugInterval) {
                this.debugInterval = debugInterval;
                this.debugLoop();
                return;
            }
            this.loop();
        }
    }
    stop() {
        cancelAnimationFrame(this.frameReqId);
        this.animate = false;
    }
}
//# sourceMappingURL=index.js.map