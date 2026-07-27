import { HistoryIcon, HouseIcon,MoonIcon,SettingsIcon, SunIcon } from "lucide-react";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router";

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
      <Link 
        className={styles.menuLink} 
        area-label="Ir para a Home" 
        title="Ir para a Home" 
        to="/">
        <HouseIcon />
      </Link>
      <Link 
        className={styles.menuLink}
        area-label="ver Histórico"
        title="Ver Histórico" 
        to="##">
        <HistoryIcon />
      </Link>
      <Link 
        className={styles.menuLink}
        area-label="Configurações" 
        title="Configurações"
        to="##">
        <SettingsIcon />
      </Link>
      <Link 
        className={styles.menuLink}
        to="##"
        area-label="Mudar Tema" 
        title="Mudar Tema"
        onClick={handlerThemeChange}
        >
        {nexThemeIcon[theme]}
      </Link>
    </div>
  );
}