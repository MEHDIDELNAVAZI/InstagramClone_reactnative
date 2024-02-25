// ProgressContext.js

import React, { createContext, useContext, useState } from "react";
const ProgressContext = createContext();
export const useProgress = () => useContext(ProgressContext);
export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(0);
  const [progressisactive, setProgressisactive] = useState(false);
  const updateProgress = (value) => {
    setProgress(value);
  };
  const updateProgressisactive = (value) => {
    setProgressisactive(value);
  };
  return (
    <ProgressContext.Provider
      value={{
        progress,
        updateProgress,
        progressisactive,
        updateProgressisactive
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};
