import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Clients from './pages/Clients';
import Settings from './pages/Settings';

// Import components and utilities
import getIcon from './utils/iconUtils';
import { motion } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('invoices');
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Icons
  const LayoutDashboard = getIcon('LayoutDashboard');
  const FilePlus = getIcon('FilePlus');

  useEffect(() => {
    // Check local storage or system preference for dark mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setDarkMode(isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('invoices');
    } else if (location.pathname === '/clients') {
      setActiveTab('clients');
    } else if (location.pathname === '/settings') {
      setActiveTab('settings');
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (tabName, path) => {
    setActiveTab(tabName);
    navigate(path);
    setSidebarOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('darkMode', String(newValue));
      
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newValue;
    });
  };

  const Users = getIcon('Users');
  const FileBarChart = getIcon('FileBarChart');
  const Settings = getIcon('Settings');
  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 text-surface-900 dark:text-surface-50 transition-colors duration-300">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
      />
      
      <div className="absolute top-4 right-4 z-50">
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex md:w-64 flex-col fixed inset-y-0 z-50">
          <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 shadow-sm overflow-y-auto">
            <div className="flex items-center justify-center px-4 mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                InvoiceFlow
              </h1>
            </div>
            
            <nav className="mt-5 flex-1 px-4 space-y-1">
              <button 
                onClick={() => handleNavigation('dashboard', '/')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </button>
              
              <button 
                onClick={() => handleNavigation('invoices', '/')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'invoices' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <FilePlus className="mr-3 h-5 w-5" />
                Invoices
              </button>
              
              <button 
                onClick={() => handleNavigation('clients', '/clients')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'clients' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Clients
              </button>
              
              <button 
                onClick={() => handleNavigation('reports', '/')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'reports' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <FileBarChart className="mr-3 h-5 w-5" />
                Reports
              </button>
              
              <button 
                onClick={() => handleNavigation('settings', '/settings')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </button>
            </nav>
            
            <div className="flex-shrink-0 p-4">
              <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                <LogOut className="mr-3 h-5 w-5" />
                Log out
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile sidebar */}
        <motion.div 
          className={`md:hidden fixed inset-0 z-50 bg-surface-900/50 ${sidebarOpen ? 'block' : 'hidden'}`}
          onClick={toggleSidebar}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
        
        <motion.aside 
          className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-surface-800 shadow-xl`}
          initial={{ x: "-100%" }}
          animate={{ x: sidebarOpen ? 0 : "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-surface-200 dark:border-surface-700">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                InvoiceFlow
              </h1>
              <button 
                onClick={toggleSidebar}
                className="text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 pt-4 pb-4 space-y-1 overflow-y-auto">
              <button 
                onClick={() => handleNavigation('dashboard', '/')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </button>
              
              <button 
                onClick={() => handleNavigation('invoices', '/')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'invoices' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <FilePlus className="mr-3 h-5 w-5" />
                Invoices
              </button>
              
              <button 
                onClick={() => handleNavigation('clients', '/clients')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'clients' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Clients
              </button>
              
              <button 
                onClick={() => handleNavigation('reports', '/')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'reports' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <FileBarChart className="mr-3 h-5 w-5" />
                Reports
              </button>
              
              <button
                onClick={() => handleNavigation('settings', '/settings')}
                className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-primary/10 text-primary dark:bg-primary/20'
                    : 'text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700'
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </button>
            </nav>
            
            <div className="flex-shrink-0 p-4 border-t border-surface-200 dark:border-surface-700">
              <button className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors">
                <LogOut className="mr-3 h-5 w-5" />
                Log out
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} activeTab={activeTab} setActiveTab={setActiveTab} toggleSidebar={toggleSidebar} />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} />} />
            <Route path="/clients" element={<Clients darkMode={darkMode} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;