import type { TaskModel } from "../models/TaskModel"

// Define os parâmetros esperados pela função
export type SortTasksOptions = {
    tasks: TaskModel[]; // lista de tarefas que será ordenada
    direction?: 'asc' | 'desc'; // Direção da ordenação 'descente | decrescente
    field?: keyof TaskModel;  // Qual campo da tarefa será usando para ordenar (opcional)
}

export function sortTasks({field='startDate',direction='desc', tasks=[]}: SortTasksOptions): TaskModel[]{
    return [...tasks].sort((a, b) => {
        // Pegamsos o valor da propriedade escolhida ( ex: startDate ) em cada tarefa
        const aValue = a[field];
        const bValue = b[field];

        if(aValue === null && bValue === null) return 0;

        if(aValue === null) return 1;
        if(bValue === null) return -1;

        // comparação numérica
        // Se os dois valores forem números, fazemos uma substituição para ordenar
        if(typeof aValue === 'number' && typeof bValue === 'number'){
            return direction === 'asc' 
            ? aValue - bValue  // 1,2,3...
            : bValue - aValue;  // 3,2,1...
        }

        // comparção por strings
        // Se os dois valores forem textos, fusamos localeCompare para comparar emordem alfabética
        if(typeof aValue === 'string' && typeof bValue === 'string'){
            return direction === 'asc' 
            ? aValue.localeCompare(bValue) // a -> z
            : bValue.localeCompare(aValue); // z -> a
        }

        // se não for nem número, nem string,nem null, não alteramos a ordem
       return 0;
    })
}