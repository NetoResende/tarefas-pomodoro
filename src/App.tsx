import { Home } from "./pages/Home";
import { TaskContextProvider } from "./contexts/TaskContext";
import "./styles/Theme.css";
import "./styles/Global.css";

export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
