import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { DefaultInput } from "../../components/DefaultInput";
import { DefaultButton } from "../../components/DefaultButton";
import { SaveIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskactions";


const formErrors = [];

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null)
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null)
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null)


  function handleSaveSettings(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault()
    showMessage.dismiss();
    const workTime = Number(workTimeInputRef.current?.value)
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value); 
    const longBreakTime = Number(longBreakTimeInputRef.current?.value); 

    if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)){
      formErrors.push("Digite apenas números!");
    }

    if(workTime < 1 || workTime > 99){
      formErrors.push("Digite valores entre 1 e 99 para FOCO");
    } 
    if(shortBreakTime < 1 || shortBreakTime > 30){
      formErrors.push("Digite valores entre 1 e 30 para DESCANSO CURTO");
    }
    if(longBreakTime < 1 || longBreakTime > 60){
      formErrors.push("Digite valores entre 1 e 60 para DESCANSO LONGO");
    }

    if(formErrors.length > 0){
      formErrors.forEach(error => {
        showMessage.error(error)
      });
      return;
    }
    dispatch({type: TaskActionTypes.CHANGE_SETTINGS, payload: {
      workTime,
      shortBreakTime,
      longBreakTime
    }});

    showMessage.success("Configurações salvas");
  };

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{textAlign: 'center'}}>
          modifique as configurações para tempo de foco, descanso curto e
          descanso longo.
        </p>
      </Container>
      <Container>
        <form className="form" onSubmit={ handleSaveSettings}>
          <div className="formRow">
            <DefaultInput id="workTime" labelText="foco" 
              ref={workTimeInputRef}
              defaultValue={state.config.workTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput id="shortBreakTime" labelText="Descanso curto" 
              ref={shortBreakTimeInputRef}
              defaultValue={state.config.shortBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultInput id="longBreakTime" labelText="Descanso longo" 
              ref={longBreakTimeInputRef}
              defaultValue={state.config.longBreakTime}
              type="number"
            />
          </div>
          <div className="formRow">
            <DefaultButton 
              aria-label="Salvar configurações"
              title="Salvar configurações"
              icon={<SaveIcon/>}
              />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
