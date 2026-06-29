import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function MainForm() {
  const { state, setState }= useTaskContext()

  // função para envia o formulário para dentro do estado!
  function handlerStateNewTask(event: React.SubmitEvent<HTMLFormElement>){
    event.preventDefault()
    console.log("DEU CERTO");
  }

  return (
    <form onSubmit={handlerStateNewTask} className="form">
      
      <div className="formRow">
        <DefaultInput
          id="meuInput"
          type="text"
          labelText="Task"
          placeholder="Digite alguma coisa"
        />
      </div>
      <div className="formRow">
        <p>O próximo intervalo vai ser de {state.config.workTime}min</p>
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
