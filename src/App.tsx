import { Home } from "./pages/Home";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import "./styles/Theme.css";
import "./styles/Global.css";
import { MessageContainer } from "./components/MessageContainer";

export function App() {
  return (
    <TaskContextProvider>
      <MessageContainer>
        <Home />
      </MessageContainer>
    </TaskContextProvider>
  );
}
