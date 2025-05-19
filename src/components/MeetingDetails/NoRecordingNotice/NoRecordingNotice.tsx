
import React from "react";
import { motion } from "@/components/ui/motion";
import { floatAnimation } from "@/components/ui/motion";

interface NoRecordingNoticeProps {
  logoSrc?: string;
}

const NoRecordingNotice: React.FC<NoRecordingNoticeProps> = ({ 
  logoSrc = "/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png" 
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="text-center p-8 text-blue-300 glass-effect rounded-lg flex flex-col items-center justify-center h-64"
    >
      <motion.div
        initial="initial"
        animate="animate"
        variants={floatAnimation}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mb-4"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <path d="M22 4 12 14.01l-3-3"></path>
        </svg>
      </motion.div>
      <motion.p
        animate={{ 
          opacity: [0.7, 1, 0.7] 
        }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        No recording available
      </motion.p>
      <motion.img 
        src={logoSrc}
        alt="Deakin University Logo"
        className="w-24 mt-4 opacity-70"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.div>
  );
};

export default NoRecordingNotice;
