import { PlayCircleIcon, StopCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { getNextCycles } from "../../utils/getNextCycles";
import { getNextCycleType } from "../../utils/getNextCycleType";
import { formatSecondsToMinutes } from "../../utils/formatSecondsToMinutes";
import { useRef } from "react";
import type { TaskModel } from "../../models/TaskModel";

export function MainForm() {
  const { state, setState } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null); // estado não controlado!

  const nextCycle = getNextCycles(state.currentCycle);
  const NextCycleType = getNextCycleType(nextCycle);

  // função para envia o formulário para dentro do estado!
  function handlerStateNewTask(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (taskNameInput.current === null) return;

    const taskName = taskNameInput.current.value.trim();
    if (!taskName) alert("Digite uma nova tarefa");

    const newTask: TaskModel = {
      id: Date.now().toString(),
      nome: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[NextCycleType],
      type: NextCycleType,
    };
    const secondsRemaining = newTask.duration * 60;

    setState((prevState) => {
      return {
        ...prevState,
        config: { ...prevState.config },
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formattedSecondsTemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: [...prevState.tasks, newTask],
      };
    });
  }

  function handlerInterruptTask(){
    setState((prevState) => {
      return {
        ...prevState,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsTemaining: '00:00',
        tasks: prevState.tasks.map(task => {
          if (prevState.activeTask && prevState.activeTask.id === task.id){
            return {...task, interruptDate: Date.now()}
          }
          return task
        })
      };
    });
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
          disabled={!!state.activeTask}
        />
      </div>

      <div className="formRow">
        <p>O próximo intervalo vai ser de 25min</p>
      </div>
      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}
      <div className="formRow">
        {!state.activeTask ? (
          <DefaultButton
            aria-label="Iniciar nova tarefa" 
            title="Iniciar nova tarefa"
            type="submit"
            icon={<PlayCircleIcon />} 
            key="botao_submit"
          />
        ) : (
          <DefaultButton 
            area-label="Interromper tarefa"
            title="Interromper tarefa"
            type="button"
            icon={<StopCircleIcon />} 
            color="red"
            key="botao_button"
            onClick={handlerInterruptTask}
          />
        )}
      </div>
    </form>
  );
}
