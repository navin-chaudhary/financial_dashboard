import React from 'react';
import { DataProvider } from './context/DataContext';
import Header from './components/Header';
import IncomeStatement from './components/IncomeStatement';
import FinancialRatios from './components/FinancialRatios';
import DataManagementButtons from './components/DataManagementButtons';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <Header />

          {/* Main Content */}
          <main className="px-6">
            {/* Data Management Controls */}
            <DataManagementButtons />

            {/* Income Statement Section */}
            <IncomeStatement />

            {/* Financial Ratios and Charts Section */}
            <FinancialRatios />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;