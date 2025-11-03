import React, { createContext, useContext } from "react";
import { useProgress } from "../hooks/useProgress";

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const progress = useProgress();
  return (
    <ProgressContext.Provider value={progress}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgressContext() {
  return useContext(ProgressContext);
}