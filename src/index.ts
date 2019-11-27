/**
 * Simple boilerplate avoidance class for requestAnimationFrame looping
 * which runs an array of tasks you specify for frame. It's not clever -
 * it assumes you're keeping your frame tasks fast.
 */
export class AnimLoopEngine {
  private animate: boolean = false;
  private frameReqId: number = 0;
  private frameTasks: any[] = [];

  private debugInterval: number = 0;
  private debugTS: number = 0;

  private loop = (ts: number = 0) => {
    const numTasks = this.frameTasks.length;
    for (let i = 0; i < numTasks; i++) {
      this.frameTasks[i].fn();
    }

    this.frameReqId = requestAnimationFrame(this.loop);
  };

  // Debugging loop to avoid a conditional within the loop
  private debugLoop = (ts: number = 0) => {
    if (ts - this.debugTS > this.debugInterval) {
      this.debugTS = ts;
      const numTasks = this.frameTasks.length;
      for (let i = 0; i < numTasks; i++) {
        this.frameTasks[i].fn();
      }
    }

    this.frameReqId = requestAnimationFrame(this.debugLoop);
  };

  addTasks(tasks: { id: number | string, fn: Function }[]) {
    if (tasks.length > 0) {
      this.frameTasks = [...this.frameTasks, ...tasks];
    }
  }

  deleteTask(taskId: number | string) {
    this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
  }

  start(debugInterval?: number) {
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
