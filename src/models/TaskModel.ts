import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
    id: string;
    nome: string;
    duration: number;
    startDate: number;
    completeDate: number | null;
    interruptDate: number | null;
    type : keyof TaskStateModel['config'] ;
};