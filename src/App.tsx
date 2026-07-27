import { Home } from "./pages/Home";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";
import "./styles/Theme.css";
import "./styles/Global.css";
import { MessageContainer } from "./components/MessageContainer";
import { BrowserRouter, Route, Routes } from "react-router";
import { NotFound } from "./pages/NotFound";
import { AboutPomodoro } from "./pages/AboutPomodoro";


export function App() {
  return (
    <TaskContextProvider>
      <MessageContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/about-pomodoro/" element={<AboutPomodoro/>}/>


            <Route path="*" element={<NotFound/>}/>  
          </Routes>
        </BrowserRouter>
      </MessageContainer>
    </TaskContextProvider>
  );
}
