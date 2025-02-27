import React, { useState } from 'react';
import { DayForecast } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Droplets, Wind, Thermometer } from 'lucide-react';

interface ForecastListProps {
  forecast: DayForecast[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const toggleDay = (index: number) => {
    if (expandedDay === index) {
      setExpandedDay(null);
    } else {
      setExpandedDay(index);
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <div className="text-yellow-500 text-xl sm:text-2xl">☀️</div>;
      case 'partly cloudy':
        return <div className="text-gray-500 text-xl sm:text-2xl">⛅</div>;
      case 'cloudy':
        return <div className="text-gray-500 text-xl sm:text-2xl">☁️</div>;
      case 'rainy':
        return <div className="text-blue-500 text-xl sm:text-2xl">🌧️</div>;
      case 'stormy':
        return <div className="text-gray-700 text-xl sm:text-2xl">⛈️</div>;
      case 'windy':
        return <div className="text-gray-500 text-xl sm:text-2xl">💨</div>;
      case 'snowy':
        return <div className="text-blue-300 text-xl sm:text-2xl">❄️</div>;
      case 'foggy':
        return <div className="text-gray-400 text-xl sm:text-2xl">🌫️</div>;
      default:
        return <div className="text-gray-500 text-xl sm:text-2xl">☁️</div>;
    }
  };

  // Get weather description based on condition
  const getWeatherDescription = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return "Clear skies with abundant sunshine. UV index will be high during midday hours.";
      case 'partly cloudy':
        return "Mix of sun and clouds throughout the day. Pleasant conditions expected.";
      case 'cloudy':
        return "Mostly cloudy skies with occasional breaks. No precipitation expected.";
      case 'rainy':
        return "Periods of rain, occasionally heavy. Bring an umbrella and expect wet conditions.";
      case 'stormy':
        return "Thunderstorms likely with potential for lightning and gusty winds. Stay indoors when possible.";
      case 'windy':
        return "Strong winds expected throughout the day. Secure loose outdoor items.";
      case 'snowy':
        return "Snow showers expected. Roads may be slippery, so drive with caution.";
      case 'foggy':
        return "Reduced visibility due to fog. Use caution when driving and allow extra travel time.";
      default:
        return "Variable conditions throughout the day. Check back for updates.";
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0],
        duration: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const detailsVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-card mt-6 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      whileHover={{ 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3 }
      }}
    >
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-3 sm:p-4">
        <h2 className="text-lg sm:text-xl font-bold">5-Day Forecast</h2>
      </div>
      
      <div className="p-3 sm:p-4">
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {forecast.map((day, index) => (
            <motion.div 
              key={index} 
              className="bg-secondary-50 rounded-lg overflow-hidden"
              variants={item}
              whileHover={{ 
                y: -3, 
                backgroundColor: "#f8fafc",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                transition: { duration: 0.2 }
              }}
            >
              <motion.button 
                className="w-full p-3 sm:p-4 text-center flex flex-col items-center"
                onClick={() => toggleDay(index)}
              >
                <div className="font-medium text-secondary-900 mb-1 sm:mb-2 text-sm">{day.day}</div>
                <motion.div 
                  className="flex justify-center mb-1 sm:mb-2"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  {getWeatherIcon(day.condition)}
                </motion.div>
                <div className="text-xs sm:text-sm text-secondary-600 mb-2 sm:mb-3">{day.condition}</div>
                <div className="flex justify-center space-x-2 sm:space-x-3">
                  <span className="font-medium text-secondary-900 text-sm">{day.high}°</span>
                  <span className="text-secondary-500 text-sm">{day.low}°</span>
                </div>
                
                <motion.div 
                  className="mt-1 sm:mt-2 text-primary-600"
                  animate={{ rotate: expandedDay === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {expandedDay === index && (
                  <motion.div
                    variants={detailsVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-secondary-200 pt-2 sm:pt-3"
                  >
                    <div className="grid grid-cols-3 gap-2 mb-2 sm:mb-3">
                      <div className="flex flex-col items-center">
                        <Droplets size={12} className="text-blue-500 mb-1" />
                        <div className="text-xs text-secondary-500">Precip</div>
                        <div className="text-xs sm:text-sm font-medium">{day.precipChance || 0}%</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <Thermometer size={12} className="text-red-500 mb-1" />
                        <div className="text-xs text-secondary-500">Humidity</div>
                        <div className="text-xs sm:text-sm font-medium">{day.humidity || 0}%</div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <Wind size={12} className="text-gray-500 mb-1" />
                        <div className="text-xs text-secondary-500">Wind</div>
                        <div className="text-xs sm:text-sm font-medium">{day.windSpeed || 0} mph</div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-secondary-600 text-center">
                      {day.description || getWeatherDescription(day.condition)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ForecastList;