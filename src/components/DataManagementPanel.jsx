import React, { useState, useRef } from 'react';
import { useDashboardData } from '../context/DashboardDataContext';

const DataManagementPanel = () => {
    const { saveData, exportData, importData, resetData, isLoading } = useDashboardData();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const fileInputRef = useRef(null);

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 3000);
    };

    const handleSave = () => {
        const result = saveData();
        showMessage(result.message, result.success ? 'success' : 'error');
    };

    const handleExport = () => {
        const result = exportData();
        showMessage(result.message, result.success ? 'success' : 'error');
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type === 'application/json' || file.name.endsWith('.json')) {
                const result = await importData(file);
                showMessage(result.message, result.success ? 'success' : 'error');
            } else {
                showMessage('Please select a valid JSON file.', 'error');
            }
            // Reset file input
            e.target.value = '';
        }
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset all data to default values? This action cannot be undone.')) {
            const result = resetData();
            showMessage(result.message, result.success ? 'success' : 'error');
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-lg border-2 border-gray-300 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <span className="text-2xl mr-2">⚙️</span>
                    Data Management
                </h2>
                {isLoading && (
                    <div className="flex items-center text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                        Processing...
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
                >
                    <span className="text-lg mr-2">💾</span>
                    Save Data
                </button>

                <button
                    onClick={handleExport}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
                >
                    <span className="text-lg mr-2">📥</span>
                    Export JSON
                </button>

                <button
                    onClick={handleImportClick}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
                >
                    <span className="text-lg mr-2">📤</span>
                    Import JSON
                </button>

                <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="flex items-center justify-center px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm"
                >
                    <span className="text-lg mr-2">🔄</span>
                    Reset Data
                </button>
            </div>

            {/* Hidden File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="text-lg mr-2">📋</span>
                    Instructions:
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>💾 Save:</strong> Store current data in browser localStorage</li>
                    <li><strong>📥 Export:</strong> Download current data as JSON file</li>
                    <li><strong>📤 Import:</strong> Upload a JSON file to restore previous data</li>
                    <li><strong>🔄 Reset:</strong> Clear all data and restore default values</li>
                    <li><strong>✏️ Edit:</strong> Click on any number to edit it inline</li>
                </ul>
            </div>

            {/* Message Display */}
            {message && (
                <div className={`mt-4 p-3 rounded-lg border ${
                    messageType === 'success' 
                        ? 'bg-green-50 border-green-200 text-green-800' 
                        : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                    <div className="flex items-center">
                        <span className="text-lg mr-2">
                            {messageType === 'success' ? '✅' : '❌'}
                        </span>
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataManagementPanel;
