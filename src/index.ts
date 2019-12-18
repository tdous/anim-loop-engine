/**
 * Simple boilerplate avoidance class for requestAnimationFrame looping
 * which runs an array of tasks you specify for frame. It's not clever -
 * it assumes you're keeping your frame tasks fast.
 */
export class AnimLoopEngine {
  private frameReqId: number | null = 0;
  private frameTasks: any[] = [];
  private lastFrameTaskId: number = 0;

  private tsPrev: number | null = 0; // Previous timestamp

  constructor() {
    this.addTasks = this.addTasks.bind(this);
  }

  private tick = (ts: number = 0) => {
    if (this.tsPrev === null) {
      this.tsPrev = ts;
    }

    let i = 0;
    let dt = (ts - this.tsPrev) / 1000;
    while (i < this.frameTasks.length) {
      this.frameTasks[i].fn(ts, dt);
      i++;
    }
    
    this.tsPrev = ts;
    this.frameReqId = window.requestAnimationFrame(this.tick);
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

  start() {
    this.tsPrev = null;
    this.frameReqId = window.requestAnimationFrame(this.tick);
  }

  stop() {
    window.cancelAnimationFrame(<number>this.frameReqId);
    this.frameReqId = null;
  }
}
