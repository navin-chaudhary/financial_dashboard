import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

const defaultData = {
  // Header metrics
  grossRevenue: 46000000,
  avgCommission: 8500,
  netProfit: 12500000,
  netProfitMargin: 27.17,
  
  // Income Statement - Current Quarter
  currentQuarter: {
    revenue: 46000000,
    cogs: 21000000,
    operatingExpenses: 12500000,
    netIncome: 12500000
  },
  
  // Previous Quarter
  previousQuarter: {
    revenue: 42000000,
    cogs: 19500000,
    operatingExpenses: 11800000,
    netIncome: 10700000
  },
  
  // Top Offices Performance
  topOffices: [
    { name: 'Northside Office', revenue: 8000000, margin: 28 },
    { name: 'Downtown Office', revenue: 7500000, margin: 26 },
    { name: 'Westside Office', revenue: 6200000, margin: 24 },
    { name: 'Southside Office', revenue: 5800000, margin: 23 }
  ],
  
  // Market Analysis
  marketAnalysis: {
    averagePrice: 850000,
    totalListings: 1247,
    pricePerSqFt: 420,
    medianDaysOnMarket: 35,
    inventoryMonths: 3.2,
    soldProperties: 892,
    totalVolume: 758000000,
    avgDaysOnMarket: 42
  },
  
  // Property Listing Status Distribution
  propertyDistribution: {
    active: 45,
    pending: 25,
    sold: 20,
    expired: 10
  },
  
  // Key Performance Indicators
  kpi: {
    agentRetention: 94,
    clientSatisfaction: 4.8,
    marketShare: 18,
    referralRate: 35
  },
  
  // Awards
  awards: {
    count: 18,
    description: "Industry Awards Won This Year"
  }
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('financial-dashboard-data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever data changes
  const saveData = () => {
    localStorage.setItem('financial-dashboard-data', JSON.stringify(data));
  };

  // Update a specific field in the data
  const updateField = (path, value) => {
    setData(prevData => {
      const newData = { ...prevData };
      const keys = path.split('.');
      let current = newData;
      
      // Navigate to the parent of the field to be updated
      for (let i = 0; i < keys.length - 1; i++) {
        if (current[keys[i]] === undefined) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      
      // Update the final field
      current[keys[keys.length - 1]] = value;
      
      return newData;
    });
  };

  // Export data as JSON
  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  };

  // Import data from JSON file
  const importData = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          setData(importedData);
          resolve();
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  // Reset to default data
  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('financial-dashboard-data');
  };

  const value = {
    data,
    updateField,
    saveData,
    exportData,
    importData,
    resetData
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
