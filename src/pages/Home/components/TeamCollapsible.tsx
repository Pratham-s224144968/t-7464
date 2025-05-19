
import React from "react";
import { motion } from "@/components/ui/motion";
import { LucideIcon, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface TeamCollapsibleProps {
  title: string;
  icon: LucideIcon;
  members: string[];
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  delay: number;
}

const TeamCollapsible: React.FC<TeamCollapsibleProps> = ({
  title,
  icon: Icon,
  members,
  isOpen,
  setIsOpen,
  delay
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-full"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-blue-900/30 p-4 text-left font-medium hover:bg-blue-900/50 transition-colors">
          <div className="flex items-center">
            <Icon className="mr-3 h-5 w-5 text-blue-400" />
            <span className="text-lg text-white">{title}</span>
          </div>
          <ChevronDown className={`h-5 w-5 text-blue-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="bg-blue-950/30 rounded-b-lg p-4 space-y-2 border-x border-b border-blue-500/30">
          <ul className="list-disc list-inside pl-4 text-white/80 space-y-1">
            {members.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </motion.div>
  );
};

export default TeamCollapsible;
