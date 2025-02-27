import React from 'react';
import { Heart, Shield, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const ReassuranceMessage: React.FC = () => {
  // Animation variants - FASTER ANIMATIONS
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1, // Reduced from 0.2
        duration: 0.2, // Reduced from 0.5
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, // Reduced from 30
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3, // Reduced from 0.6
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  return (
    <motion.div 
      className="space-y-3 sm:space-y-4" // Reduced from space-y-6
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-3 sm:p-5 rounded-lg shadow-md"
        variants={itemVariants}
        whileHover={{ 
          y: -3, // Reduced from -5
          boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.2)",
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <div className="flex items-center mb-2 sm:mb-3">
          <Shield className="mr-2 sm:mr-3 flex-shrink-0" size={20} />
          <h2 className="text-lg sm:text-2xl font-bold">You Are Not Alone</h2>
        </div>
        <p className="text-white/90 leading-relaxed text-xs sm:text-sm">
          Domestic violence isn't always physical. It can be emotional, verbal, financial, or psychological. 
          If your partner controls who you see, isolates you from friends and family, belittles you, threatens you, 
          or makes you feel afraid, you may be in an abusive relationship.
        </p>
      </motion.div>

      <motion.div 
        className="bg-white p-3 sm:p-5 rounded-lg shadow-md border-l-4 border-primary-500"
        variants={itemVariants}
        whileHover={{ 
          y: -3, // Reduced from -5
          boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3">Recognizing Abuse</h3>
        <p className="text-secondary-700 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
          Abuse can take many forms—constant criticism, manipulation, financial control, or even monitoring your activities. 
          If you feel trapped, unsafe, or unsure about your relationship, trust your instincts. 
          You deserve to be treated with kindness, respect, and love.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
          <motion.div 
            className="bg-secondary-50 p-3 sm:p-4 rounded-lg"
            whileHover={{ 
              scale: 1.01, // Reduced from 1.02
              backgroundColor: "#f1f5f9",
              transition: { duration: 0.15 }
            }}
          >
            <h4 className="font-medium text-secondary-900 mb-2 text-sm">Signs of Emotional Abuse</h4>
            <ul className="space-y-1 text-secondary-700 text-xs list-disc pl-4 sm:pl-5">
              <li>Constant criticism or humiliation</li>
              <li>Controlling behavior or excessive jealousy</li>
              <li>Isolating you from friends and family</li>
              <li>Making you doubt your own perceptions</li>
              <li>Threatening you or making you feel afraid</li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="bg-secondary-50 p-3 sm:p-4 rounded-lg"
            whileHover={{ 
              scale: 1.01, // Reduced from 1.02
              backgroundColor: "#f1f5f9",
              transition: { duration: 0.15 }
            }}
          >
            <h4 className="font-medium text-secondary-900 mb-2 text-sm">Signs of Financial Abuse</h4>
            <ul className="space-y-1 text-secondary-700 text-xs list-disc pl-4 sm:pl-5">
              <li>Controlling access to money or resources</li>
              <li>Preventing you from working or studying</li>
              <li>Taking your money or running up debts in your name</li>
              <li>Making financial decisions without your input</li>
              <li>Using money to control your behavior</li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="bg-white p-3 sm:p-5 rounded-lg shadow-md border-l-4 border-green-500"
        variants={itemVariants}
        whileHover={{ 
          y: -3, // Reduced from -5
          boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <div className="flex items-center mb-2 sm:mb-3">
          <Heart className="text-green-600 mr-2 sm:mr-3 flex-shrink-0" size={20} />
          <h3 className="text-lg sm:text-xl font-bold text-secondary-900">Hope Is Possible—And Help Is Available</h3>
        </div>
        <p className="text-secondary-700 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm">
          No one deserves to live in fear. If you are experiencing abuse, know that there is a way out. 
          Many survivors have rebuilt their lives, found safety, and discovered their strength. 
          You are not alone, and support is available to help you take the next step.
        </p>
        <p className="text-secondary-700 mb-2 sm:mb-3 leading-relaxed text-xs sm:text-sm">
          There are shelters, advocacy programs, legal resources, and people who truly care about your safety and well-being. 
          Even if leaving feels impossible right now, small steps—like reaching out to a trusted friend or calling a hotline—can lead to freedom and a new beginning.
        </p>
        
        <motion.div 
          className="bg-green-50 p-3 sm:p-4 rounded-lg mt-3 sm:mt-4"
          whileHover={{ 
            scale: 1.01,
            backgroundColor: "#dcfce7",
            transition: { duration: 0.15 }
          }}
        >
          <h4 className="font-medium text-secondary-900 mb-2 text-sm">Small Steps You Can Take</h4>
          <ul className="space-y-1 text-secondary-700 text-xs list-disc pl-4 sm:pl-5">
            <li>Call a domestic violence hotline to talk through your options</li>
            <li>Reach out to a trusted friend, family member, or coworker</li>
            <li>Create a safety plan for yourself (and your children, if applicable)</li>
            <li>Document incidents of abuse when it's safe to do so</li>
            <li>Research local resources that can provide support</li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div 
        className="bg-white p-3 sm:p-5 rounded-lg shadow-md border-l-4 border-purple-500"
        variants={itemVariants}
        whileHover={{ 
          y: -3, // Reduced from -5
          boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)",
          transition: { duration: 0.2, ease: "easeOut" }
        }}
      >
        <h3 className="text-lg sm:text-xl font-bold text-secondary-900 mb-2 sm:mb-3">You Deserve a Life Free From Fear</h3>
        <p className="text-secondary-700 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
          Your safety and happiness matter. It is not your fault, and you don't have to go through this alone. 
          There are people ready to listen and help, whether you need immediate protection or a plan for the future. 
          The first step can feel overwhelming, but you are stronger than you know. 
          Hope, healing, and a better future are within reach. When you're ready, help is here.
        </p>
        
        <motion.div 
          className="flex items-center justify-center mt-3 sm:mt-4"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.15 }}
        >
          <ExternalLink className="text-primary-500 mr-2" size={16} />
          <span className="text-primary-600 font-medium text-xs sm:text-sm">Explore the resources in the other tabs to find support</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ReassuranceMessage;