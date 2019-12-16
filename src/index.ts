/**
 * Simple boilerplate avoidance class for requestAnimationFrame looping
 * which runs an array of tasks you specify for frame. It's not clever -
 * it assumes you're keeping your frame tasks fast.
 */
export class AnimLoopEngine {
  private animate: boolean = false;
  private frameReqId: number = 0;
  private frameTasks: any[] = [];
  private lastFrameTaskId: number = 0;

  private tsDiff: number = 0; // Diff between new and last timestamp
  private tsLast: number = 0; // Previous timestamp
  private tsProg: number = 0; // Only incremented while animating

  constructor() {
    this.addTasks = this.addTasks.bind(this);
  }

  private loop = (ts: number = 0) => {
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

  addTask(task: Function) {
    return this.addTasks([task])[0];
  }

  addTasks(tasks: Function[]) {
    const createdIds: number[] = [];

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

  deleteTask(taskId: number) {
    this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
  }

  start(debugInterval?: number) {
    this.frameReqId = requestAnimationFrame(this.loop);
    this.animate = true;
  }

  stop() {
    window.cancelAnimationFrame(this.frameReqId);
    this.animate = false;
  }
}
