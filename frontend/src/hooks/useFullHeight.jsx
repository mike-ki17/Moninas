import { useEffect } from 'react';

const useFullHeight = () => {
  useEffect(() => {
    const setFullHeight = () => {
      const windowHeight = window.innerHeight;
      document.documentElement.style.setProperty('--vh', `${windowHeight}px`);
    };

    window.addEventListener('resize', setFullHeight);
    setFullHeight(); // Establecer la altura inicial

    // Limpieza del evento
    return () => {
      window.removeEventListener('resize', setFullHeight);
    };
  }, []);
};

export default useFullHeight;
