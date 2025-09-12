import React from 'react';
import EditableNumber from './EditableNumber';

const IncomeStatement = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Current Quarter Income Statement */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Income Statement - Current Quarter</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Revenue</span>
            <span className="font-bold text-gray-900">
              <EditableNumber path="currentQuarter.revenue" format="currency" />
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Cost of Goods Sold</span>
            <span className="font-bold text-red-600">
              <EditableNumber path="currentQuarter.cogs" format="currency" />
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Operating Expenses</span>
            <span className="font-bold text-red-600">
              <EditableNumber path="currentQuarter.operatingExpenses" format="currency" />
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 bg-green-50 rounded px-3">
            <span className="font-bold text-gray-900">Net Income</span>
            <span className="font-bold text-green-700 text-lg">
              <EditableNumber path="currentQuarter.netIncome" format="currency" />
            </span>
          </div>
        </div>
      </div>

      {/* Previous Quarter Income Statement */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Income Statement - Previous Quarter</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Revenue</span>
            <span className="font-bold text-gray-900">
              <EditableNumber path="previousQuarter.revenue" format="currency" />
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Cost of Goods Sold</span>
            <span className="font-bold text-red-600">
              <EditableNumber path="previousQuarter.cogs" format="currency" />
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="font-medium text-gray-700">Operating Expenses</span>
            <span className="font-bold text-red-600">
              <EditableNumber path="previousQuarter.operatingExpenses" format="currency" />
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-t-2 border-gray-300 bg-blue-50 rounded px-3">
            <span className="font-bold text-gray-900">Net Income</span>
            <span className="font-bold text-blue-700 text-lg">
              <EditableNumber path="previousQuarter.netIncome" format="currency" />
            </span>
          </div>
        </div>
      </div>

      {/* Top Offices Performance */}
      <div className="card p-6 lg:col-span-2">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Offices Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Office</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Revenue</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">Margin (%)</th>
              </tr>
            </thead>
            <tbody>
              {[0, 1, 2, 3].map((index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    <span className="cursor-pointer hover:bg-blue-50 hover:ring-1 hover:ring-blue-500 rounded px-1">
                      {index === 0 && "Northside Office"}
                      {index === 1 && "Downtown Office"}
                      {index === 2 && "Westside Office"}
                      {index === 3 && "Southside Office"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-gray-900">
                    <EditableNumber path={`topOffices.${index}.revenue`} format="currency" />
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-green-600">
                    <EditableNumber path={`topOffices.${index}.margin`} format="percentage" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncomeStatement;
