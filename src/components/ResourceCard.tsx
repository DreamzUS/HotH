import React, { useState } from 'react';
import { ExternalLink, Phone, Info, Copy, Check, AlertTriangle } from 'lucide-react';
import { Resource } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, index }) => {
  const [copied, setCopied] = useState(false);
  const [showLinkWarning, setShowLinkWarning] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Custom link warning modal with enhanced privacy
  const LinkWarningModal = () => {
    if (!showLinkWarning) return null;
    
    return (
      <AnimatePresence>
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-3 sm:p-5 relative"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
              <motion.button 
                onClick={() => setShowLinkWarning(false)}
                className="text-gray-500 hover:text-gray-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </motion.button>
            </div>
            
            <div className="flex items-start mb-2 sm:mb-3">
              <div className="bg-yellow-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                <AlertTriangle className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Privacy Warning</h3>
                <p className="text-gray-600 text-xs sm:text-sm">You're about to visit an external website:</p>
                <p className="font-medium text-primary-600 mt-1 text-xs sm:text-sm">{resource.link}</p>
              </div>
            </div>
            
            <div className="bg-gray-100 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
              <p className="text-gray-800 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">This may affect your privacy:</p>
              <ul className="list-disc pl-4 sm:pl-5 text-gray-700 space-y-1 text-xs">
                <li>This site will appear in your browsing history</li>
                <li>Your visit may be tracked by cookies</li>
                <li>The site owner may see that you visited</li>
                <li>Your IP address will be visible to the site</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-2 sm:p-3 mb-2 sm:mb-3">
              <p className="text-blue-800 font-medium mb-1 sm:mb-2 text-xs sm:text-sm">Privacy recommendations:</p>
              <ul className="list-disc pl-4 sm:pl-5 text-blue-700 space-y-1 text-xs">
                <li>Use private/incognito browsing mode</li>
                <li>Clear your history after visiting</li>
                <li>Consider using a VPN for additional privacy</li>
                <li>Copy the link instead of visiting directly</li>
              </ul>
            </div>
            
            <div className="flex flex-col space-y-2">
              <motion.button
                onClick={() => {
                  // Open in a new window with privacy features
                  const newWindow = window.open(
                    resource.link, 
                    "_blank", 
                    "noopener,noreferrer"
                  );
                  
                  // If possible, instruct the new window to not be indexed
                  if (newWindow) {
                    try {
                      newWindow.document.head.innerHTML += '<meta name="robots" content="noindex,nofollow">';
                      newWindow.document.head.innerHTML += '<meta name="referrer" content="no-referrer">';
                    } catch (e) {
                      // Ignore cross-origin errors
                    }
                  }
                  
                  setShowLinkWarning(false);
                }}
                className="bg-primary-600 hover:bg-primary-700 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-xs sm:text-sm"
                whileHover={{ scale: 1.02, backgroundColor: "#0369a1" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Continue to Website
              </motion.button>
              
              <motion.button
                onClick={() => {
                  // Copy link to clipboard instead
                  copyToClipboard(resource.link);
                  setShowLinkWarning(false);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-xs sm:text-sm"
                whileHover={{ scale: 1.02, backgroundColor: "#e2e8f0" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <Copy size={14} className="mr-1 sm:mr-2" />
                Copy Link Instead
              </motion.button>
              
              <motion.button
                onClick={() => setShowLinkWarning(false)}
                className="text-gray-600 hover:text-gray-800 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-xs sm:text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                Cancel
              </motion.button>
            </div>
            
            <div className="mt-2 sm:mt-3 text-xs text-gray-500">
              <p>Tip: For better privacy, consider using private/incognito browsing mode.</p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <>
      <LinkWarningModal />
      <motion.div 
        className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-2 sm:mb-3 border-l-4 border-primary-500 hover:shadow-lg transition-shadow duration-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: index * 0.03, // Reduced from 0.08
          duration: 0.2, // Reduced from 0.5
          ease: [0.25, 0.1, 0.25, 1.0]
        }}
        whileHover={{ 
          y: -3, // Reduced from -5
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <h3 className="text-base sm:text-lg font-bold text-secondary-900 mb-1 sm:mb-2 flex items-center">
          <Info size={16} className="text-primary-500 mr-2" />
          {resource.title}
        </h3>
        <p className="text-secondary-600 mb-2 sm:mb-3 text-xs sm:text-sm">{resource.description}</p>
        
        <div className="flex flex-col space-y-2">
          {resource.phone && (
            <div className="flex items-center justify-between">
              <a 
                href={`tel:${resource.phone.replace(/\D/g, '')}`}
                className="flex items-center text-primary-600 hover:text-primary-800 transition-colors text-xs sm:text-sm"
                onClick={(e) => {
                  // Prevent default to avoid direct calling
                  e.preventDefault();
                  
                  // Show confirmation dialog with privacy warning
                  if (window.confirm(
                    "PRIVACY WARNING: Calling this number directly will leave a record in your call history. " +
                    "Are you sure you want to call now? Click Cancel to copy the number instead."
                  )) {
                    // If confirmed, proceed with the call
                    window.location.href = `tel:${resource.phone?.replace(/\D/g, '')}`;
                  } else {
                    // If canceled, copy to clipboard instead
                    copyToClipboard(resource.phone || '');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                }}
              >
                <Phone size={14} className="mr-1 sm:mr-2" />
                <span>{resource.phone}</span>
              </a>
              <motion.button
                onClick={() => copyToClipboard(resource.phone || '')}
                className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-2 sm:px-3 py-1 rounded-md text-xs flex items-center transition-colors"
                title="Copy number to clipboard instead of calling directly"
                whileHover={{ scale: 1.03, backgroundColor: "#bae6fd" }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
              >
                {copied ? <Check size={12} className="mr-1" /> : <Copy size={12} className="mr-1" />}
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>
          )}
          
          {resource.link && (
            <motion.button 
              onClick={() => setShowLinkWarning(true)}
              className="flex items-center text-primary-600 hover:text-primary-800 transition-colors w-auto text-left text-xs sm:text-sm"
              whileHover={{ x: 2 }} // Reduced from 3
              whileTap={{ x: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ExternalLink size={14} className="mr-1 sm:mr-2" />
              <span>Visit Website</span>
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ResourceCard;