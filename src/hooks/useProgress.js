import { useState, useEffect } from 'react';

const STORAGE_KEY = 'treasure-hunt-progress';

export function useProgress() {
  const [currentStage, setCurrentStage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved) : 1;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentStage.toString());
  }, [currentStage]);

  const completeStage = (stageNumber) => {
    if (stageNumber === currentStage) {
      setCurrentStage(prev => prev + 1);
    }
  };

  const isStageAvailable = (stageNumber) => {
    return stageNumber <= currentStage;
  };

  return {
    currentStage,
    completeStage,
    isStageAvailable,
  };
}