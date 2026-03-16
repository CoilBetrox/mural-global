import { useState, useEffect } from 'react';

/**
 * Hook para manejar el tema oscuro/claro.
 * @returns {Object} Estado y funciones para dark mode
 */
function useDarkMode() {
  // Verificar preferencia del sistema o localStorage
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  const [isDark, setIsDark] = useState(getInitialTheme);
  
  // Efecto para aplicar el tema al HTML
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  
  /**
   * Alterna entre tema oscuro y claro.
   */
  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };
  
  /**
   * Establece un tema específico.
   * @param {boolean} dark - True para dark mode, false para light
   */
  const setDarkMode = (dark) => {
    setIsDark(dark);
  };
  
  return {
    isDark,
    toggleDarkMode,
    setDarkMode
  };
}

export default useDarkMode;