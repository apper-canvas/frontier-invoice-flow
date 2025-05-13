import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 
import { toast } from 'react-toastify';
import MainFeature from '../components/MainFeature';
import getIcon from '../utils/iconUtils';

function Home({ darkMode }) {
  // Declare icons
  const LayoutDashboard = getIcon('LayoutDashboard');
  const FilePlus = getIcon('FilePlus');
  const Users = getIcon('Users');
  const FileBarChart = getIcon('FileBarChart');
  const Settings = getIcon('Settings');
  const LogOut = getIcon('LogOut');
  const Menu = getIcon('Menu');
  const X = getIcon('X');
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('invoices');
  
  // Mock data for demo purposes
  const stats = [
    { title: "Total Invoices", value: "52", change: "+8%", icon: "Receipt", color: "bg-blue-500" },
    { title: "Pending Amount", value: "$12,430", change: "-2%", icon: "Clock", color: "bg-amber-500" },
    { title: "Paid Amount", value: "$28,400", change: "+12%", icon: "Check", color: "bg-green-500" },
    { title: "Overdue", value: "$4,380", change: "+4%", icon: "AlertCircle", color: "bg-red-500" }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get icon components for stats
  const statsIcons = {};
  stats.forEach(stat => {
    statsIcons[stat.title] = getIcon(stat.icon);
  });

  return (
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
              onClick={() => setActiveTab('dashboard')}
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
              onClick={() => setActiveTab('invoices')}
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
              onClick={() => setActiveTab('clients')}
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
              onClick={() => setActiveTab('reports')}
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
              onClick={() => window.location.href = '/settings'}
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
              onClick={() => {
                setActiveTab('dashboard');
                setSidebarOpen(false);
              }}
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
              onClick={() => {
                setActiveTab('invoices');
                setSidebarOpen(false);
              }}
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
              onClick={() => {
                setActiveTab('clients');
                setSidebarOpen(false);
              }}
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
              onClick={() => {
                setActiveTab('reports');
                setSidebarOpen(false);
              }}
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
              onClick={() => window.location.href = '/settings'}
                setActiveTab('settings');
                setSidebarOpen(false);
              }}
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
        {/* Top navigation */}
        <header className="sticky top-0 z-10 bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 shadow-sm">
          <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={toggleSidebar}
                className="md:hidden mr-4 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-50"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-surface-900 dark:text-white">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'invoices' && 'Invoices'}
                {activeTab === 'clients' && 'Clients'}
                {activeTab === 'reports' && 'Reports'}
                {activeTab === 'settings' && 'Settings'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                  <span className="hidden md:inline text-sm font-medium">John Doe</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-surface-50 dark:bg-surface-900">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat) => {
                  const StatIcon = statsIcons[stat.title];
                  return (
                    <motion.div 
                      key={stat.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="card p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-surface-500 dark:text-surface-400">{stat.title}</p>
                          <h3 className="mt-1 text-2xl font-bold text-surface-900 dark:text-white">{stat.value}</h3>
                          <p className={`mt-1 text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className={`${stat.color} p-3 rounded-lg`}>
                          <StatIcon className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="card p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
                        <path d="m5 12 5 5L20 7"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Invoice <span className="font-semibold">#INV-1234</span> was paid</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Today at 10:45 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-400">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">New invoice <span className="font-semibold">#INV-1235</span> created</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">Yesterday at 5:30 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Invoice <span className="font-semibold">#INV-1230</span> is overdue</p>
                      <p className="text-xs text-surface-500 dark:text-surface-400">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <MainFeature darkMode={darkMode} />
          )}

          {activeTab === 'clients' && (
            <div className="text-center py-10">
              <h2 className="text-xl font-bold mb-2">Client Management</h2>
              <p className="text-surface-600 dark:text-surface-400 mb-6">This feature will be available in the next update.</p>
              <button 
                className="btn-primary"
                onClick={() => toast.info("Client management feature coming soon!")}
              >
                Notify Me When Available
              </button>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="text-center py-10">
              <h2 className="text-xl font-bold mb-2">Reports & Analytics</h2>
              <p className="text-surface-600 dark:text-surface-400 mb-6">This feature will be available in the next update.</p>
              <button 
                className="btn-primary"
                onClick={() => toast.info("Reports feature coming soon!")}
              >
                Notify Me When Available
              </button>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-10">
              <h2 className="text-xl font-bold mb-2">Settings</h2>
              <p className="text-surface-600 dark:text-surface-400 mb-6">This feature will be available in the next update.</p>
              <button 
                className="btn-primary"
                onClick={() => toast.info("Settings feature coming soon!")}
              >
                Notify Me When Available
              </button>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800 py-4 px-6 md:px-8">
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
        </footer>
      </div>
    </div>
  );
}

export default Home;