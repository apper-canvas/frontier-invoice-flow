import { useState } from 'react';
import { toast } from 'react-toastify';
import getIcon from '../../utils/iconUtils';

function SocialConnections({ darkMode }) {
  // Get icons
  const Github = getIcon('Github');
  const Linkedin = getIcon('Linkedin');
  const Twitter = getIcon('Twitter');
  const Gmail = getIcon('Mail');
  
  // Social connections state
  const [connections, setConnections] = useState({
    google: { connected: true, username: 'john.doe@gmail.com' },
    github: { connected: false, username: '' },
    linkedin: { connected: true, username: 'johndoe' },
    twitter: { connected: false, username: '' }
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const toggleConnection = (service) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const currentStatus = connections[service].connected;
      
      setConnections({
        ...connections,
        [service]: {
          ...connections[service],
          connected: !currentStatus,
          username: currentStatus ? '' : (service === 'google' ? 'john.doe@gmail.com' : 'johndoe')
        }
      });
      
      setIsLoading(false);
      
      if (currentStatus) {
        toast.success(`Disconnected from ${service.charAt(0).toUpperCase() + service.slice(1)}`);
      } else {
        toast.success(`Connected to ${service.charAt(0).toUpperCase() + service.slice(1)}`);
      }
    }, 1000);
  };

  // Configuration for social services
  const socialServices = [
    { id: 'google', name: 'Google', icon: Gmail, color: 'bg-red-500 hover:bg-red-600', textColor: 'text-white' },
    { id: 'github', name: 'GitHub', icon: Github, color: 'bg-surface-800 hover:bg-surface-900', textColor: 'text-white' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-600 hover:bg-blue-700', textColor: 'text-white' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'bg-blue-400 hover:bg-blue-500', textColor: 'text-white' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Social Connections</h2>
      
      <div className="space-y-4">
        {socialServices.map((service) => {
          const ServiceIcon = service.icon;
          const isConnected = connections[service.id].connected;
          
          return (
            <div key={service.id} className="flex items-center justify-between p-4 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${service.color} ${service.textColor} mr-4`}>
                  <ServiceIcon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  {isConnected && <p className="text-sm text-surface-600 dark:text-surface-400">{connections[service.id].username}</p>}
                </div>
              </div>
              
              <button
                onClick={() => toggleConnection(service.id)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isConnected
                    ? 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-300 dark:hover:bg-surface-600 focus:ring-surface-500'
                    : 'bg-primary hover:bg-primary-dark text-white focus:ring-primary'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Processing...' : (isConnected ? 'Disconnect' : 'Connect')}
              </button>
            </div>
          );
        })}
      </div>
      
      <p className="mt-6 text-sm text-surface-600 dark:text-surface-400">
        Connecting your accounts allows for easier sign-in and enables features like importing data from these services.
      </p>
    </div>
  );
}

export default SocialConnections;