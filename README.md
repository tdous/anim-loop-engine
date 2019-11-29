# anim-loop-engine
Painfully basic lib just to shortcut setting up requestAnimationFrame loops in experiments.

## Installing
```
npm install --save tdous/anim-loop-engine
```

## Usage
```
import { AnimLoopEngine } from 'anim-loop-engine';

const engine = new AnimLoopEngine();

const someTaskToRunEachFrame = () => { ... };
const someTaskToRunSecond = (ts) => {
  // Maybe so domething with the timestamp passed to each frame task
  ...
};
const yetAnotherFrameTask = () => { ... };

// Add single tasks... (optionally keep the returned task ID for later)
engine.addTask(someTaskToRunEachFrame);

// ...or multiple - they are called in added order - tasks IDs returned as array
const someTaskIds = engine.addTasks([someTaskToRunEachFrame, someTaskToRunSecond]);

// Start the loop
engine.start()

// Add another task while running
const anotherTaskId = engine.addTask(yetAnotherFrameTask);

// Delete a task - deleting 'someTaskToRunSecond' via the returned tasks ID
engine.deleteTask(someTaskIds[1]);
// ...so the engine is now calling 'someTaskToRunEachFrame' then 'yetAnotherFrameTask'

// Stop whenever you want
engine.stop();
