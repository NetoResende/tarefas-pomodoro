import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { DefaultInput } from "../../components/DefaultInput";
import { DefaultButton } from "../../components/DefaultButton";
import { SaveIcon } from "lucide-react";
import { useRef } from "react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";

export function Settings() {
  const { state } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null)
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null)
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null)


  function handleSaveSettings(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault()
    const workTime = workTimeInputRef.current?.value;
    const shortBreakTime = shortBreakTimeInputRef.current?.value; 
    const longBreakTime = longBreakTimeInputRef.current?.value; 
    
    console.log(workTime, shortBreakTime, longBreakTime)
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
              />
          </div>
          <div className="formRow">
            <DefaultInput id="shortBreakTime" labelText="Descanso curto" 
              ref={shortBreakTimeInputRef}
              defaultValue={state.config.shortBreakTime}
              />
          </div>
          <div className="formRow">
            <DefaultInput id="longBreakTime" labelText="Descanso longo" 
              ref={longBreakTimeInputRef}
              defaultValue={state.config.longBreakTime}/>
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
