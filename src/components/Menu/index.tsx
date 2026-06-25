import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

type availableTheme = 'dark' | 'light';

export function Menu() {
  const [ theme, setTheme ] = useState<availableTheme>('dark');


  function handlerThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
    event.preventDefault()
    setTheme(state => {
      const nextState = state == 'dark'? 'light' : 'dark';
      return nextState
    })
  }
  useEffect(()=>{
    console.log("O theme mudou", theme, Date.now());
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])


  return (
    <div className={styles.menu}>
      <a 
        className={styles.menuLink} 
        area-label="Ir para a Home" 
        title="Ir para a Home" 
        href="##">
        <HouseIcon />
      </a>
      <a 
        className={styles.menuLink}
        area-label="ver Histórico"
        title="Ver Histórico" 
        href="##">
        <HistoryIcon />
      </a>
      <a 
        className={styles.menuLink}
        area-label="Configurações" 
        title="Configurações"
        href="##">
        <SettingsIcon />
      </a>
      <a 
        className={styles.menuLink}
        href="##"
        area-label="Mudar Tema" 
        title="Mudar Tema"
        onClick={handlerThemeChange}
        >
        <SunIcon />
      </a>
    </div>
  );
}
