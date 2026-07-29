import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { DefaultButton } from "../../components/DefaultButton";
import { TrashIcon } from "lucide-react";

import styls from "./styles.module.css";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";

export function History() {
  const { state } = useTaskContext()
  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Historico</span>
          <span className={styls.buttonContainer}>
            <DefaultButton
              icon={<TrashIcon />}
              color="red"
              aria-label="Apagar todo o Histórico"
              title="Apagar Histórico"
            />
          </span>
        </Heading>
      </Container>

      <Container>
        <div className={styls.responsiveTable}>
          <table>
            <thead>
              <tr>
                <th>Tareda</th>
                <th>Duração</th>
                <th>Data</th>
                <th>Status</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              {state.tasks.map((task) => {
                const taskTypeDictionary = {
                  workTime: 'Foco',
                  shortBreakTime: "Descanso curto",
                  longBreakTime: "Descanso longo",
                }
        
                return (
                  <tr key={task.id}>
                    <td>{task.nome}</td>
                    <td>{task.duration}</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{taskTypeDictionary[task.type]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Container>
    </MainTemplate>
  );
}
