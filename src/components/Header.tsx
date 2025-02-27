import React, { useState } from 'react';
import { Cloud, Search, Menu, X, MapPin, Bell, User, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would search for a location
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Cloud className="mr-2" size={24} />
            <h1 className="text-xl sm:text-2xl font-bold">WeatherCast</h1>
          </motion.div>
          
          <div className="hidden md:flex items-center">
            <motion.button
              onClick={toggleSearch}
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-full px-3 sm:px-4 py-1.5 mr-4 sm:mr-6 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Search size={16} className="text-white/70" />
              <span className="text-white/90 text-sm">Search locations...</span>
            </motion.button>
            
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div 
                  className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSearchOpen(false)}
                >
                  <motion.div 
                    className="bg-white rounded-lg shadow-xl w-full max-w-md p-4"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    onClick={e => e.stopPropagation()}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-base sm:text-lg font-semibold text-secondary-900">Search Location</h2>
                      <button 
                        onClick={() => setIsSearchOpen(false)}
                        className="text-secondary-500 hover:text-secondary-700"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={16} />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="City, state, or zip code"
                          className="w-full pl-9 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                          autoComplete="off"
                        />
                      </div>
                      
                      <div className="mt-4 flex justify-end">
                        <button
                          type="submit"
                          className="bg-primary-600 hover:bg-primary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors text-sm"
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    
                    <div className="mt-4">
                      <h3 className="text-xs sm:text-sm font-medium text-secondary-700 mb-2">Recent Searches</h3>
                      <div className="space-y-1 sm:space-y-2">
                        {['New York, NY', 'Los Angeles, CA', 'Chicago, IL'].map((location, index) => (
                          <button
                            key={index}
                            className="flex items-center w-full p-2 hover:bg-secondary-50 rounded-lg transition-colors"
                            onClick={() => {
                              setSearchQuery(location);
                              handleSearch(new Event('submit') as any);
                            }}
                          >
                            <MapPin size={14} className="text-secondary-400 mr-2" />
                            <span className="text-secondary-700 text-xs sm:text-sm">{location}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            <a href="#" className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">Home</a>
            <a href="#" className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">Radar</a>
            <a href="#" className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">Forecast</a>
            <a href="#" className="px-2 sm:px-3 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm trigger-word">Safety</a>
            <div className="flex items-center space-x-1 ml-2">
              <motion.button 
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell size={18} />
              </motion.button>
              <motion.button 
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Settings size={18} />
              </motion.button>
              <motion.button 
                className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User size={18} />
              </motion.button>
            </div>
          </nav>
          
          <button 
            className="md:hidden text-white p-1.5 sm:p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden py-3 sm:py-4 border-t border-white/10"
            >
              <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
                <Search size={16} className="text-white/70" />
                <input 
                  type="text" 
                  placeholder="Search location..." 
                  className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full text-sm"
                />
              </div>
              
              <nav className="flex flex-col space-y-1 sm:space-y-2">
                <a href="#" className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">Home</a>
                <a href="#" className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">Radar</a>
                <a href="#" className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">Forecast</a>
                <a href="#" className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm trigger-word">Safety</a>
                <a href="#" className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">Settings</a>
                <a href="#" className="px-3 sm:px-4 py-1.5 sm:py-2 hover:bg-white/10 rounded-lg transition-colors text-sm">Profile</a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;