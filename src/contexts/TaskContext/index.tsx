import { createContext, useContext, useState } from "react";
import type { TaskStateModel } from "../../models/TaskStateModel";


const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsTemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};

type TaskContextProps = {
  state: TaskStateModel,
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>
}
// variável do contexto com os tipos
const initialContextValue = {
  state: initialState,
  setState: ()=>{}
}

// Contexto
export const TaskContext = createContext<TaskContextProps>(initialContextValue);


type TaskContextProviderProps = {
  children: React.ReactNode
}
//  criando um componente provider, para prover o contexto
export function TaskContextProvider({children}: TaskContextProviderProps){
  const [state, setState] = useState(initialState);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  )
}

// criando o hook para  contexto
export function useTaskContext(){
  return useContext(TaskContext)
}