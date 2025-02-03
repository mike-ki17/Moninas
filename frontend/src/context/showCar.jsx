import { createContext, useContext, useState } from "react";

export const CarContext = createContext();

export function CarProvider({ children }) {
  const [showCar, setShowCar] = useState(false);
  const handleCar = () => {
    setShowCar((prevShowCar) => !prevShowCar); 
  };

  return (
    <CarContext.Provider value={{ showCar, handleCar }}>
      {children}
    </CarContext.Provider>
  );
}

export const useCarContext = () => useContext(CarContext);