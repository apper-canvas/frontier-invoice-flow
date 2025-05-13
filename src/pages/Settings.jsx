import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

// Import settings components
import ProfileSettings from '../components/settings/ProfileSettings';
import SecuritySettings from '../components/settings/SecuritySettings';
import SocialConnections from '../components/settings/SocialConnections';
import NotificationSettings from '../components/settings/NotificationSettings';
import DataManagement from '../components/settings/DataManagement';

function Settings({ darkMode }) {
  // Icons
  const User = getIcon('User');
  const Shield = getIcon('Shield');
  const Globe = getIcon('Globe');
  const Bell = getIcon('Bell');
  const Database = getIcon('Database');
  const ChevronLeft = getIcon('ChevronLeft');
  
  const [activeTab, setActiveTab] = useState('profile');

  // Animation variants for tab content
  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  // Tab configuration with icons and labels
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'social', label: 'Social Connections', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'data', label: 'Data & Privacy', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50">
      {/* Header */}
      <header className="bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 mr-2">
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </Link>
              <h1 className="text-xl font-semibold ml-4">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-surface-800 shadow-sm rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden">
              <nav className="divide-y divide-surface-200 dark:divide-surface-700">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary dark:bg-primary/20'
                          : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white dark:bg-surface-800 shadow-sm rounded-lg border border-surface-200 dark:border-surface-700 p-6">
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  <ProfileSettings darkMode={darkMode} />
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  <SecuritySettings darkMode={darkMode} />
                </motion.div>
              )}

              {activeTab === 'social' && (
                <motion.div
                  key="social"
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  <SocialConnections darkMode={darkMode} />
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  <NotificationSettings darkMode={darkMode} />
                </motion.div>
              )}

              {activeTab === 'data' && (
                <motion.div
                  key="data"
                  initial="hidden"
                  animate="visible"
                  variants={tabContentVariants}
                >
                  <DataManagement darkMode={darkMode} />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              &copy; {new Date().getFullYear()} InvoiceFlow. All rights reserved.
            </p>
            <div className="mt-3 md:mt-0 flex space-x-4">
              <a href="#" className="text-sm text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">
                Terms
              </a>
              <a href="#" className="text-sm text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">
                Privacy
              </a>
              <a href="#" className="text-sm text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary-light">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Settings;