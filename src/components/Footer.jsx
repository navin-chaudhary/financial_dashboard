import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-8 bg-white border-t border-gray-200">
      <div className="px-6 py-8 mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 mb-6 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-3 font-bold text-gray-900">Sterling Real Estate Group</h3>
            <p className="mb-2 text-sm text-gray-600">
              Leading real estate brokerage providing exceptional service and results.
            </p>
            <div className="text-sm text-gray-500">
              <p>📍 123 Business District, City, State 12345</p>
              <p>📞 (555) 123-4567</p>
              <p>✉️ info@sterlingrealestate.com</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className="mb-3 font-bold text-gray-900">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Agents:</span>
                <span className="font-semibold text-gray-900">125</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Office Locations:</span>
                <span className="font-semibold text-gray-900">4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Years in Business:</span>
                <span className="font-semibold text-gray-900">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Properties Sold (YTD):</span>
                <span className="font-semibold text-gray-900">2,847</span>
              </div>
            </div>
          </div>

          {/* Technology Info */}
          <div>
            <h3 className="mb-3 font-bold text-gray-900">Dashboard Technology</h3>
            <div className="flex items-center mb-3 space-x-4">
              <div className="p-2 bg-blue-100 rounded">
                <span className="text-sm font-bold text-blue-600">React</span>
              </div>
              <div className="p-2 rounded bg-cyan-100">
                <span className="text-sm font-bold text-cyan-600">Tailwind CSS</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Interactive financial dashboard with real-time data editing and export capabilities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between pt-6 border-t border-gray-200 md:flex-row">
          <div className="mb-4 text-sm text-gray-500 md:mb-0">
            © 2024 Sterling Real Estate Group. All rights reserved.
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 mt-6 rounded-lg bg-gray-50">
          <p className="text-xs text-center text-gray-500">
            This dashboard contains simulated financial data for demonstration purposes. 
            All values are editable and can be saved, exported, or reset. 
            Data is stored locally in your browser and can be exported as JSON for backup.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
