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

  constructor() {
    this.addTasks = this.addTasks.bind(this);
  }

  private loop = (ts: number = 0) => {
    const numTasks = this.frameTasks.length;
    for (let i = 0; i < numTasks; i++) {
      this.frameTasks[i].fn(ts);
    }

    this.frameReqId = requestAnimationFrame(this.loop);
  };

  addTask(task: Function) {
    this.addTasks([task]);
  }

  addTasks(tasks: Function[]) {
    if (tasks.length > 0) {
      const createdIds: number[] = [];
      tasks.forEach(task => {
        this.frameTasks.push({ id: this.lastFrameTaskId, fn: task });
        createdIds.push(this.lastFrameTaskId);
        this.lastFrameTaskId++;
      });

      return createdIds;
    }
  }

  deleteTask(taskId: number) {
    this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
  }

  start(debugInterval?: number) {
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
