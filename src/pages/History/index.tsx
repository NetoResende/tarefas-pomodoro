import { MainTemplate } from "../../templates/MainTemplate";
import { Container } from "../../components/Container";
import { Heading } from "../../components/Heading";
import { DefaultButton } from "../../components/DefaultButton";
import { TrashIcon } from "lucide-react";
import { useTaskContext } from "../../contexts/TaskContext/useTaskContext";
import { formatDate } from "../../utils/formatDate";
import { getTaskStatus } from "../../utils/getTaskStatus";
import { sortTasks, type SortTasksOptions } from "../../utils/sortTasks";
import { useEffect, useMemo, useState } from "react";
import { showMessage } from "../../adapters/showMessage";
import { TaskActionTypes } from "../../contexts/TaskContext/taskactions";
import styls from "./styles.module.css";

export function History() {
  const { state, dispatch } = useTaskContext();
  const hasTAsks = state.tasks.length > 0;
  const [sortTaskOptions, setSortTaskOptions] = useState<SortTasksOptions>(
    () => {
      return {
        tasks: sortTasks({ tasks: state.tasks }),
        field: "startDate",
        direction: "desc",
      };
    }
  );
  useMemo(
    () => sortTasks({
      tasks: state.tasks,
      direction: sortTaskOptions.direction,
      field: sortTaskOptions.field,
    }),
    [state.tasks, sortTaskOptions.direction, sortTaskOptions.field]
  );
   useEffect(()=>{
      document.title="Histórico - Chronos Pomodoro";
    },[])

  function handleSortTasks({ field }: Pick<SortTasksOptions, "field">) {
    const newDirection = sortTaskOptions.direction === "desc" ? "asc" : "desc";

    setSortTaskOptions({
      tasks: sortTasks({
        direction: newDirection,
        tasks: sortTaskOptions.tasks,
        field,
      }),
      direction: newDirection,
      field,
    });
  }

  function handleResetHistory() {
    showMessage.dismiss()
    showMessage.confirm('Tem certeza que deseja apagar o Histórico?', (confirmation) => {
      if(!confirmation) return ;
      dispatch({type: TaskActionTypes.RESET_STATE})
    })
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Historico</span>
          {hasTAsks && (
            <span className={styls.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color="red"
                aria-label="Apagar todo o Histórico"
                title="Apagar Histórico"
                onClick={handleResetHistory}
              />
            </span>
          )}
        </Heading>
      </Container>

      <Container>
        {hasTAsks && (
          <div className={styls.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th
                    className={styls.thSort}
                    onClick={() => handleSortTasks({ field: "nome" })}
                  >
                    Tareda
                  </th>
                  <th
                    className={styls.thSort}
                    onClick={() => handleSortTasks({ field: "duration" })}
                  >
                    Duração
                  </th>
                  <th
                    className={styls.thSort}
                    onClick={() => handleSortTasks({ field: "startDate" })}
                  >
                    Data
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortTaskOptions.tasks.map((task) => {
                  const taskTypeDictionary = {
                    workTime: "Foco",
                    shortBreakTime: "Descanso curto",
                    longBreakTime: "Descanso longo",
                  };

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
        )}
        {!hasTAsks && (
          <p style={{ textAlign: "center", fontWeight: "bolder" }}>
            Não histórico de tarefas
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
