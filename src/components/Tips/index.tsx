import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"
import { getNextCycles } from "../../utils/getNextCycles";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips(){
    const {state} = useTaskContext()

    const nextCycle = getNextCycles(state.currentCycle);
    const NextCycleType = getNextCycleType(nextCycle);
      
    const tipsForWenActive = {
        workTime: <span >Foco de <b>{state.config.workTime}</b>min</span>,
        shortBreakTime: <span>Descanso de <b>{state.config.shortBreakTime}</b>min</span>,
        longBreakTime: <span style={{color: 'red'}}>Descanso Longo</span>
      }
      const tipsForNoActive = {
        workTime: <span>Próxino descanso é de <b>{state.config.workTime}</b>min</span>,
        shortBreakTime: <span>Próxino descanso é de <b>{state.config.shortBreakTime}</b>min</span>,
        longBreakTime: <span style={{color: 'orange'}}>Próximo descanso é Longo</span>
      }

    return (
        <>
            {!!state.activeTask && tipsForWenActive[state.activeTask.type] }
            {!state.activeTask && tipsForNoActive[NextCycleType]}
        </>
    )
}