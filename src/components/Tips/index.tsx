import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"
import { getNextCycles } from "../../utils/getNextCycles";
import { getNextCycleType } from "../../utils/getNextCycleType";

export function Tips(){
    const {state} = useTaskContext()

    const nextCycle = getNextCycles(state.currentCycle);
    const NextCycleType = getNextCycleType(nextCycle);
      
    const tipsForWenActive = {
        workTime: <span style={{color: 'red'}}>Foco de <b style={{color: 'white'}}>{state.config.workTime}</b>min</span>,
        shortBreakTime: <span style={{color: 'red'}}>Descanso de <b style={{color: 'white'}}>{state.config.shortBreakTime}</b>min</span>,
        longBreakTime: <span style={{color: 'red'}}>Descanso Longo</span>
      }
      const tipsForNoActive = {
        workTime: <span style={{color: 'lime'}}>Próxino descanso é de <b style={{color: 'white'}}>{state.config.workTime}</b>min</span>,
        shortBreakTime: <span style={{color: 'lime'}}>Próxino descanso é de <b style={{color: 'white'}}>{state.config.shortBreakTime}</b>min</span>,
        longBreakTime: <span style={{color: 'lime'}}>Próximo descanso é Longo</span>
      }
      
    return (
        <>
            {!!state.activeTask && tipsForWenActive[state.activeTask.type] }
            {!state.activeTask && tipsForNoActive[NextCycleType]}
        </>
    )
}