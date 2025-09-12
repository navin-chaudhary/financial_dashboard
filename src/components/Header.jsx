import React from 'react';
import EditableNumber from './EditableNumber';

const Header = () => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-6 mb-6">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Brokerage Dashboard: Sterling Real Estate Group
        </h1>
        <p className="text-gray-600">Financial Performance Overview</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Gross Revenue */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-sm font-medium text-blue-600 mb-2">Gross Revenue</div>
          <div className="text-3xl font-bold text-blue-900">
            <EditableNumber 
              path="grossRevenue" 
              format="currency" 
              className="text-3xl font-bold"
            />
          </div>
          <div className="text-sm text-blue-600 mt-1">Current Quarter</div>
        </div>

        {/* Average Commission */}
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-sm font-medium text-green-600 mb-2">Average Commission</div>
          <div className="text-3xl font-bold text-green-900">
            <EditableNumber 
              path="avgCommission" 
              format="currency" 
              className="text-3xl font-bold"
            />
          </div>
          <div className="text-sm text-green-600 mt-1">Per Transaction</div>
        </div>

        {/* Net Profit */}
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-sm font-medium text-purple-600 mb-2">Net Profit</div>
          <div className="text-3xl font-bold text-purple-900">
            <EditableNumber 
              path="netProfit" 
              format="currency" 
              className="text-3xl font-bold"
            />
          </div>
          <div className="text-sm text-purple-600 mt-1">After Expenses</div>
        </div>

        {/* Net Profit Margin */}
        <div className="bg-orange-50 rounded-lg p-6 text-center">
          <div className="text-sm font-medium text-orange-600 mb-2">Net Profit Margin</div>
          <div className="text-3xl font-bold text-orange-900">
            <EditableNumber 
              path="netProfitMargin" 
              format="percentage" 
              decimals={2}
              className="text-3xl font-bold"
            />
          </div>
          <div className="text-sm text-orange-600 mt-1">Efficiency Ratio</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
