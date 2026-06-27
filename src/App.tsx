import { Home } from "./pages/Home";
import type { TaskStateModel } from "./models/TaskStateModel";
import { useState } from "react";
import "./styles/Theme.css";
import "./styles/Global.css";
import { TaskContext } from "./contexts/TaskContext";

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formattedSecondsTemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
  },
};
export function App() {
  const [state, setState] = useState(initialState);

  return (
    <TaskContext.Provider value={{ novo: "Novo Contexto" }}>
      <Home />
    </TaskContext.Provider>
  );
}
