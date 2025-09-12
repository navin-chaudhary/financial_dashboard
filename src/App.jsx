import React from 'react';
import { DashboardDataProvider } from './context/DashboardDataContext';
import BrokerageDashboard from './components/BrokerageDashboard';
import './index.css';

function App() {
  return (
    <DashboardDataProvider>
      <BrokerageDashboard />
    </DashboardDataProvider>
  );
}

export default App;