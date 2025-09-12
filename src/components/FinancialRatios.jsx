import React from 'react';
import EditableNumber from './EditableNumber';

const FinancialRatios = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Market Analysis */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Market Analysis</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Average Price</span>
            <span className="font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.averagePrice" format="currency" />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Total Listings</span>
            <span className="font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.totalListings" format="number" />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Price per Sq Ft</span>
            <span className="font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.pricePerSqFt" format="currency" />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Median Days on Market</span>
            <span className="font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.medianDaysOnMarket" format="number" />
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Inventory (Months)</span>
            <span className="font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.inventoryMonths" format="number" decimals={1} />
            </span>
          </div>
        </div>
      </div>

      {/* Property Distribution Chart (Simulated) */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Property Listing Status</h2>
        <div className="space-y-4">
          {/* Pie Chart Simulation with CSS */}
          <div className="flex justify-center mb-4">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 rounded-full" style={{
                background: `conic-gradient(
                  #22c55e 0deg ${45 * 3.6}deg,
                  #f59e0b ${45 * 3.6}deg ${(45 + 25) * 3.6}deg,
                  #3b82f6 ${(45 + 25) * 3.6}deg ${(45 + 25 + 20) * 3.6}deg,
                  #ef4444 ${(45 + 25 + 20) * 3.6}deg 360deg
                )`
              }}></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">100%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Active</span>
              </div>
              <span className="font-bold text-gray-900">
                <EditableNumber path="propertyDistribution.active" format="percentage" />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Pending</span>
              </div>
              <span className="font-bold text-gray-900">
                <EditableNumber path="propertyDistribution.pending" format="percentage" />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Sold</span>
              </div>
              <span className="font-bold text-gray-900">
                <EditableNumber path="propertyDistribution.sold" format="percentage" />
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Expired</span>
              </div>
              <span className="font-bold text-gray-900">
                <EditableNumber path="propertyDistribution.expired" format="percentage" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Key Performance Indicators</h2>
        <div className="space-y-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-700">
              <EditableNumber path="kpi.agentRetention" format="percentage" />
            </div>
            <div className="text-sm text-green-600">Agent Retention</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-700">
              <EditableNumber path="kpi.clientSatisfaction" format="number" decimals={1} />
            </div>
            <div className="text-sm text-blue-600">Client Satisfaction</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-700">
              <EditableNumber path="kpi.marketShare" format="percentage" />
            </div>
            <div className="text-sm text-purple-600">Market Share</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-700">
              <EditableNumber path="kpi.referralRate" format="percentage" />
            </div>
            <div className="text-sm text-orange-600">Referral Rate</div>
          </div>
        </div>
      </div>

      {/* Additional Market Metrics */}
      <div className="card p-6 lg:col-span-2">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Market Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.soldProperties" format="number" />
            </div>
            <div className="text-sm text-gray-600">Properties Sold</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.totalVolume" format="currency" />
            </div>
            <div className="text-sm text-gray-600">Total Volume</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.avgDaysOnMarket" format="number" />
            </div>
            <div className="text-sm text-gray-600">Avg Days on Market</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-900">
              <EditableNumber path="marketAnalysis.totalListings" format="number" />
            </div>
            <div className="text-sm text-gray-600">Total Listings</div>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <div className="card p-6 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recognition</h2>
        <div className="bg-yellow-50 rounded-lg p-6">
          <div className="text-6xl mb-2">🏆</div>
          <div className="text-4xl font-bold text-yellow-700 mb-2">
            <EditableNumber path="awards.count" format="number" />
          </div>
          <div className="text-sm text-yellow-600 font-medium">
            Industry Awards Won This Year
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialRatios;
