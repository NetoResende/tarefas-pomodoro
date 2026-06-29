import { useContext } from "react";
import { TaskContext } from "./TaskContext";

// criando o hook para  contexto
export function useTaskContext(){
    return useContext(TaskContext)
  }