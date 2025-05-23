
import React from "react";
import { motion } from "@/components/ui/motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LucideIcon } from "lucide-react";

interface LeaderCardProps {
  title: string;
  name: string;
  image: string;
  icon: LucideIcon;
  index: number;
}

const LeaderCard: React.FC<LeaderCardProps> = ({ 
  title, 
  name, 
  image, 
  icon: Icon, 
  index 
}) => {
  return (
    <motion.div 
      className="relative p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 text-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Glowing revolving shine effect */}
      <motion.div 
        className="absolute -inset-2 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"
        style={{ 
          width: '200%',
          left: '-50%',
          top: 0,
          height: '100%',
          transform: 'skewX(-20deg)',
          pointerEvents: 'none',
        }}
        animate={{
          x: ['100%', '-100%'],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
        }}
      />

      {/* Content with higher z-index */}
      <div className="relative z-10">
        <div className="flex justify-center mb-6">
          <Avatar className="w-32 h-32 border-2 border-blue-500/50">
            <AvatarImage src={image} alt={name} className="object-cover" />
            <AvatarFallback className="bg-blue-500/10">
              <Icon className="w-10 h-10 text-blue-400" />
            </AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-lg text-blue-300">{name}</p>
      </div>
    </motion.div>
  );
};

export default LeaderCard;
