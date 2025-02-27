import React, { useState } from 'react';
import { Cloud, Droplets, Wind, Thermometer, Compass, MapPin, Clock, Sunrise, Sunset, AlertCircle } from 'lucide-react';
import { WeatherData } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <div className="text-yellow-500 text-4xl sm:text-6xl">☀️</div>;
      case 'partly cloudy':
        return <div className="text-gray-500 text-4xl sm:text-6xl">⛅</div>;
      case 'cloudy':
        return <Cloud className="text-gray-500" size={48} />;
      case 'rainy':
        return <div className="text-blue-500 text-4xl sm:text-6xl">🌧️</div>;
      case 'stormy':
        return <div className="text-gray-700 text-4xl sm:text-6xl">⛈️</div>;
      case 'windy':
        return <Wind className="text-gray-500" size={48} />;
      case 'snowy':
        return <div className="text-blue-300 text-4xl sm:text-6xl">❄️</div>;
      case 'foggy':
        return <div className="text-gray-400 text-4xl sm:text-6xl">🌫️</div>;
      default:
        return <Cloud className="text-gray-500" size={48} />;
    }
  };

  // Get time of day for dynamic background
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 8) return 'dawn';
    if (hour >= 8 && hour < 18) return 'day';
    if (hour >= 18 && hour < 21) return 'dusk';
    return 'night';
  };

  // Get background gradient based on time and weather
  const getBackgroundGradient = () => {
    const timeOfDay = getTimeOfDay();
    const condition = data.condition.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('storm')) {
      return 'bg-gradient-to-r from-gray-700 to-gray-900';
    }
    
    if (condition.includes('snow')) {
      return 'bg-gradient-to-r from-blue-100 to-blue-300';
    }
    
    if (condition.includes('fog')) {
      return 'bg-gradient-to-r from-gray-300 to-gray-500';
    }
    
    switch (timeOfDay) {
      case 'dawn':
        return 'bg-gradient-to-r from-pink-500 to-orange-400';
      case 'day':
        if (condition.includes('cloud')) {
          return 'bg-gradient-to-r from-blue-400 to-blue-600';
        }
        return 'bg-gradient-to-r from-blue-500 to-blue-700';
      case 'dusk':
        return 'bg-gradient-to-r from-purple-500 to-pink-600';
      case 'night':
        return 'bg-gradient-to-r from-gray-900 to-blue-900';
      default:
        return 'bg-gradient-to-r from-primary-600 to-primary-800';
    }
  };

  // Animation variants
  const infoItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  // Get random sunrise and sunset times
  const getSunriseTime = () => {
    const hours = Math.floor(Math.random() * 3) + 5; // 5-7 AM
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} AM`;
  };

  const getSunsetTime = () => {
    const hours = Math.floor(Math.random() * 3) + 6; // 6-8 PM
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} PM`;
  };

  // Get UV index description
  const getUVDescription = (index: number) => {
    if (index <= 2) return 'Low';
    if (index <= 5) return 'Moderate';
    if (index <= 7) return 'High';
    if (index <= 10) return 'Very High';
    return 'Extreme';
  };

  // Get UV index color
  const getUVColor = (index: number) => {
    if (index <= 2) return 'text-green-500';
    if (index <= 5) return 'text-yellow-500';
    if (index <= 7) return 'text-orange-500';
    if (index <= 10) return 'text-red-500';
    return 'text-purple-500';
  };

  // Get AQI description
  const getAQIDescription = (aqi: number) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  // Get AQI color
  const getAQIColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-500';
    if (aqi <= 100) return 'text-yellow-500';
    if (aqi <= 150) return 'text-orange-500';
    if (aqi <= 200) return 'text-red-500';
    if (aqi <= 300) return 'text-purple-500';
    return 'text-purple-900';
  };

  const sunriseTime = getSunriseTime();
  const sunsetTime = getSunsetTime();

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1.0]
      }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <motion.div 
        className={`${getBackgroundGradient()} text-white p-4 sm:p-6`}
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-1 sm:mb-2">
          <div className="flex items-center">
            <MapPin className="mr-1 sm:mr-2" size={16} />
            <h2 className="text-lg sm:text-2xl font-bold">{data.location}</h2>
          </div>
          <div className="flex items-center text-xs sm:text-sm">
            <Clock className="mr-1" size={12} />
            {new Date().toLocaleTimeString('en-US', { 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>
        <div className="text-xs sm:text-sm text-white/80">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </motion.div>
      
      {data.alerts && data.alerts.length > 0 && (
        <motion.div 
          className="bg-amber-50 border-l-4 border-amber-500 p-2 sm:p-3 flex items-center"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <AlertCircle className="text-amber-500 mr-2 flex-shrink-0" size={16} />
          <p className="text-amber-800 text-xs sm:text-sm font-medium">{data.alerts[0].title}</p>
        </motion.div>
      )}
      
      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 sm:mb-6">
          <motion.div 
            className="flex items-center mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.1, 0.25, 1.0],
              delay: 0.2
            }}
          >
            <motion.div
              whileHover={{ 
                scale: 1.1, 
                rotate: data.condition.toLowerCase().includes('windy') ? 20 : 0 
              }}
              transition={{ duration: 0.3 }}
            >
              {getWeatherIcon(data.condition)}
            </motion.div>
            <div className="ml-3 sm:ml-4">
              <motion.div 
                className="text-4xl sm:text-6xl font-bold text-secondary-900"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {data.temperature}°
              </motion.div>
              <motion.div 
                className="text-secondary-600 text-base sm:text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                {data.condition}
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto"
            initial="hidden"
            animate="visible"
            transition={{ 
              staggerChildren: 0.1,
              delayChildren: 0.5
            }}
          >
            <motion.div 
              className="flex items-center"
              variants={infoItemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-blue-50 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                <Thermometer className="text-primary-500" size={16} />
              </div>
              <div>
                <div className="text-xs text-secondary-500">Feels Like</div>
                <div className="text-secondary-900 font-medium text-sm">{data.feelsLike || (data.temperature - 2)}°</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              variants={infoItemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-blue-50 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                <Droplets className="text-primary-500" size={16} />
              </div>
              <div>
                <div className="text-xs text-secondary-500">Humidity</div>
                <div className="text-secondary-900 font-medium text-sm">{data.humidity}%</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              variants={infoItemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-blue-50 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                <Wind className="text-primary-500" size={16} />
              </div>
              <div>
                <div className="text-xs text-secondary-500">Wind</div>
                <div className="text-secondary-900 font-medium text-sm">{data.windSpeed} mph</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-center"
              variants={infoItemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="bg-blue-50 p-1.5 sm:p-2 rounded-full mr-2 sm:mr-3">
                <Compass className="text-primary-500" size={16} />
              </div>
              <div>
                <div className="text-xs text-secondary-500">Direction</div>
                <div className="text-secondary-900 font-medium text-sm">{data.windDirection || 'NE'}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full py-2 px-4 bg-secondary-100 hover:bg-secondary-200 rounded-lg text-secondary-700 font-medium transition-colors flex items-center justify-center text-xs sm:text-sm"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          {showDetails ? 'Hide Details' : 'Show More Details'}
        </motion.button>
        
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-secondary-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-secondary-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-secondary-900 mb-2 sm:mb-3 text-sm">Sun & Moon</h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-1.5 sm:p-2 rounded-full mr-2">
                        <Sunrise className="text-amber-600" size={14} />
                      </div>
                      <div>
                        <div className="text-xs text-secondary-500">Sunrise</div>
                        <div className="text-secondary-900 text-xs sm:text-sm">{sunriseTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-1.5 sm:p-2 rounded-full mr-2">
                        <Sunset className="text-indigo-600" size={14} />
                      </div>
                      <div>
                        <div className="text-xs text-secondary-500">Sunset</div>
                        <div className="text-secondary-900 text-xs sm:text-sm">{sunsetTime}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary-50 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-medium text-secondary-900 mb-2 sm:mb-3 text-sm">Air Quality</h3>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div>
                      <div className="text-xs text-secondary-500">UV Index</div>
                      <div className={`font-medium text-xs sm:text-sm ${getUVColor(data.uvIndex || 5)}`}>
                        {data.uvIndex || 5} - {getUVDescription(data.uvIndex || 5)}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-secondary-500">Air Quality</div>
                      <div className={`font-medium text-xs sm:text-sm ${getAQIColor(data.airQuality || 42)}`}>
                        {data.airQuality || 42} - {getAQIDescription(data.airQuality || 42)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary-50 p-3 sm:p-4 rounded-lg md:col-span-2">
                  <h3 className="font-medium text-secondary-900 mb-2 text-sm">Today's Details</h3>
                  <p className="text-xs sm:text-sm text-secondary-600">
                    {data.condition} conditions will continue throughout the day. 
                    {data.condition.toLowerCase().includes('rain') 
                      ? ' Expect occasional showers with periods of heavier rainfall.' 
                      : data.condition.toLowerCase().includes('cloud')
                        ? ' Cloud cover will vary throughout the day with occasional sunny breaks.'
                        : data.condition.toLowerCase().includes('sun') || data.condition.toLowerCase().includes('clear')
                          ? ' Clear skies with excellent visibility throughout the day.'
                          : ' Conditions may change later in the day.'}
                    {' '}Wind speeds of {data.windSpeed} mph from the {data.windDirection || 'northeast'}.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default WeatherCard;