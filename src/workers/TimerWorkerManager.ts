import type { TaskStateModel } from "../models/TaskStateModel";

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
    private worker: Worker;
    private currentCallback: ((e: MessageEvent) => void) | null = null;

    private constructor(){
        this.worker = this.createWorker();
    }

    private createWorker(): Worker {
        const worker = new Worker(new URL("./timerWorker.js", import.meta.url));
        if (this.currentCallback) {
            worker.onmessage = this.currentCallback;
        }
        return worker;
    }

    static getInstance(){
        if (!instance) {
            instance = new TimerWorkerManager();
        }
        return instance;
    }

    postMessage(message: TaskStateModel){
        this.worker.postMessage(message);
    }

    onmessage(cb: (e: MessageEvent)=>void) {
        this.currentCallback = cb;
        this.worker.onmessage = cb;
    }

    terminate(){
        this.worker.terminate();
        this.worker = this.createWorker(); // recria já com o listener re-anexado
    }
}
