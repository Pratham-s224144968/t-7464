
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from '@/components/ui/motion';

export const BrandLogo = () => {
  return (
    <Link to="/" className="flex items-center mr-8">
      <motion.img 
        src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" 
        alt="InnovAIte" 
        className="h-8 w-auto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.span 
        className="ml-2 text-lg font-bold font-mono text-white"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        InnovAIte
      </motion.span>
    </Link>
  );
};

export default BrandLogo;
