let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager {
    private worker: Worker;

    
    // Um constri=utor para criar os workers
    private constructor(){
        this.worker = new Worker(new URL("./timerWorker.js", import.meta.url));
    }

    // função para gerenciar as instancias
    static getInstance(){
        if (!instance) instance = new TimerWorkerManager();
        return instance;
    }


    // methodes:
    postMessage (message: any){
        this.worker.postMessage(message)
    }

    onmessage(cb: (e: MessageEvent) => void) {
        this.worker.onmessage = cb; 
    }

    terimante(){
        this.worker.terminate();
        instance = null;
    }
}       