import React from 'react';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import './styles/global.css';

const App = () => (
  <ErrorBoundary>
    <AppProvider>
      <Dashboard />
    </AppProvider>
  </ErrorBoundary>
);

export default App;
