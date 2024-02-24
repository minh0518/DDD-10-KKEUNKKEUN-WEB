import { createContext, useContext } from 'react';
import { type ToggleType } from './useToggle';

export const ToggleContext = createContext<ToggleType | null>(null);

const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw "There's no context!";
  }

  return context;
};

export default useToggleContext;
