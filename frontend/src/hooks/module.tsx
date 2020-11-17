import React, { createContext, useCallback, useState, useContext } from 'react';

interface ModuleContextData {
  selectedModuleId: string;
  setSelectedModuleId: (id: string) => void;
}

const ModuleContext = createContext<ModuleContextData>({} as ModuleContextData);

const ModuleProvider: React.FC = ({ children }) => {
  const [moduleId, setModuleId] = useState('');

  const setSelectedModuleId = useCallback((id: string) => {
    setModuleId(id);
  }, []);

  return (
    <ModuleContext.Provider
      value={{
        selectedModuleId: moduleId,
        setSelectedModuleId,
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
