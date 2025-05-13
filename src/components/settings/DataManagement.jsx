import { useState } from 'react';
import { toast } from 'react-toastify';
import getIcon from '../../utils/iconUtils';

function DataManagement({ darkMode }) {
  // Get icons
  const Download = getIcon('Download');
  const Upload = getIcon('Upload');
  const Trash = getIcon('Trash');
  const AlertTriangle = getIcon('AlertTriangle');
  
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  
  const handleExportData = (format) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate file download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `invoice-data-export.${format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Data exported successfully as ${format}`);
    }, 1500);
  };
  
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      e.target.value = null; // Reset file input
      toast.success(`Data imported successfully from ${file.name}`);
    }, 1500);
  };
  
  const openDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };
  
  const closeDeleteConfirmation = () => {
    setShowDeleteConfirmation(false);
    setDeleteConfirmText('');
  };
  
  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type DELETE to confirm');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowDeleteConfirmation(false);
      toast.success('Account deletion process has begun. You will receive a confirmation email.');
    }, 1500);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Data Management</h2>
      
      <div className="space-y-8">
        {/* Data Export Section */}
        <div className="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg border border-surface-200 dark:border-surface-700">
          <div className="flex items-start mb-4">
            <Download className="h-6 w-6 mr-3 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Export Your Data</h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                Download a copy of your data in various formats
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={() => handleExportData('JSON')}
              disabled={isLoading}
              className="px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export as JSON
            </button>
            
            <button
              onClick={() => handleExportData('CSV')}
              disabled={isLoading}
              className="px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export as CSV
            </button>
            
            <button
              onClick={() => handleExportData('PDF')}
              disabled={isLoading}
              className="px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export as PDF
            </button>
          </div>
        </div>
        
        {/* Data Import Section */}
        <div className="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg border border-surface-200 dark:border-surface-700">
          <div className="flex items-start mb-4">
            <Upload className="h-6 w-6 mr-3 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Import Data</h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                Upload data from another system (JSON or CSV format)
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <label
              htmlFor="importFile"
              className={`inline-block px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {isLoading ? 'Importing...' : 'Select File to Import'}
            </label>
            <input
              type="file"
              id="importFile"
              accept=".json,.csv"
              onChange={handleImportData}
              disabled={isLoading}
              className="hidden"
            />
          </div>
        </div>
        
        {/* Account Deletion Section */}
        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800/30">
          <div className="flex items-start mb-4">
            <Trash className="h-6 w-6 mr-3 text-red-600 dark:text-red-400" />
            <div>
              <h3 className="text-lg font-medium text-red-700 dark:text-red-400">Delete Account</h3>
              <p className="text-red-600 dark:text-red-300 text-sm mt-1">
                Permanently delete your account and all associated data
              </p>
            </div>
          </div>
          
          <button
            onClick={openDeleteConfirmation}
            disabled={isLoading}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Delete Account
          </button>
          
          {showDeleteConfirmation && (
            <div className="fixed inset-0 bg-surface-900/50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-surface-800 p-6 rounded-lg max-w-md w-full mx-4">
                <div className="flex items-center text-red-600 dark:text-red-400 mb-4">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  <h3 className="text-lg font-semibold">Delete Account</h3>
                </div>
                
                <p className="mb-4 text-surface-700 dark:text-surface-300">
                  This action cannot be undone. All your data, including invoices, clients, and settings will be permanently deleted.
                </p>
                
                <div className="mb-4">
                  <label htmlFor="confirmDelete" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                    Type DELETE to confirm
                  </label>
                  <input
                    type="text"
                    id="confirmDelete"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={closeDeleteConfirmation}
                    className="px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-surface-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleDeleteAccount}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : 'Permanently Delete Account'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataManagement;