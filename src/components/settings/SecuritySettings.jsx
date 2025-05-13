import { useState } from 'react';
import { toast } from 'react-toastify';
import getIcon from '../../utils/iconUtils';

function SecuritySettings({ darkMode }) {
  const Lock = getIcon('Lock');
  const Key = getIcon('Key');
  const Smartphone = getIcon('Smartphone');
  
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [mfaEnabled, setMfaEnabled] = useState(false);
  const [showMfaSetup, setShowMfaSetup] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validatePasswordForm = () => {
    const newErrors = {};
    
    if (!passwordForm.currentPassword) newErrors.currentPassword = 'Current password is required';
    if (!passwordForm.newPassword) {
      newErrors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePasswordForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      toast.success('Password updated successfully');
    }, 1000);
  };

  const toggleMfaSetup = () => {
    setShowMfaSetup(!showMfaSetup);
    if (!showMfaSetup) {
      setVerificationCode('');
    }
  };

  const handleVerificationChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleMfaSubmit = (e) => {
    e.preventDefault();
    
    if (!verificationCode) {
      toast.error('Please enter verification code');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMfaEnabled(true);
      setShowMfaSetup(false);
      toast.success('Two-factor authentication enabled');
    }, 1000);
  };

  const handleDisableMfa = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMfaEnabled(false);
      toast.success('Two-factor authentication disabled');
    }, 1000);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
      
      <div className="space-y-8">
        {/* Password Change Section */}
        <div className="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg border border-surface-200 dark:border-surface-700">
          <div className="flex items-start mb-4">
            <Lock className="h-6 w-6 mr-3 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Change Password</h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                Update your password regularly to keep your account secure
              </p>
            </div>
          </div>
          
          <form onSubmit={handlePasswordSubmit} className="mt-4">
            <div className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border ${errors.currentPassword ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white`}
                />
                {errors.currentPassword && <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>}
              </div>
              
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border ${errors.newPassword ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white`}
                />
                {errors.newPassword && <p className="mt-1 text-sm text-red-500">{errors.newPassword}</p>}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className={`w-full px-3 py-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-surface-300 dark:border-surface-600'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white`}
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
        
        {/* Two-Factor Authentication Section */}
        <div className="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg border border-surface-200 dark:border-surface-700">
          <div className="flex items-start mb-4">
            <Smartphone className="h-6 w-6 mr-3 text-primary" />
            <div>
              <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
              <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          
          {!mfaEnabled ? (
            <div>
              {!showMfaSetup ? (
                <button
                  onClick={toggleMfaSetup}
                  className="px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Enable Two-Factor Authentication
                </button>
              ) : (
                <form onSubmit={handleMfaSubmit} className="mt-4">
                  <div className="mb-4">
                    <div className="bg-surface-100 dark:bg-surface-700 p-4 rounded-lg mb-4">
                      <p className="text-sm mb-2">Scan this QR code with your authenticator app:</p>
                      <div className="bg-white p-2 w-40 h-40 mx-auto mb-2 flex items-center justify-center">
                        <div className="w-32 h-32 bg-surface-200 dark:bg-surface-600 grid grid-cols-5 grid-rows-5">
                          {/* Simulated QR code pattern */}
                          {Array.from({ length: 25 }).map((_, i) => (
                            <div key={i} className={`${Math.random() > 0.6 ? 'bg-surface-900' : ''}`}></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-center text-surface-600 dark:text-surface-400">Or use code: <span className="font-mono font-bold">ABCD EFGH IJKL</span></p>
                    </div>
                    
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1">
                      Enter Verification Code
                    </label>
                    <input
                      type="text"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={handleVerificationChange}
                      placeholder="000000"
                      className="w-full px-3 py-2 border border-surface-300 dark:border-surface-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-surface-700 text-surface-900 dark:text-white"
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Verifying...' : 'Verify and Enable'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={toggleMfaSetup}
                      className="px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-900 dark:text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div>
              <div className="flex items-center mb-4">
                <div className="h-6 w-6 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 5 5L20 7"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Two-factor authentication is enabled</span>
              </div>
              
              <button
                onClick={handleDisableMfa}
                disabled={isLoading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Disabling...' : 'Disable Two-Factor Authentication'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;