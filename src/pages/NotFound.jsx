import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  // Declare icon
  const ArrowLeft = getIcon('ArrowLeft');
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-surface-50 dark:bg-surface-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto text-center"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold text-primary mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-surface-900 dark:text-white">Page Not Found</h2>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center justify-center space-x-2 bg-primary hover:bg-primary-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;