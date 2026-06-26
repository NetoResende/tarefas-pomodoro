import { PlayCircleIcon } from "lucide-react";
import { Cycles } from "../Cycles";
import { DefaultButton } from "../DefaultButton";
import { DefaultInput } from "../DefaultInput";
import type { HomeProps } from "../../pages/Home";

export function MainForm({state, setState}: HomeProps){

  function handlerClick(){
    setState(prevState => {
      return {
        ...prevState,
        formattedSecondsTemaining: "34:03",
        config: {
          ...prevState.config,
          workTime: 18,
        }
      }
    })
  }
  
    return (
        <form className="form">
          <div>
            <button type="button" onClick={handlerClick}>Clicar do button</button>
          </div>
          <div className="formRow">
            <DefaultInput 
              id='meuInput' 
              type='text'
              labelText='Task'
              placeholder="Digite alguma coisa"
              />
          </div>
          <div className="formRow">
            <p>O próximo intervalo vai ser de {state.config.workTime}min</p>
          </div>
          <div className="formRow">
            <Cycles/>
          </div>
          <div className="formRow">
            <DefaultButton icon={<PlayCircleIcon/>}/>
          </div>
        </form>
    )
}