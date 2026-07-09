import type { TaskModel } from "../../models/TaskModel"

export enum TaskActionTypes {
    START_TASK = 'START_TASK',
    INTERRUPT_TASK = 'INTERRUPT_TASK',
    RESET_STATE = 'RESET_STATE'
}


export type TaskActionsWitchPayload = | {
    type: TaskActionTypes.START_TASK;
    payload: TaskModel
}



export type TaskActionsWitoutchPayload = {
    type: TaskActionTypes.RESET_STATE;
}
| {
    type: TaskActionTypes.INTERRUPT_TASK;
};


export type TaskActionModel = 
TaskActionsWitchPayload | 
TaskActionsWitoutchPayload;
