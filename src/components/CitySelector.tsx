import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CitySelectorProps {
  cities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({ cities, selectedCity, onCityChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const filteredCities = searchQuery 
    ? cities.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
    : cities;
    
  const handleCitySelect = (city: string) => {
    onCityChange(city);
    setIsOpen(false);
    setSearchQuery('');
  };
  
  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <motion.div 
      className="mb-4 sm:mb-6 relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-2">
        <MapPin size={14} className="text-primary-500 mr-2" />
        <label htmlFor="city-select" className="text-xs sm:text-sm font-medium text-secondary-700">
          Current Location
        </label>
      </div>
      
      <motion.button
        onClick={toggleDropdown}
        className="relative w-full px-3 sm:px-4 py-2 sm:py-3 bg-white border border-secondary-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-left flex items-center justify-between"
        whileHover={{ backgroundColor: "#f8fafc" }}
        whileTap={{ scale: 0.995 }}
      >
        <div className="flex items-center">
          <MapPin className="text-primary-500 mr-2" size={16} />
          <span className="text-secondary-900 font-medium text-sm sm:text-base">{selectedCity}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="text-secondary-500" size={16} />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-white border border-secondary-200 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-2 border-b border-secondary-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={14} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locations..."
                  className="w-full pl-8 pr-8 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-500 text-xs sm:text-sm"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="max-h-48 sm:max-h-60 overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <motion.button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={`w-full text-left px-3 sm:px-4 py-2 hover:bg-secondary-50 flex items-center ${
                      selectedCity === city ? 'bg-primary-50 text-primary-700' : 'text-secondary-900'
                    }`}
                    whileHover={{ backgroundColor: "#f1f5f9" }}
                  >
                    <MapPin 
                      size={14} 
                      className={selectedCity === city ? 'text-primary-500 mr-2' : 'text-secondary-400 mr-2'} 
                    />
                    <span className="text-xs sm:text-sm">{city}</span>
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-3 text-secondary-500 text-center text-xs sm:text-sm">
                  No locations found
                </div>
              )}
            </div>
            
            <div className="p-2 border-t border-secondary-100 bg-secondary-50">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-2 text-center text-secondary-700 hover:text-secondary-900 text-xs sm:text-sm font-medium"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CitySelector;