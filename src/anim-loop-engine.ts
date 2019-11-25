export class AnimLoopEngine {
  private frameReqId: number = 0;
  private animate: boolean = false;
  private frameTasks: any[] = [];

  private loop = (ts: number = 0) => {
    const numTasks = this.frameTasks.length;
    for (let i = 0; i < numTasks; i++) {
      this.frameTasks[i].fn();
    }

    this.frameReqId = requestAnimationFrame(this.loop);
  };

  addTasks(tasks: any[]) {
    if (tasks.length > 0) {
      this.frameTasks = [...this.frameTasks, ...tasks];
    }
  }

  deleteTask(taskId: number | string) {
    this.frameTasks = this.frameTasks.filter(t => t.id !== taskId);
  }

  start() {
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
