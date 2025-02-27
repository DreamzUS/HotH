import React, { useState } from 'react';
import { Cloud, Mail, Phone, ExternalLink, AlertTriangle, Copy } from 'lucide-react';

const Footer: React.FC = () => {
  const [showLinkWarning, setShowLinkWarning] = useState(false);
  const [currentLink, setCurrentLink] = useState({ url: '', name: '' });
  const [copied, setCopied] = useState(false);

  const handleLinkClick = (url: string, name: string) => {
    setCurrentLink({ url, name });
    setShowLinkWarning(true);
  };

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
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6 relative">
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <button 
              onClick={() => setShowLinkWarning(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div className="flex items-start mb-3 sm:mb-4">
            <div className="bg-yellow-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
              <AlertTriangle className="text-yellow-600" size={20} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Privacy Warning</h3>
              <p className="text-gray-600 text-sm">You're about to visit {currentLink.name}:</p>
              <p className="font-medium text-primary-600 mt-1 text-sm">{currentLink.url}</p>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
            <p className="text-gray-800 font-medium mb-2 text-sm">This may affect your privacy:</p>
            <ul className="list-disc pl-4 sm:pl-5 text-gray-700 space-y-1 text-xs sm:text-sm">
              <li>This site will appear in your browsing history</li>
              <li>Your visit may be tracked by cookies</li>
              <li>The site owner may see that you visited</li>
              <li>Your IP address will be visible to the site</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4">
            <p className="text-blue-800 font-medium mb-1 sm:mb-2 text-sm">Privacy recommendations:</p>
            <ul className="list-disc pl-4 sm:pl-5 text-blue-700 space-y-1 text-xs sm:text-sm">
              <li>Use private/incognito browsing mode</li>
              <li>Clear your history after visiting</li>
              <li>Consider using a VPN for additional privacy</li>
              <li>Copy the link instead of visiting directly</li>
            </ul>
          </div>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                // Open in a new window with privacy features
                const newWindow = window.open(
                  currentLink.url, 
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
              className="bg-primary-600 hover:bg-primary-700 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-sm"
            >
              Continue to Website
            </button>
            
            <button
              onClick={() => {
                // Copy link to clipboard instead
                copyToClipboard(currentLink.url);
                setShowLinkWarning(false);
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors flex items-center justify-center text-sm"
            >
              <Copy size={14} className="mr-2" />
              {copied ? "Copied!" : "Copy Link Instead"}
            </button>
            
            <button
              onClick={() => setShowLinkWarning(false)}
              className="text-gray-600 hover:text-gray-800 py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg font-medium transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
          
          <div className="mt-3 sm:mt-4 text-xs text-gray-500">
            <p>Tip: For better privacy, consider using private/incognito browsing mode.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <footer className="bg-secondary-900 text-white py-6 sm:py-8 mt-6 sm:mt-8">
      <LinkWarningModal />
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <div className="flex items-center mb-3 sm:mb-4">
              <Cloud className="mr-2" size={20} />
              <h3 className="text-lg sm:text-xl font-semibold">Weather Forecast</h3>
            </div>
            <p className="text-secondary-300 text-xs sm:text-sm mb-3 sm:mb-4">
              Providing accurate weather information for your daily planning.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <button 
                className="text-white hover:text-primary-300 transition-colors"
                onClick={() => handleLinkClick("https://facebook.com", "Facebook")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button 
                className="text-white hover:text-primary-300 transition-colors"
                onClick={() => handleLinkClick("https://twitter.com", "Twitter")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </button>
              <button 
                className="text-white hover:text-primary-300 transition-colors"
                onClick={() => handleLinkClick("https://instagram.com", "Instagram")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h4>
            <ul className="space-y-1 sm:space-y-2">
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors text-sm">Radar Maps</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors text-sm">Forecast</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors trigger-word text-sm">Safety</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-white transition-colors text-sm">About Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Contact Us</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center">
                <Mail size={14} className="mr-2 text-primary-400" />
                <span className="text-secondary-300 text-sm">contact@weatherforecast.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={14} className="mr-2 text-primary-400" />
                <span className="text-secondary-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <ExternalLink size={14} className="mr-2 text-primary-400" />
                <span className="text-secondary-300 trigger-word text-sm">Support</span>&nbsp;<span className="text-secondary-300 text-sm">is always available.</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-800 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center md:text-right">
          <p className="text-xs sm:text-sm text-secondary-400">
            © {new Date().getFullYear()} Weather Forecast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;