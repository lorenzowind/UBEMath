import React, { createContext, useCallback, useState, useContext } from 'react';

import { Module } from '../pages/Modules';

interface ModuleContextData {
  selectedModule: Module;
  setSelectedModule: (module: Module) => void;
}

const ModuleContext = createContext<ModuleContextData>({} as ModuleContextData);

const ModuleProvider: React.FC = ({ children }) => {
  const [module, setModule] = useState({} as Module);

  const setSelectedModule = useCallback((moduleData: Module) => {
    setModule(moduleData);
  }, []);

  return (
    <ModuleContext.Provider
      value={{
        selectedModule: module,
        setSelectedModule,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

function useModule(): ModuleContextData {
  const context = useContext(ModuleContext);

  if (!context) {
    throw new Error('useModule must be used within an ModuleProvider');
  }

  return context;
}

export { ModuleProvider, useModule };
