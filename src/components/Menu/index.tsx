import { HistoryIcon, HouseIcon,MoonIcon,SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";

type availableTheme = 'dark' | 'light';

export function Menu() {
  const [ theme, setTheme ] = useState<availableTheme>(()=>{
    const storageTheme = localStorage.getItem('theme') as availableTheme || 'dark'
    return storageTheme
  });

  const nexThemeIcon = {
    dark: <SunIcon/>,
    light: <MoonIcon/>
  }

  function handlerThemeChange(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>){
    event.preventDefault()
    setTheme(state => {
      const nextState = state === 'dark'? 'light' : 'dark';
      return nextState
    })
  }
  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
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
        {nexThemeIcon[theme]}
      </a>
    </div>
  );
}