import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function MainForm() {
  const { state, setState }= useTaskContext()

  //  ex:1 função para modificar o lcoutDown e o formulário
  function handlerClicar(){
    setState(prevState => {
      return {
        ...prevState, 
        formattedSecondsTemaining: "21:00",
        config: {
          ...prevState.config,
          workTime: 15,
        }
      }
    })
  }

  return (
    <form className="form">
      <div>
        <button onClick={handlerClicar} type="button">Clicar</button>
      </div>
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
