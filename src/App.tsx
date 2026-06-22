import { Heading } from "./component/Heading";
import "./styles/Theme.css";
import "./styles/Global.css";
import { TimerIcon } from "lucide-react";


export function App() {
  return (
    <>
      <Heading>
        Tarefas!
        <TimerIcon/>
      </Heading>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
        laboriosam nam assumenda, ipsam odio fugiat aperiam eum ut voluptas at
        quasi repellat ipsum culpa animi odit quod incidunt molestiae ea.
      </p>
    </>
  );
};