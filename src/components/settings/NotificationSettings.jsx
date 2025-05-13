import { useState } from 'react';
import { toast } from 'react-toastify';

function NotificationSettings({ darkMode }) {
  const [settings, setSettings] = useState({
    emailNotifications: {
      invoiceCreated: true,
      paymentReceived: true,
      paymentReminders: true,
      monthlyReport: false,
      productUpdates: true,
      marketingEmails: false
    },
    appNotifications: {
      invoiceCreated: true,
      paymentReceived: true,
      paymentReminders: true,
      productUpdates: false
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (category, setting) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: !settings[category][setting]
      }
    });
  };

  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Notification preferences updated');
    }, 1000);
  };

  // Configuration for notification options
  const notificationCategories = [
    {
      id: 'emailNotifications',
      title: 'Email Notifications',
      description: 'Control which emails you receive from us',
      settings: [
        { id: 'invoiceCreated', label: 'New invoice created' },
        { id: 'paymentReceived', label: 'Payment received' },
        { id: 'paymentReminders', label: 'Payment reminders' },
        { id: 'monthlyReport', label: 'Monthly summary reports' },
        { id: 'productUpdates', label: 'Product updates and new features' },
        { id: 'marketingEmails', label: 'Marketing and promotional emails' }
      ]
    },
    {
      id: 'appNotifications',
      title: 'In-App Notifications',
      description: 'Control which notifications appear in the app',
      settings: [
        { id: 'invoiceCreated', label: 'New invoice created' },
        { id: 'paymentReceived', label: 'Payment received' },
        { id: 'paymentReminders', label: 'Payment reminders' },
        { id: 'productUpdates', label: 'Product updates and new features' }
      ]
    }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
      
      <div className="space-y-8">
        {notificationCategories.map((category) => (
          <div key={category.id} className="bg-surface-50 dark:bg-surface-800 p-6 rounded-lg border border-surface-200 dark:border-surface-700">
            <h3 className="text-lg font-medium mb-2">{category.title}</h3>
            <p className="text-surface-600 dark:text-surface-400 text-sm mb-4">{category.description}</p>
            
            <div className="space-y-3">
              {category.settings.map((setting) => (
                <div key={setting.id} className="flex items-center justify-between py-2">
                  <span className="text-sm font-medium">{setting.label}</span>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings[category.id][setting.id]} 
                      onChange={() => handleToggle(category.id, setting.id)}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-surface-300 dark:bg-surface-600 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 rounded-lg border border-blue-100 dark:border-blue-800/30">
        <h4 className="font-medium mb-1">Note about notifications</h4>
        <p className="text-sm">
          You can unsubscribe from all marketing emails at any time by clicking the "Unsubscribe" link at the bottom of any email. We'll still send you important account notifications.
        </p>
      </div>
    </div>
  );
}

export default NotificationSettings;