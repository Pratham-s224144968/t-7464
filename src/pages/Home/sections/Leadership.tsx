
import React, { useState } from "react";
import { motion } from "@/components/ui/motion";
import { Users, Globe, Lightbulb, MessageSquare, CalendarDays, Code, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ParticleBackground } from "@/components/ui/motion/particles";
import { floatAnimation } from "@/components/ui/motion";

const Leadership = () => {
  const [isCommsOpen, setIsCommsOpen] = useState(false);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

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
      <ParticleBackground variant="purple" density="low" speed="slow" className="opacity-20" />
      
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
          {/* Key Leadership */}
          {[
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
          ].map((leader, index) => (
            <motion.div 
              key={leader.title}
              className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 text-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-center mb-6">
                <Avatar className="w-32 h-32 border-2 border-blue-500/50">
                  <AvatarImage src={leader.image} alt={leader.name} className="object-cover" />
                  <AvatarFallback className="bg-blue-500/10">
                    <leader.icon className="w-10 h-10 text-blue-400" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{leader.title}</h3>
              <p className="text-lg text-blue-300">{leader.name}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Leadership Teams */}
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
          {/* Communications Team */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Collapsible
              open={isCommsOpen}
              onOpenChange={setIsCommsOpen}
              className="w-full"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-blue-900/30 p-4 text-left font-medium hover:bg-blue-900/50 transition-colors">
                <div className="flex items-center">
                  <MessageSquare className="mr-3 h-5 w-5 text-blue-400" />
                  <span className="text-lg text-white">Communications Leads</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-blue-400 transition-transform duration-200 ${isCommsOpen ? "transform rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-blue-950/30 rounded-b-lg p-4 space-y-2 border-x border-b border-blue-500/30">
                <ul className="list-disc list-inside pl-4 text-white/80 space-y-1">
                  <li>Thomas John Fleming</li>
                  <li>Maryam Khazaeepool</li>
                  <li>Lakshay Lalia</li>
                  <li>Ahmad Tahir Chaudhry</li>
                  <li>Ibram Milad Zaki Ghali</li>
                  <li>Nihar Jalela</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
          
          {/* Sprint Team */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Collapsible
              open={isSprintOpen}
              onOpenChange={setIsSprintOpen}
              className="w-full"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-blue-900/30 p-4 text-left font-medium hover:bg-blue-900/50 transition-colors">
                <div className="flex items-center">
                  <CalendarDays className="mr-3 h-5 w-5 text-blue-400" />
                  <span className="text-lg text-white">Sprint Leads</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-blue-400 transition-transform duration-200 ${isSprintOpen ? "transform rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-blue-950/30 rounded-b-lg p-4 space-y-2 border-x border-b border-blue-500/30">
                <ul className="list-disc list-inside pl-4 text-white/80 space-y-1">
                  <li>Aamya Gupta</li>
                  <li>Negin Pakroohjahromi</li>
                  <li>Jay Shrimpton</li>
                  <li>Aryan Sharma</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
          
          {/* Code Integration Team */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Collapsible
              open={isCodeOpen}
              onOpenChange={setIsCodeOpen}
              className="w-full"
            >
              <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-blue-900/30 p-4 text-left font-medium hover:bg-blue-900/50 transition-colors">
                <div className="flex items-center">
                  <Code className="mr-3 h-5 w-5 text-blue-400" />
                  <span className="text-lg text-white">Code Integration Leads</span>
                </div>
                <ChevronDown className={`h-5 w-5 text-blue-400 transition-transform duration-200 ${isCodeOpen ? "transform rotate-180" : ""}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-blue-950/30 rounded-b-lg p-4 space-y-2 border-x border-b border-blue-500/30">
                <ul className="list-disc list-inside pl-4 text-white/80 space-y-1">
                  <li>Pooja Dissanayake</li>
                  <li>Aneesh Sameer Pedram</li>
                  <li>Hariharan Tandullu Ramesh</li>
                  <li>Pratham Shelar</li>
                  <li>Jay Shrimpton</li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Leadership;
