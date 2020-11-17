import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ModuleProvider } from './module';

const AppProvider: React.FC = ({ children }) => (
  <AuthProvider>
    <ToastProvider>
      <ModuleProvider>{children}</ModuleProvider>
    </ToastProvider>
  </AuthProvider>
);

export default AppProvider;
