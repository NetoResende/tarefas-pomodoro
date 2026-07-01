import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycles } from "../../utils/getNextCycles";

export function MainForm() {
  const { state,setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null) // estado não controlado!

  const nextCycle = getNextCycles(state.currentCycle)

  // função para envia o formulário para dentro do estado!
  function handlerStateNewTask(event: React.SubmitEvent<HTMLFormElement>){
    event.preventDefault()
    if(taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if(!taskName) 
      alert("Digite algo")

    const newTask: TaskModel = {
      id: Date.now().toString(),
      nome: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: 1,
      type: 'workTime',
    }
    const secondsRemaining = newTask.duration * 60;

    setState(prevState => {
      return {
        ...prevState,
        config: {...prevState.config},
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formattedSecondsTemaining: "00:00",
        tasks: [...prevState.tasks, newTask]
      }
    })
  }

  return (
    <form onSubmit={handlerStateNewTask} className="form">
      
      <div className="formRow">
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="Task"
          placeholder="Digite alguma coisa"
          ref={taskNameInput}
        />
      </div>
      <div className="formRow">
        <p>O próximo intervalo vai ser de 25min</p>
      </div>
      <div className="formRow">
        <Cycles />
      </div>
      <div className="formRow">
        <DefaultButton icon={<PlayCircleIcon />} />
      </div>
    </form>
  );
}