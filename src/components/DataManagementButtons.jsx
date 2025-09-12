import React, { useRef, useState } from 'react';
import { useData } from '../context/DataContext';

const DataManagementButtons = () => {
  const { saveData, exportData, importData, resetData } = useData();
  const fileInputRef = useRef(null);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    saveData();
    showMessage('Data saved to localStorage successfully!', 'success');
  };

  const handleExport = () => {
    exportData();
    showMessage('Data exported as JSON file!', 'success');
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.json')) {
      showMessage('Please select a valid JSON file.', 'error');
      return;
    }

    setIsImporting(true);
    try {
      await importData(file);
      showMessage('Data imported successfully!', 'success');
    } catch (error) {
      showMessage('Error importing data. Please check the file format.', 'error');
      console.error('Import error:', error);
    } finally {
      setIsImporting(false);
      event.target.value = ''; // Reset file input
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to default values? This action cannot be undone.')) {
      resetData();
      showMessage('Data reset to default values.', 'success');
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="card p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Data Management</h2>
      
      {/* Message Display */}
      {message && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        {/* Save Button */}
        <button
          onClick={handleSave}
          className="btn-success flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Data
        </button>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="btn-primary flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export JSON
        </button>

        {/* Import Button */}
        <button
          onClick={handleImportClick}
          disabled={isImporting}
          className="btn-warning flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          {isImporting ? 'Importing...' : 'Import JSON'}
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="btn-danger flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Reset Data
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Save:</strong> Store current data in browser localStorage</li>
          <li>• <strong>Export:</strong> Download current data as JSON file</li>
          <li>• <strong>Import:</strong> Upload a JSON file to restore previous data</li>
          <li>• <strong>Reset:</strong> Clear all data and restore default values</li>
          <li>• <strong>Edit:</strong> Click on any number to edit it inline</li>
        </ul>
      </div>
    </div>
  );
};

export default DataManagementButtons;
