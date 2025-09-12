import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Sterling Real Estate Group</h3>
            <p className="text-gray-600 text-sm mb-2">
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
            <h3 className="font-bold text-gray-900 mb-3">Quick Stats</h3>
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
            <h3 className="font-bold text-gray-900 mb-3">Dashboard Technology</h3>
            <div className="flex items-center space-x-4 mb-3">
              <div className="bg-blue-100 p-2 rounded">
                <span className="text-blue-600 font-bold text-sm">React</span>
              </div>
              <div className="bg-cyan-100 p-2 rounded">
                <span className="text-cyan-600 font-bold text-sm">Tailwind CSS</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              Interactive financial dashboard with real-time data editing and export capabilities.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2024 Sterling Real Estate Group. All rights reserved.
          </div>
          
          {/* QR Code Placeholder (like in the PDF) */}
          <div className="flex items-center space-x-4">
            <div className="text-gray-500 text-sm">Scan for mobile access:</div>
            <div className="w-16 h-16 bg-gray-200 border-2 border-gray-300 rounded flex items-center justify-center">
              <div className="grid grid-cols-4 gap-px">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 h-1 ${
                      Math.random() > 0.5 ? 'bg-gray-800' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
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
