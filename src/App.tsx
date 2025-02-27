import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import CitySelector from './components/CitySelector';
import ResourcesSection from './components/ResourcesSection';
import { cities } from './data/weatherData';
import { WeatherData } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Umbrella, Thermometer, Wind, X, Info, Keyboard, MapPin, Cloud, Sun, Droplets } from 'lucide-react';
import { getFallbackWeatherData } from './services/weatherApi';

// Privacy-focused utility functions
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Error accessing localStorage');
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Error setting localStorage');
    }
  },
  removeItem: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Error removing from localStorage');
    }
  },
  clear: (): void => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage');
    }
  }
};

function App() {
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [showResources, setShowResources] = useState(false);
  const [showWelcomeBox, setShowWelcomeBox] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Track key sequence for alternative access method
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const secretCode = ['w', 'e', 'a', 't', 'h', 'e', 'r'];

  // Fetch weather data - now using simulated data only
  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Add a small delay to simulate network request for better UX
        setTimeout(() => {
          // Get simulated weather data
          const data = getFallbackWeatherData(selectedCity);
          setWeatherData(data);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error generating weather data:', err instanceof Error ? err.message : String(err));
        setIsLoading(false);
        setError('Unable to generate weather data. Please try again.');
      }
    };
    
    fetchWeatherData();
  }, [selectedCity]);

  // Check if this is the first visit - using memory only, not persistent storage
  useEffect(() => {
    const hasVisitedBefore = safeLocalStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShowWelcomeBox(true);
      // Use session-only flag instead of persistent storage
      safeLocalStorage.setItem('hasVisitedBefore', 'true');
      
      // Set up auto-cleanup of localStorage on page close
      window.addEventListener('beforeunload', () => {
        safeLocalStorage.clear();
      });
    }
    
    // Cleanup function to ensure privacy
    return () => {
      // Clear any stored data when component unmounts
      safeLocalStorage.clear();
    };
  }, []);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  // Handle double click on trigger words
  const handleDoubleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('trigger-word')) {
      setShowResources(true);
      // Change document title to weather-related when resources are shown
      document.title = "Local Weather Forecast";
    }
  };

  // Handle key sequence for alternative access
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the key to the sequence
      const updatedSequence = [...keySequence, e.key.toLowerCase()];
      
      // Keep only the last n keys where n is the length of the secret code
      if (updatedSequence.length > secretCode.length) {
        updatedSequence.shift();
      }
      
      setKeySequence(updatedSequence);
      
      // Check if the sequence matches the secret code
      if (updatedSequence.join('') === secretCode.join('')) {
        setShowResources(true);
        document.title = "Local Weather Forecast";
      }
      
      // Handle escape key to close resources section
      if (e.key === 'Escape' && showResources) {
        setShowResources(false);
        document.title = "Weather Forecast";
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keySequence, showResources]);

  // Reset title when resources are closed
  useEffect(() => {
    if (!showResources) {
      document.title = "Weather Forecast";
    }
    
    // Clean up any potential tracking when resources are closed
    if (!showResources) {
      // Clear any URL parameters
      if (window.history && window.history.replaceState) {
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    }
  }, [showResources]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const tipCardVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const welcomeBoxVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Loading skeleton component
  const WeatherSkeleton = () => (
    <div className="bg-white rounded-xl shadow-card animate-pulse">
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-24 rounded-t-xl"></div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0 w-full md:w-auto">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded-full"></div>
            <div className="ml-4">
              <div className="h-8 sm:h-10 bg-gray-300 w-20 sm:w-24 rounded"></div>
              <div className="h-4 sm:h-5 bg-gray-200 w-24 sm:w-32 rounded mt-2"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="bg-gray-200 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 w-7 h-7 sm:w-8 sm:h-8"></div>
                <div>
                  <div className="h-3 bg-gray-200 w-12 sm:w-16 rounded"></div>
                  <div className="h-4 bg-gray-300 w-8 sm:w-10 rounded mt-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ForecastSkeleton = () => (
    <div className="bg-white rounded-xl shadow-card mt-6 animate-pulse">
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 h-12 sm:h-14 rounded-t-xl"></div>
      <div className="p-3 sm:p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-3 sm:p-4">
              <div className="h-4 sm:h-5 bg-gray-300 w-16 sm:w-20 mx-auto rounded mb-2"></div>
              <div className="h-10 sm:h-12 w-10 sm:w-12 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-200 w-20 sm:w-24 mx-auto rounded mb-3"></div>
              <div className="flex justify-center space-x-3">
                <div className="h-4 sm:h-5 bg-gray-300 w-6 sm:w-8 rounded"></div>
                <div className="h-4 sm:h-5 bg-gray-200 w-6 sm:w-8 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Weather highlights section
  const WeatherHighlights = () => {
    if (!weatherData) return null;
    
    return (
      <motion.div 
        className="bg-white rounded-xl shadow-card p-4 sm:p-6 mb-6"
        variants={sectionVariants}
        whileHover={{ 
          boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.3 }
        }}
      >
        <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4">Today's Highlights</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <motion.div 
            className="bg-blue-50 p-3 sm:p-4 rounded-lg"
            whileHover={{ scale: 1.02, backgroundColor: "#e0f2fe" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <div className="bg-blue-100 p-1.5 sm:p-2 rounded-full">
                <Thermometer className="text-blue-600" size={16} />
              </div>
              <h3 className="ml-2 font-medium text-secondary-900 text-sm sm:text-base">Feels Like</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1">
              {weatherData.feelsLike || (weatherData.temperature - 2)}°
            </div>
            <p className="text-xs sm:text-sm text-secondary-600">
              {weatherData.feelsLike && weatherData.feelsLike < weatherData.temperature 
                ? "Feels cooler than actual temperature" 
                : weatherData.feelsLike && weatherData.feelsLike > weatherData.temperature
                  ? "Feels warmer than actual temperature"
                  : "Similar to actual temperature"}
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-yellow-50 p-3 sm:p-4 rounded-lg"
            whileHover={{ scale: 1.02, backgroundColor: "#fef9c3" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <div className="bg-yellow-100 p-1.5 sm:p-2 rounded-full">
                <Sun className="text-yellow-600" size={16} />
              </div>
              <h3 className="ml-2 font-medium text-secondary-900 text-sm sm:text-base">UV Index</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1">
              {weatherData.uvIndex || 5}
            </div>
            <p className="text-xs sm:text-sm text-secondary-600">
              {weatherData.uvIndex && weatherData.uvIndex > 7 
                ? "Very high - protection needed" 
                : weatherData.uvIndex && weatherData.uvIndex > 5
                  ? "High - protection recommended"
                  : weatherData.uvIndex && weatherData.uvIndex > 2
                    ? "Moderate - some protection needed"
                    : "Low - minimal protection needed"}
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-green-50 p-3 sm:p-4 rounded-lg"
            whileHover={{ scale: 1.02, backgroundColor: "#dcfce7" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <div className="bg-green-100 p-1.5 sm:p-2 rounded-full">
                <Wind className="text-green-600" size={16} />
              </div>
              <h3 className="ml-2 font-medium text-secondary-900 text-sm sm:text-base">Wind</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1">
              {weatherData.windSpeed} <span className="text-base sm:text-lg font-normal">mph</span>
            </div>
            <p className="text-xs sm:text-sm text-secondary-600">
              {weatherData.windDirection || 'NE'} direction
              {weatherData.windSpeed > 15 
                ? " - Strong winds" 
                : weatherData.windSpeed > 8
                  ? " - Moderate breeze"
                  : " - Light breeze"}
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-purple-50 p-3 sm:p-4 rounded-lg"
            whileHover={{ scale: 1.02, backgroundColor: "#f3e8ff" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center mb-2 sm:mb-3">
              <div className="bg-purple-100 p-1.5 sm:p-2 rounded-full">
                <Droplets className="text-purple-600" size={16} />
              </div>
              <h3 className="ml-2 font-medium text-secondary-900 text-sm sm:text-base">Humidity</h3>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-1">
              {weatherData.humidity}%
            </div>
            <p className="text-xs sm:text-sm text-secondary-600">
              {weatherData.humidity > 70 
                ? "High humidity - feels muggy" 
                : weatherData.humidity > 40
                  ? "Comfortable humidity level"
                  : "Low humidity - dry air"}
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  };

  // Local radar section
  const LocalRadar = () => {
    return (
      <motion.div 
        className="bg-white rounded-xl shadow-card p-4 sm:p-6 mb-6"
        variants={sectionVariants}
        whileHover={{ 
          boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          transition: { duration: 0.3 }
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900">Local Radar</h2>
          <button className="text-primary-600 hover:text-primary-800 text-xs sm:text-sm font-medium">View Full Map</button>
        </div>
        
        <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '250px', maxHeight: '300px' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <MapPin className="mx-auto text-primary-500 mb-2" size={24} />
              <p className="text-secondary-600 font-medium">{selectedCity}</p>
              <p className="text-secondary-500 text-xs sm:text-sm mt-2">Interactive radar map available in premium version</p>
              <button className="mt-3 sm:mt-4 bg-primary-600 hover:bg-primary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                Upgrade to Premium
              </button>
            </div>
          </div>
          
          {/* Simulated radar map with gradient overlay */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-blue-300 via-green-200 to-yellow-100"></div>
          
          {/* Simulated radar controls */}
          <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-white/90 rounded-lg p-1.5 sm:p-2 flex space-x-1 sm:space-x-2">
            <button className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-secondary-700">
              -
            </button>
            <button className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 hover:bg-gray-300 rounded flex items-center justify-center text-secondary-700">
              +
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      className="min-h-screen bg-secondary-50 flex flex-col font-sans" 
      onDoubleClick={handleDoubleClick}
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <Header />
      
      <main className="flex-grow container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <AnimatePresence>
          {showWelcomeBox && (
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 sm:mb-8 border-l-4 border-primary-500 relative"
              variants={welcomeBoxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button 
                onClick={() => setShowWelcomeBox(false)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 text-secondary-400 hover:text-secondary-600 transition-colors"
                aria-label="Close welcome message"
              >
                <X size={20} />
              </button>
              
              <div className="flex items-start mb-3 sm:mb-4">
                <div className="bg-primary-100 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3 flex-shrink-0">
                  <Info className="text-primary-600" size={20} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-1 sm:mb-2">Welcome to WeatherCast</h2>
                  <p className="text-secondary-600 text-sm sm:text-base mb-2 sm:mb-3">
                    This site includes hidden resources for those who may need help. Here's how to access them:
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-3 sm:mb-4">
                <div className="bg-secondary-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Keyboard className="text-primary-500 mr-2" size={16} />
                    <h3 className="font-medium text-secondary-900 text-sm sm:text-base">Keyboard Access</h3>
                  </div>
                  <p className="text-secondary-600 text-xs sm:text-sm mb-2">
                    Type the word "weather" to access hidden resources.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {secretCode.map((key, index) => (
                      <div key={index} className="bg-white border border-secondary-200 rounded px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-medium text-secondary-700 uppercase">
                        {key}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-secondary-50 p-3 sm:p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="text-primary-500 mr-2" size={16} />
                    <h3 className="font-medium text-secondary-900 text-sm sm:text-base">Quick Exit</h3>
                  </div>
                  <p className="text-secondary-600 text-xs sm:text-sm">
                    When in the resources section, you can:
                  </p>
                  <ul className="text-secondary-600 text-xs sm:text-sm list-disc pl-4 sm:pl-5 mt-1">
                    <li>Press ESC key to close the resources</li>
                    <li>Click "Quick Exit" to immediately go to a weather website</li>
                    <li>Click "Clear History" to remove traces of your visit</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-primary-50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="bg-primary-100 p-1 rounded-full mr-2">
                    <Info className="text-primary-600" size={14} />
                  </div>
                  <h3 className="font-medium text-secondary-900 text-sm sm:text-base">Double-Click Access</h3>
                </div>
                <p className="text-secondary-600 text-xs sm:text-sm">
                  Double-click on any text containing the word "Safety" or "Support" to open the resources panel.
                  These trigger words can be found in the navigation menu, footer, and safety tips section.
                </p>
              </div>
              
              <div className="mt-3 sm:mt-4 flex justify-end">
                <motion.button
                  onClick={() => setShowWelcomeBox(false)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Got it
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="mb-6 sm:mb-8"
          variants={sectionVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-secondary-900 mb-2 md:mb-0">Current Weather</h2>
            <div className="flex items-center text-xs sm:text-sm text-secondary-600">
              <Cloud className="mr-1 text-primary-500" size={14} />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <CitySelector 
            cities={cities} 
            selectedCity={selectedCity} 
            onCityChange={handleCityChange} 
          />
          
          {error && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-4 text-amber-800 text-sm">
              <div className="flex">
                <AlertTriangle className="text-amber-500 mr-2 flex-shrink-0" size={16} />
                <p>{error}</p>
              </div>
            </div>
          )}
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <WeatherSkeleton />
                <ForecastSkeleton />
              </motion.div>
            ) : weatherData && (
              <motion.div
                key={selectedCity}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <WeatherCard data={weatherData} />
                <WeatherHighlights />
                <LocalRadar />
                <ForecastList forecast={weatherData.forecast} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <motion.div 
          className="bg-white rounded-xl shadow-card p-4 sm:p-6 mb-6"
          variants={sectionVariants}
          whileHover={{ 
            boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { duration: 0.3 }
          }}
        >
          <h2 className="text-lg sm:text-xl font-bold text-secondary-900 mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-primary-500" size={18} />
            Weather <span className="trigger-word ml-1">Safety</span> Tips
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
            <motion.div 
              className="bg-blue-50 p-3 sm:p-4 rounded-lg"
              variants={tipCardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-2 sm:mb-3">
                <motion.div 
                  className="bg-blue-100 p-1.5 sm:p-2 rounded-full"
                  whileHover={{ scale: 1.1, backgroundColor: "#bae6fd" }}
                  transition={{ duration: 0.2 }}
                >
                  <Umbrella className="text-primary-500" size={16} />
                </motion.div>
                <h3 className="ml-2 font-medium text-secondary-900 text-sm sm:text-base">Storm Safety</h3>
              </div>
              <ul className="space-y-1 sm:space-y-2 text-secondary-700 text-xs sm:text-sm">
                <li>Stay indoors during thunderstorms</li>
                <li>Avoid open fields and tall trees</li>
                <li>Keep away from water and metal objects</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-red-50 p-3 sm:p-4 rounded-lg"
              variants={tipCardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-2 sm:mb-3">
                <motion.div 
                  className="bg-red-100 p-1.5 sm:p-2 rounded-full"
                  whileHover={{ scale: 1.1, backgroundColor: "#fee2e2" }}
                  transition={{ duration: 0.2 }}
                >
                  <Thermometer className="text-red-500" size={16} />
                </motion.div>
                <h3 className="ml-2 font-medium text-secondary-900 text-sm sm:text-base">Heat Safety</h3>
              </div>
              <ul className="space-y-1 sm:space-y-2 text-secondary-700 text-xs sm:text-sm">
                <li>Stay hydrated during extreme heat</li>
                <li>Limit outdoor activities to early morning or evening</li>
                <li>Wear lightweight, light-colored clothing</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 p-3 sm:p-4 rounded-lg"
              variants={tipCardVariants}
              whileHover="hover"
            >
              <div className="flex items-center mb-2 sm:mb-3">
                <motion.div 
                  className="bg-gray-100 p-1.5 sm:p-2 rounded-full"
                  whileHover={{ scale: 1.1, backgroundColor: "#f3f4f6" }}
                  transition={{ duration: 0.2 }}
                >
                  <Wind className="text-gray-500" size={16} />
                </motion.div>
                <h3 className="ml-2 font-medium text-secondary-900 text-sm sm:text-base">Emergency Prep</h3>
              </div>
              <ul className="space-y-1 sm:space-y-2 text-secondary-700 text-xs sm:text-sm">
                <li>Keep emergency supplies readily available</li>
                <li>Create a family emergency plan</li>
                <li>Stay informed through local news or weather apps</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
      
      <ResourcesSection isOpen={showResources} onClose={() => setShowResources(false)} />
    </motion.div>
  );
}

export default App;