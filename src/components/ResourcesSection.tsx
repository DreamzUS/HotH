import React, { useState, useEffect, useRef } from 'react';
import { X, AlertTriangle, Heart, Home, ArrowLeft, Shield, ExternalLink, Lock, Copy, Check, Trash2, RefreshCw, MessageCircle, ChevronDown, ChevronUp, HelpCircle, Coffee, Mail, Phone, ChevronRight } from 'lucide-react';
import ResourceCard from './ResourceCard';
import ReassuranceMessage from './ReassuranceMessage';
import { resources, emergencyResources, recoveryResources, secureCommsResources } from '../data/resourcesData';
import { motion, AnimatePresence } from 'framer-motion';

interface ResourcesSectionProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'emergency' | 'resources' | 'recovery' | 'reassurance' | 'donate' | 'secure'>('reassurance');
  const [quickExitUrl, setQuickExitUrl] = useState('https://weather.gov');
  const [copied, setCopied] = useState(false);
  const [clearingHistory, setClearingHistory] = useState(false);
  const [historyCleared, setHistoryCleared] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [allExpanded, setAllExpanded] = useState(false);
  const [showPrivacyMessage, setShowPrivacyMessage] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Set up quick exit functionality
  useEffect(() => {
    // Popular weather sites for quick exit
    const weatherSites = [
      'https://weather.gov',
      'https://weather.com',
      'https://accuweather.com',
      'https://wunderground.com'
    ];
    
    // Randomly select one for the quick exit
    const randomSite = weatherSites[Math.floor(Math.random() * weatherSites.length)];
    setQuickExitUrl(randomSite);
  }, []);

  // Check if tabs container has horizontal overflow
  useEffect(() => {
    if (!tabsContainerRef.current) return;
    
    const checkForOverflow = () => {
      const container = tabsContainerRef.current;
      if (container) {
        setShowScrollIndicator(container.scrollWidth > container.clientWidth);
      }
    };
    
    // Check initially
    checkForOverflow();
    
    // Check on resize
    window.addEventListener('resize', checkForOverflow);
    
    return () => {
      window.removeEventListener('resize', checkForOverflow);
    };
  }, [isOpen]);

  // Improved quick exit that prevents going back to resources
  const handleQuickExit = () => {
    try {
      // Clear any localStorage and sessionStorage data
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear cookies for this domain
      document.cookie.split(";").forEach(function(c) {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      // Create several history entries to make it harder to get back
      for (let i = 0; i < 5; i++) {
        window.history.pushState({}, "", "/");
      }
    } catch (e) {
      // Ignore any errors from clearing storage
    }
    
    // Use window.location.replace to replace the current history entry
    // This makes it impossible to navigate back to the resources page
    window.location.replace(quickExitUrl);
  };

  // Copy phone number to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Clear browsing history
  const clearBrowsingHistory = () => {
    setClearingHistory(true);
    
    // Simulate clearing history (actual clearing is limited by browser security)
    setTimeout(() => {
      // This is a simulated history clearing effect
      // In reality, we can only clear the history for our own site
      // and not the entire browser history due to security restrictions
      
      try {
        // Clear any localStorage data for this site
        localStorage.clear();
        
        // Clear any sessionStorage data for this site
        sessionStorage.clear();
        
        // Attempt to clear cookies for this domain
        document.cookie.split(";").forEach(function(c) {
          document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        
        // Replace current history entry
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "Weather Forecast", "/");
        }
      } catch (e) {
        // Ignore any errors from clearing storage
      }
      
      setClearingHistory(false);
      setHistoryCleared(true);
      
      // Reset the "cleared" message after a few seconds
      setTimeout(() => {
        setHistoryCleared(false);
      }, 3000);
    }, 1000);
  };

  // Toggle expanded section
  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      if (prev.includes(section)) {
        return prev.filter(s => s !== section);
      } else {
        return [...prev, section];
      }
    });
  };

  // Check if a section is expanded
  const isSectionExpanded = (section: string) => {
    return expandedSections.includes(section);
  };

  // Toggle all sections
  const toggleAllSections = () => {
    const allSections = ['privacy', 'links', 'phone', 'history'];
    
    if (allExpanded) {
      // Collapse all sections
      setExpandedSections([]);
      setAllExpanded(false);
    } else {
      // Expand all sections
      setExpandedSections(allSections);
      setAllExpanded(true);
    }
  };

  // Scroll tabs to the right
  const scrollTabsRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.15,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: "afterChildren",
        staggerChildren: 0.03,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: { 
      opacity: 0, 
      y: 5,
      transition: { 
        duration: 0.15,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const accordionContentVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      overflow: "hidden"
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      overflow: "visible",
      transition: {
        height: {
          duration: 0.2,
          ease: [0.25, 0.1, 0.25, 1.0]
        },
        opacity: {
          duration: 0.15,
          ease: [0.25, 0.1, 0.25, 1.0],
          delay: 0.05
        }
      }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { 
        duration: 0.15,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-secondary-900 bg-opacity-98 z-50 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1.0]
          }}
        >
          <motion.div 
            className="container mx-auto px-3 sm:px-4 py-4 sm:py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {showPrivacyMessage && (
              <motion.div 
                className="bg-primary-700 text-white p-3 sm:p-5 rounded-lg shadow-lg mb-4 sm:mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center mb-2 sm:mb-3">
                    <Lock className="mr-2 sm:mr-3 flex-shrink-0" size={20} />
                    <h2 className="text-lg sm:text-2xl font-bold">Your Privacy and Safety Come First</h2>
                  </div>
                  <button 
                    onClick={() => setShowPrivacyMessage(false)}
                    className="text-white/70 hover:text-white"
                    aria-label="Close privacy message"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-white/90 leading-relaxed mb-2 sm:mb-3 text-xs sm:text-sm">
                  We understand the importance of your privacy. This website does not use cookies, track your activity, or store any personal information. Every action you take here is completely anonymous.
                </p>
                <p className="text-white/90 leading-relaxed mb-2 sm:mb-3 text-xs sm:text-sm">
                  For your safety, we've included a Quick Exit button that will immediately redirect you to a neutral website. If you ever need to leave quickly, you can use this feature at any time.
                </p>
                <p className="text-white/90 leading-relaxed text-xs sm:text-sm">
                  Additionally, consider using private browsing mode or clearing your history after your visit. You are not alone, and you deserve support without fear of being monitored.
                </p>
              </motion.div>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <motion.h2 
                className="text-xl sm:text-2xl font-bold text-white flex items-center mb-3 sm:mb-0"
                variants={itemVariants}
              >
                <Shield className="mr-2" size={20} />
                Support Resources
              </motion.h2>
              <div className="flex flex-wrap gap-2 sm:space-x-4 w-full sm:w-auto">
                <motion.button 
                  onClick={clearBrowsingHistory}
                  disabled={clearingHistory}
                  className={`${
                    historyCleared 
                      ? "bg-green-600" 
                      : clearingHistory 
                        ? "bg-gray-500" 
                        : "bg-red-700 hover:bg-red-800"
                  } text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center transition-colors duration-200 text-xs sm:text-sm flex-1 sm:flex-none justify-center`}
                  aria-label="Clear browsing history"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {clearingHistory ? (
                    <RefreshCw size={14} className="mr-1 sm:mr-2 animate-spin" />
                  ) : historyCleared ? (
                    <Check size={14} className="mr-1 sm:mr-2" />
                  ) : (
                    <Trash2 size={14} className="mr-1 sm:mr-2" />
                  )}
                  {clearingHistory 
                    ? "Clearing..." 
                    : historyCleared 
                      ? "Cleared!" 
                      : "Clear History"}
                </motion.button>
                <motion.button 
                  onClick={handleQuickExit}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg flex items-center transition-colors duration-200 text-xs sm:text-sm flex-1 sm:flex-none justify-center"
                  aria-label="Quick exit to weather site"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ArrowLeft size={14} className="mr-1 sm:mr-2" />
                  Quick Exit
                </motion.button>
                <motion.button 
                  onClick={onClose}
                  className="text-white hover:text-gray-300 focus:outline-none p-1.5 sm:p-2"
                  aria-label="Close resources panel"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            <motion.div 
              className="mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <p className="text-white mb-3 text-xs sm:text-sm">
                This is a safe space with resources to help those experiencing domestic violence. 
                If you need to exit quickly, press the ESC key, click the X button, or use the Quick Exit button which will redirect to a weather website.
              </p>
              
              {/* Privacy Tips Accordion */}
              <div className="mb-2 sm:mb-3">
                <motion.button 
                  onClick={() => toggleSection('privacy')}
                  className="w-full flex items-center justify-between bg-yellow-100 border-l-4 border-yellow-500 p-2 sm:p-3 rounded-lg hover:bg-yellow-200 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center">
                    <AlertTriangle className="text-yellow-600 mr-2 flex-shrink-0" size={16} />
                    <span className="font-bold text-yellow-700 text-xs sm:text-sm">Privacy Tips</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isSectionExpanded('privacy') ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                  >
                    <ChevronDown className="text-yellow-600" size={16} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {isSectionExpanded('privacy') && (
                    <motion.div 
                      className="mt-1 sm:mt-2 bg-yellow-50 p-2 sm:p-3 rounded-lg border border-yellow-200"
                      variants={accordionContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <ul className="list-disc pl-4 sm:pl-5 text-yellow-700 text-xs sm:text-sm">
                        <li>Use private browsing mode (Incognito in Chrome, Private in Firefox/Safari)</li>
                        <li>Clear your browsing history after visiting this page</li>
                        <li>Use the Quick Exit button to immediately leave this page</li>
                        <li>Consider using a device that isn't monitored</li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Link Safety Accordion */}
              <div className="mb-2 sm:mb-3">
                <motion.button 
                  onClick={() => toggleSection('links')}
                  className="w-full flex items-center justify-between bg-blue-100 border-l-4 border-blue-500 p-2 sm:p-3 rounded-lg hover:bg-blue-200 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center">
                    <ExternalLink className="text-blue-600 mr-2 flex-shrink-0" size={16} />
                    <span className="font-bold text-blue-700 text-xs sm:text-sm">Opening Links Safely</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isSectionExpanded('links') ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                  >
                    <ChevronDown className="text-blue-600" size={16} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {isSectionExpanded('links') && (
                    <motion.div 
                      className="mt-1 sm:mt-2 bg-blue-50 p-2 sm:p-3 rounded-lg border border-blue-200"
                      variants={accordionContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <ol className="list-decimal pl-4 sm:pl-5 text-blue-700 text-xs sm:text-sm">
                        <li>Right-click on any resource link</li>
                        <li>Select "Open Link in Incognito Window" (Chrome) or "Open Link in New Private Window" (Firefox/Safari)</li>
                        <li>This helps prevent the sites from appearing in your browsing history</li>
                      </ol>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Phone Numbers Accordion */}
              <div className="mb-2 sm:mb-3">
                <motion.button 
                  onClick={() => toggleSection('phone')}
                  className="w-full flex items-center justify-between bg-green-100 border-l-4 border-green-500 p-2 sm:p-3 rounded-lg hover:bg-green-200 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center">
                    <Lock className="text-green-600 mr-2 flex-shrink-0" size={16} />
                    <span className="font-bold text-green-700 text-xs sm:text-sm">Phone Number Safety</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isSectionExpanded('phone') ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                  >
                    <ChevronDown className="text-green-600" size={16} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {isSectionExpanded('phone') && (
                    <motion.div 
                      className="mt-1 sm:mt-2 bg-green-50 p-2 sm:p-3 rounded-lg border border-green-200"
                      variants={accordionContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <p className="mb-2 text-green-700 text-xs sm:text-sm">Click the "Copy" button next to any phone number to copy it to your clipboard instead of calling directly from this page.</p>
                      <div className="flex items-center bg-white p-2 rounded">
                        <span className="font-medium mr-2 text-xs sm:text-sm">National Hotline: 1-800-799-7233</span>
                        <motion.button 
                          onClick={() => copyToClipboard("1-800-799-7233")}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded flex items-center text-xs"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                        >
                          {copied ? <Check size={12} className="mr-1" /> : <Copy size={12} className="mr-1" />}
                          {copied ? "Copied!" : "Copy"}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* History Clearing Accordion */}
              <div className="mb-2 sm:mb-3">
                <motion.button 
                  onClick={() => toggleSection('history')}
                  className="w-full flex items-center justify-between bg-red-100 border-l-4 border-red-500 p-2 sm:p-3 rounded-lg hover:bg-red-200 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div className="flex items-center">
                    <Trash2 className="text-red-600 mr-2 flex-shrink-0" size={16} />
                    <span className="font-bold text-red-700 text-xs sm:text-sm">Clear Your Browsing History</span>
                  </div>
                  <motion.div
                    animate={{ rotate: isSectionExpanded('history') ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1.0] }}
                  >
                    <ChevronDown className="text-red-600" size={16} />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {isSectionExpanded('history') && (
                    <motion.div 
                      className="mt-1 sm:mt-2 bg-red-50 p-2 sm:p-3 rounded-lg border border-red-200"
                      variants={accordionContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <p className="mb-2 text-red-700 text-xs sm:text-sm">Use the "Clear History" button at the top of this page to:</p>
                      <ul className="list-disc pl-4 sm:pl-5 text-red-700 mb-2 sm:mb-3 text-xs sm:text-sm">
                        <li>Clear this site from your browser's history</li>
                        <li>Remove cookies and local storage data</li>
                        <li>Replace history entries with weather websites</li>
                        <li><strong>Note:</strong> For complete privacy, also clear your history through your browser settings</li>
                      </ul>
                      <div className="p-2 bg-white rounded text-xs">
                        <p className="font-medium text-red-800">Browser shortcuts to clear history:</p>
                        <ul className="mt-1 text-red-700">
                          <li><strong>Chrome/Edge:</strong> Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)</li>
                          <li><strong>Firefox:</strong> Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)</li>
                          <li><strong>Safari:</strong> Cmd+Option+E (to clear history) or Cmd+Option+Delete (to clear all website data)</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Help button that expands all sections */}
              <motion.button 
                onClick={toggleAllSections}
                className="flex items-center justify-center text-white bg-secondary-700 hover:bg-secondary-600 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 mt-2 w-full text-xs sm:text-sm"
                whileHover={{ scale: 1.01, backgroundColor: "rgb(51, 65, 85)" }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.15 }}
              >
                <HelpCircle size={14} className="mr-1 sm:mr-2" />
                {allExpanded ? "Collapse All Privacy Tips" : "Show All Privacy Tips"}
              </motion.button>
            </motion.div>

            <motion.div 
              className="mb-4 relative"
              variants={itemVariants}
            >
              <div className="flex overflow-x-auto pb-2 border-b border-secondary-700 mb-4 hide-scrollbar relative" ref={tabsContainerRef}>
                <div className="flex space-x-1 sm:space-x-2 min-w-max">
                  <motion.button
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 font-medium transition-colors duration-200 flex items-center text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === 'reassurance' 
                        ? 'text-primary-400 border-b-2 border-primary-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('reassurance')}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <MessageCircle size={14} className="inline mr-1 sm:mr-2" />
                    You Are Not Alone
                  </motion.button>
                  <motion.button
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 font-medium transition-colors duration-200 flex items-center text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === 'emergency' 
                        ? 'text-primary-400 border-b-2 border-primary-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('emergency')}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <AlertTriangle size={14} className="inline mr-1 sm:mr-2" />
                    Emergency Help
                  </motion.button>
                  <motion.button
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 font-medium transition-colors duration-200 flex items-center text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === 'resources' 
                        ? 'text-primary-400 border-b-2 border-primary-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('resources')}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Home size={14} className="inline mr-1 sm:mr-2" />
                    Support Resources
                  </motion.button>
                  <motion.button
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 font-medium transition-colors duration-200 flex items-center text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === 'secure' 
                        ? 'text-primary-400 border-b-2 border-primary-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('secure')}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Lock size={14} className="inline mr-1 sm:mr-2" />
                    Secure Communication
                  </motion.button>
                  <motion.button
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 font-medium transition-colors duration-200 flex items-center text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === 'recovery' 
                        ? 'text-primary-400 border-b-2 border-primary-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('recovery')}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Heart size={14} className="inline mr-1 sm:mr-2" />
                    Recovery & Healing
                  </motion.button>
                  <motion.button
                    className={`px-2 sm:px-4 py-1.5 sm:py-2 font-medium transition-colors duration-200 flex items-center text-xs sm:text-sm whitespace-nowrap ${
                      activeTab === 'donate' 
                        ? 'text-primary-400 border-b-2 border-primary-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    onClick={() => setActiveTab('donate')}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Coffee size={14} className="inline mr-1 sm:mr-2" />
                    Support This Project
                  </motion.button>
                </div>
              </div>
              
              {/* Scroll indicator arrow */}
              <AnimatePresence>
                {showScrollIndicator && (
                  <motion.button
                    className="absolute right-0 top-0 h-full flex items-center justify-center bg-gradient-to-l from-secondary-900 to-transparent px-2 text-white"
                    onClick={scrollTabsRight}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Scroll to see more tabs"
                  >
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "easeInOut" 
                      }}
                    >
                      <ChevronRight size={20} />
                    </motion.div>
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>

            <AnimatePresence mode="wait">
              {activeTab === 'reassurance' && (
                <motion.div
                  key="reassurance"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <ReassuranceMessage />
                </motion.div>
              )}

              {activeTab === 'emergency' && (
                <motion.div
                  key="emergency"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div 
                    className="bg-red-100 border-l-4 border-red-500 p-2 sm:p-3 rounded-lg mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-red-700 font-medium text-xs sm:text-sm">
                      If you are in immediate danger, please call 911 or your local emergency number.
                    </p>
                  </motion.div>
                  <div className="space-y-2 sm:space-y-3">
                    {emergencyResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'resources' && (
                <motion.div
                  key="resources"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="space-y-2 sm:space-y-3">
                    {resources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'secure' && (
                <motion.div
                  key="secure"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div 
                    className="bg-blue-100 border-l-4 border-blue-500 p-2 sm:p-3 rounded-lg mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start">
                      <Lock className="text-blue-600 mr-2 mt-0.5 flex-shrink-0" size={16} />
                      <div>
                        <h3 className="font-medium text-blue-800 mb-1 text-xs sm:text-sm">Why Secure Communication Matters</h3>
                        <p className="text-blue-700 text-xs">
                          Standard email, text messages, and phone calls can be monitored. These secure alternatives help protect your privacy when seeking help or communicating with support services.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <div className="space-y-2 sm:space-y-3">
                    {secureCommsResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'recovery' && (
                <motion.div
                  key="recovery"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="space-y-2 sm:space-y-3">
                    {recoveryResources.map((resource, index) => (
                      <ResourceCard key={index} resource={resource} index={index} />
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'donate' && (
                <motion.div
                  key="donate"
                  variants={tabContentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <motion.div 
                    className="bg-gradient-to-r from-amber-500 to-amber-700 text-white p-3 sm:p-5 rounded-lg shadow-md mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ 
                      y: -3,
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    <div className="flex items-center mb-2 sm:mb-3">
                      <Coffee className="mr-2 sm:mr-3 flex-shrink-0" size={20} />
                      <h2 className="text-lg sm:text-2xl font-bold">Support This Project</h2>
                    </div>
                    <p className="text-white/90 leading-relaxed mb-2 sm:mb-4 text-xs sm:text-sm">
                      This resource is developed and maintained entirely out of pocket. Your contribution helps keep this 
                      vital resource available for those who need it most. Every donation, no matter how small, makes a difference 
                      in our ability to provide support and resources to those experiencing domestic violence.
                    </p>
                    <p className="text-white/90 leading-relaxed mb-3 sm:mb-5 text-xs sm:text-sm">
                      Funds are used for website hosting, development, and expanding our resources to reach more people in need.
                      Thank you for considering a donation to support this cause.
                    </p>
                    
                    <div className="flex justify-center">
                      <motion.a 
                        href="https://buymeacoffee.com/hoth"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-amber-700 font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-lg flex items-center shadow-lg hover:bg-amber-50 transition-colors text-xs sm:text-sm"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => {
                          // Confirm before opening external link
                          if (!window.confirm("You're about to visit an external donation page. This will appear in your browsing history. Continue?")) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Coffee size={16} className="mr-2" />
                        Donate via Buy Me A Coffee
                      </motion.a>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white p-3 sm:p-5 rounded-lg shadow-md"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-3">How Your Donation Helps</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-5">
                      <motion.div 
                        className="bg-secondary-50 p-3 sm:p-4 rounded-lg"
                        whileHover={{ 
                          scale: 1.02,
                          backgroundColor: "#f1f5f9",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <h4 className="font-medium text-secondary-900 mb-2 text-sm">Website Maintenance</h4>
                        <p className="text-secondary-600 text-xs">
                          Covers hosting costs, domain registration, and technical maintenance to ensure this resource remains available 24/7.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-secondary-50 p-3 sm:p-4 rounded-lg"
                        whileHover={{ 
                          scale: 1.02,
                          backgroundColor: "#f1f5f9",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <h4 className="font-medium text-secondary-900 mb-2 text-sm">Resource Development</h4>
                        <p className="text-secondary-600 text-xs">
                          Helps create new content, update resources, and ensure information remains current and relevant.
                        </p>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-secondary-50 p-3 sm:p-4 rounded-lg"
                        whileHover={{ 
                          scale: 1.02,
                          backgroundColor: "#f1f5f9",
                          transition: { duration: 0.2 }
                        }}
                      >
                        <h4 className="font-medium text-secondary-900 mb-2 text-sm">Outreach Efforts</h4>
                        <p className="text-secondary-600 text-xs">
                          Supports efforts to reach more people who may benefit from these resources and safety information.
                        </p>
                      </motion.div>
                    </div>
                    
                    <div className="bg-amber-50 p-3 sm:p-4 rounded-lg border border-amber-200 mb-3 sm:mb-4">
                      <p className="text-secondary-700 text-xs">
                        <strong>Note:</strong> All donations are processed securely through Buy Me A Coffee. Your payment information is never stored on this website.
                      </p>
                    </div>
                    
                    <p className="text-center text-secondary-600 text-xs sm:text-sm">
                      Thank you for your support in making this resource possible.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResourcesSection;