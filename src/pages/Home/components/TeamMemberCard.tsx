
import React from "react";
import { motion } from "@/components/ui/motion";

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageUrl: string;
  delay?: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  name, 
  role, 
  imageUrl, 
  delay = 0.3 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center" 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ delay, duration: 0.5 }} 
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="w-full aspect-square rounded-full overflow-hidden mb-4 border-2 border-blue-500/30 relative">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      <h4 className="text-lg font-medium text-white">{name}</h4>
      <p className="text-sm text-blue-300">{role}</p>
    </motion.div>
  );
};

export default TeamMemberCard;
