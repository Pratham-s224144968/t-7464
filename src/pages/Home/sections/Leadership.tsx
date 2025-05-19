
import React, { useState } from "react";
import { motion } from "@/components/ui/motion";
import { Users, Globe, Lightbulb, MessageSquare, CalendarDays, Code } from "lucide-react";
import { ParticleBackground } from "@/components/ui/motion/particles";
import { floatAnimation } from "@/components/ui/motion";
import LeaderCard from "../components/LeaderCard";
import TeamCollapsible from "../components/TeamCollapsible";

const Leadership = () => {
  const [isCommsOpen, setIsCommsOpen] = useState(false);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  // Main leadership data
  const leadershipData = [
    { 
      title: "Product Owner", 
      name: "Jesse Mcmeikan", 
      icon: Users,
      image: "/lovable-uploads/a02fcaad-2d36-456b-8147-27045d090634.png" 
    },
    { 
      title: "Company Director", 
      name: "Leon Yang", 
      icon: Globe,
      image: "/lovable-uploads/56f17cfa-e923-4bfe-8f17-008f082f7ba9.png" 
    },
    { 
      title: "Company Mentor", 
      name: "Scott West", 
      icon: Lightbulb,
      image: "/lovable-uploads/0a9ce17d-8039-45bd-94fa-346bb28ba5bb.png" 
    }
  ];

  // Team data
  const teamsData = [
    { 
      title: "Communications Leads", 
      icon: MessageSquare, 
      members: [
        "Thomas John Fleming", 
        "Maryam Khazaeepool", 
        "Lakshay Lalia", 
        "Ahmad Tahir Chaudhry", 
        "Ibram Milad Zaki Ghali", 
        "Nihar Jalela"
      ],
      isOpen: isCommsOpen,
      setIsOpen: setIsCommsOpen,
      delay: 0.4
    },
    { 
      title: "Sprint Leads", 
      icon: CalendarDays, 
      members: [
        "Aamya Gupta", 
        "Negin Pakroohjahromi", 
        "Jay Shrimpton", 
        "Aryan Sharma"
      ],
      isOpen: isSprintOpen,
      setIsOpen: setIsSprintOpen,
      delay: 0.5
    },
    { 
      title: "Code Integration Leads", 
      icon: Code, 
      members: [
        "Pooja Dissanayake", 
        "Aneesh Sameer Pedram", 
        "Hariharan Tandullu Ramesh", 
        "Pratham Shelar", 
        "Jay Shrimpton"
      ],
      isOpen: isCodeOpen,
      setIsOpen: setIsCodeOpen,
      delay: 0.6
    }
  ];

  return (
    <motion.section id="leadership" className="relative py-20 bg-black" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }}>
      <ParticleBackground 
        variant="purple" 
        density="low" 
        speed="slow" 
        className="absolute inset-0 opacity-20" 
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent pointer-events-none"
        {...floatAnimation}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500" initial={{
          y: 20,
          opacity: 0
        }} whileInView={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} viewport={{
          once: true
        }}>
          /COMPANY PILLARS
        </motion.h2>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {leadershipData.map((leader, index) => (
            <LeaderCard 
              key={leader.title}
              title={leader.title}
              name={leader.name}
              image={leader.image}
              icon={leader.icon}
              index={index}
            />
          ))}
        </div>
        
        <motion.h3 
          className="text-2xl font-semibold text-center text-white mb-10" 
          initial={{ y: 20, opacity: 0 }} 
          whileInView={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Leadership Teams
        </motion.h3>
        
        <div className="max-w-2xl mx-auto space-y-4">
          {teamsData.map((team) => (
            <TeamCollapsible
              key={team.title}
              title={team.title}
              icon={team.icon}
              members={team.members}
              isOpen={team.isOpen}
              setIsOpen={team.setIsOpen}
              delay={team.delay}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Leadership;
