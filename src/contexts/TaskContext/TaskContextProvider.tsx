import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskactions";
import { LoadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/TaskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state');
    if (storageState === null) return initialTaskState;
    const parsedStorageState = JSON.parse(storageState) as TaskStateModel;
    return {
      ...parsedStorageState,
      activeTask: null,
      secondsRemaining: 0,
      formatedSecondsRemaining: "00:00"
    };
  });

  const playBeepRef = useRef<ReturnType<typeof LoadBeep> | null>(null);
  const workerRef = useRef(TimerWorkerManager.getInstance());
  const wasActiveRef = useRef(Boolean(state.activeTask));

  useEffect(() => {
    const worker = workerRef.current;
    worker.onmessage((e) => {
      const countDownSeconds = e.data;
      if (countDownSeconds <= 0) {
        if (playBeepRef.current) {
          playBeepRef.current();
          playBeepRef.current = null;
        }
        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds }
        });
      }
    });
  }, []);

  useEffect(() => {
    const worker = workerRef.current;
    localStorage.setItem('state', JSON.stringify(state));
    document.title = `${state.formatedSecondsRemaining} - chornos pomodoro`;

    const isActiveNow = Boolean(state.activeTask);

    // só termina o worker quando a tarefa REALMENTE deixou de estar ativa
    if (wasActiveRef.current && !isActiveNow) {
      worker.terminate();
    }
    wasActiveRef.current = isActiveNow;

    if (isActiveNow) {
      worker.postMessage(state);
    }
  }, [state]);

  useEffect(() => {
    if (state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = LoadBeep();
    } else {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}