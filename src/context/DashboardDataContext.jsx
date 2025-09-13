import React, { createContext, useContext, useState, useEffect } from 'react';

const DashboardDataContext = createContext();

export const useDashboardData = () => {
    const context = useContext(DashboardDataContext);
    if (!context) {
        throw new Error('useDashboardData must be used within a DashboardDataProvider');
    }
    return context;
};

// Default data structure for all pages
const defaultData = {
    page1: {
        closedDeal: {
            value: "69M",
            allocation: "100% allocated to Primary Agent"
        },
        metrics: {
            sellSide: 67,
            dualSide: 38,
            buySide: 37,
            closedDeals: 142
        },
        pending: {
            value: "103M",
            sellSide: 78,
            dual: 28,
            buySide: 19
        },
        active: {
            value: "46M",
            total: 71
        },
        priceRange: {
            range: "$1.7M - $100K",
            avgSoldPrice: "$517K"
        },
        totalClosedDeals: 142,
        chartData: {
            volumeByDealType: [
                { name: "Buy Side", value: 37, percentage: 26 },
                { name: "Sell Side", value: 67, percentage: 47 },
                { name: "Dual Side", value: 38, percentage: 27 },
                { name: "Other", value: 0, percentage: 0 }
            ],
            topAgents: [
                { name: "Jenny Wilson", value: 35, dollarValue: "$12.5M" },
                { name: "Devon Lane", value: 28, dollarValue: "$9.8M" },
                { name: "Courtney Henry", value: 21, dollarValue: "$7.3M" },
                { name: "Other Agents", value: 58, dollarValue: "$20.2M" }
            ]
        }
    },
    page2: {
        agentsOffices: {
            totalAgents: 32,
            activeAgents: 32,
            inactiveAgents: 0,
            offices: 1
        },
        priceRatios: {
            allSides: 5.6,
            buyPrevCurrent: 4.9,
            buyTargetActual: 6.0
        },
        daysOnMarket: {
            allSides: 175,
            buyPrevCurrent: 134,
            buyTargetActual: 200
        },
        revenue: {
            total: "213K",
            overhead: "5%",
            brokerage: "2.5%",
            monthlySales: 18,
            weeklySales: 4,
            dailySales: "~1",
            dealsPerAgent: 5
        },
        marketRank: 18
    },
    page3: {
        averageListingPrice: 379,
        activeAgents: 2504,
        marketStatus: {
            closed: 6573,
            pending: 3215,
            active: 3606,
            median: "138K",
            grossCommission: "245M"
        },
        dealTypes: {
            multiAgentSeller: 14,
            multiAgentBuyer: 6,
            dual: 14,
            singleAgentSeller: 86,
            singleAgentBuyer: 94
        },
        listingStatus: [
            { name: "Closed", value: 43, percentage: 43 },
            { name: "Active", value: 24, percentage: 24 },
            { name: "Pending", value: 17, percentage: 17 },
            { name: "Expire", value: 10, percentage: 10 },
            { name: "Cancelled", value: 5, percentage: 5 },
            { name: "Other", value: 1, percentage: 1 }
        ]
    }
};

export const DashboardDataProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);
    const [isLoading, setIsLoading] = useState(false);

    // Load data from localStorage on mount
    useEffect(() => {
        try {
            const savedData = localStorage.getItem('dashboardData');
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setData(parsedData);
            }
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
        }
    }, []);

    // Save data to localStorage
    const saveData = () => {
        try {
            localStorage.setItem('dashboardData', JSON.stringify(data));
            return { success: true, message: 'Data saved successfully!' };
        } catch (error) {
            console.error('Error saving data:', error);
            return { success: false, message: 'Error saving data: ' + error.message };
        }
    };

    // Export data as JSON file
    const exportData = () => {
        try {
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            return { success: true, message: 'Data exported successfully!' };
        } catch (error) {
            console.error('Error exporting data:', error);
            return { success: false, message: 'Error exporting data: ' + error.message };
        }
    };

    // Import data from JSON file
    const importData = (file) => {
        return new Promise((resolve) => {
            setIsLoading(true);
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    // Validate data structure (basic validation)
                    if (importedData.page1 && importedData.page2 && importedData.page3) {
                        setData(importedData);
                        localStorage.setItem('dashboardData', JSON.stringify(importedData));
                        resolve({ success: true, message: 'Data imported successfully!' });
                    } else {
                        resolve({ success: false, message: 'Invalid data format. Please check your JSON file.' });
                    }
                } catch (error) {
                    console.error('Error importing data:', error);
                    resolve({ success: false, message: 'Error parsing JSON file: ' + error.message });
                } finally {
                    setIsLoading(false);
                }
            };
            reader.readAsText(file);
        });
    };

    // Reset to default data
    const resetData = () => {
        try {
            setData(defaultData);
            localStorage.removeItem('dashboardData');
            return { success: true, message: 'Data reset to default values!' };
        } catch (error) {
            console.error('Error resetting data:', error);
            return { success: false, message: 'Error resetting data: ' + error.message };
        }
    };

    // Update specific data values
    const updateData = (path, value) => {
        try {
            const newData = JSON.parse(JSON.stringify(data)); // Deep clone
            const pathArray = path.split('.');
            let current = newData;
            
            // Navigate to the parent object
            for (let i = 0; i < pathArray.length - 1; i++) {
                current = current[pathArray[i]];
            }
            
            // Update the value
            const lastKey = pathArray[pathArray.length - 1];
            current[lastKey] = value;
            
            setData(newData);
            return { success: true, message: 'Data updated successfully!' };
        } catch (error) {
            console.error('Error updating data:', error);
            return { success: false, message: 'Error updating data: ' + error.message };
        }
    };

    // Get data by path
    const getData = (path) => {
        try {
            const pathArray = path.split('.');
            let current = data;
            for (const key of pathArray) {
                current = current[key];
            }
            return current;
        } catch (error) {
            console.error('Error getting data:', error);
            return null;
        }
    };

    const contextValue = {
        data,
        isLoading,
        saveData,
        exportData,
        importData,
        resetData,
        updateData,
        getData
    };

    return (
        <DashboardDataContext.Provider value={contextValue}>
            {children}
        </DashboardDataContext.Provider>
    );
};
