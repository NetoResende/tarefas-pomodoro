import { useTaskContext } from '../../contexts/TaskContext/useTaskContext'
import { getNextCycles } from '../../utils/getNextCycles'
import { getNextCycleType } from '../../utils/getNextCycleType'
import styles from './styles.module.css'

export function Cycles(){
    const { state } = useTaskContext()
    const cycleStep = Array.from({length: state.currentCycle})
    
    const cycleDescriptionMap = {
        workTime: 'Trabalho',
        shortBreakTime: 'Descando Curto',
        longBreakTime: 'Descanso Longo'
    }
    
    return (
        <div className={styles.cycle}>
            <span>Ciclos:</span>

            <div className={styles.cycleDots}>
                {cycleStep.map((_, index) => {
                    const nextCycle = getNextCycles(index)
                    const nextCycleType = getNextCycleType(nextCycle);      
                    return (
                        <span 
                            key={`${nextCycleType}_${nextCycle}`} 
                            className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                            aria-label={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                            title={`Indicador de ciclo de ${cycleDescriptionMap[nextCycleType]}`}
                        ></span>
                    );
                })}
            </div>
        </div>
    )
}