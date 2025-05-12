import { Database, Server, Network, Users, Code, Globe, GitMerge, Lightbulb, Webhook, Cpu, Mail, Heart, CalendarDays, FileText, MessageSquare, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "@/components/ui/motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

const Index = () => {
  const [isCommsOpen, setIsCommsOpen] = useState(false);
  const [isSprintOpen, setIsSprintOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);

  return <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section - Simplified */}
      <motion.section id="home" className="pt-5 pb-16 bg-gradient-to-br from-blue-900/70 to-black" initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.6
    }}>
        <div className="container mx-auto text-center">
          <motion.img alt="InnovAIte Logo" initial={{
          y: -50,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.2,
          duration: 0.5
        }} src="/lovable-uploads/7b9b7ff1-8cf0-4f74-a362-00f0ceaf28e9.png" className="mx-auto h-150 w-auto object-contain" />
          <motion.h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 text-white" initial={{
          y: 30,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.3,
          duration: 0.5
        }}>
            InnovAIte
          </motion.h1>
          <motion.p className="text-2xl max-w-2xl mx-auto mb-4 text-blue-200 font-medium" initial={{
          y: 30,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.4,
          duration: 0.5
        }}>
            AI Innovation Hub at Deakin University
          </motion.p>
          <motion.p className="text-lg max-w-3xl mx-auto mb-8 text-white/80" initial={{
          y: 30,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.5,
          duration: 0.5
        }}>
            We are an AI-focused innovation platform driven by students and researchers at Deakin University.
          </motion.p>
        </div>
      </motion.section>

      {/* Portfolio Showcase Section - NEW */}
      <motion.section id="portfolio" className="py-20 bg-black" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }}>
        <div className="container mx-auto">
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
            /PORTFOLIO
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div className="col-span-3 md:col-span-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
              <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur h-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Featured Project: AI Prototyping Lab</CardTitle>
                  <CardDescription className="text-blue-200">Revolutionizing application development</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Person working on AI development" 
                    className="w-full h-64 object-cover rounded-md"
                  />
                  <p className="text-white/80">
                    Our flagship project explores how AI can dramatically accelerate application development for startups and businesses. 
                    Student teams test various AI development platforms and document their findings to help organizations choose 
                    the right tools for their needs.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">AI Development</span>
                    <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">LLMs</span>
                    <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">Research</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite/prototyping', '_blank')}>
                    <GitMerge className="mr-2 h-4 w-4" />
                    View Project Repository
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>

            <motion.div className="col-span-3 md:col-span-1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}>
              <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur h-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-white">AI Generalist Program</CardTitle>
                  <CardDescription className="text-blue-200">Knowledge-sharing initiative</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                    alt="Person learning about AI" 
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <p className="text-white/80">
                    A program designed to research and share AI tools that can boost productivity and creativity for non-technical users.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50" onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite/generalist', '_blank')}>
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Us Section - Simplified */}
      <motion.section id="about" className="py-20 bg-gradient-to-b from-black to-blue-950/50" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }}>
        <div className="container mx-auto">
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
            /ABOUT US
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <motion.div className="md:w-1/2" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
                <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  InnovAIte identifies, validates, and showcases cutting-edge AI tools and workflows 
                  that reshape how businesses and academia adopt artificial intelligence.
                </p>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Operating under Deakin University's SPARK 2026 initiative, we bring together 
                  students, researchers, and industry partners to create practical AI solutions.
                </p>
              </motion.div>
              
              <motion.div className="md:w-1/2" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}>
                <div className="grid grid-cols-2 gap-4 h-full">
                  <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 flex flex-col items-center justify-center">
                    <Users className="w-10 h-10 text-blue-400 mb-2" />
                    <h3 className="text-lg font-medium text-white">Student-Led</h3>
                    <p className="text-sm text-white/70 text-center">Fresh perspectives driving innovation</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 flex flex-col items-center justify-center">
                    <Cpu className="w-10 h-10 text-blue-400 mb-2" />
                    <h3 className="text-lg font-medium text-white">AI-Focused</h3>
                    <p className="text-sm text-white/70 text-center">Cutting-edge AI technology</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 flex flex-col items-center justify-center">
                    <Globe className="w-10 h-10 text-blue-400 mb-2" />
                    <h3 className="text-lg font-medium text-white">Connected</h3>
                    <p className="text-sm text-white/70 text-center">Strong industry partnerships</p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 flex flex-col items-center justify-center">
                    <Lightbulb className="w-10 h-10 text-blue-400 mb-2" />
                    <h3 className="text-lg font-medium text-white">Innovative</h3>
                    <p className="text-sm text-white/70 text-center">Creating new possibilities</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Resources Section - NEW */}
      <motion.section id="resources" className="py-20 bg-black" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }}>
        <div className="container mx-auto">
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
            /RESOURCES
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
              <div className="flex items-center mb-4">
                <GitMerge className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">GitLab Repositories</h3>
              </div>
              <p className="text-white/70 mb-4">
                Access our open-source code repositories, documentation, and project materials.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite', '_blank')}>
                View Repositories
              </Button>
            </motion.div>
            
            <motion.div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}>
              <div className="flex items-center mb-4">
                <MessageSquare className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">MS Teams Channel</h3>
              </div>
              <p className="text-white/70 mb-4">
                Join our Microsoft Teams channel for discussions, announcements, and collaboration.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => window.open('https://teams.microsoft.com/l/team/19%3AcW6v8QDG1uJuK3IebazxDFvL7RLh8SPVLP7ZMK8jCH01%40thread.tacv2/conversations?groupId=64f97721-41a3-47c1-adad-e07a0e609089&tenantId=d02378ec-1688-46d5-8540-1c28b5f470f6', '_blank')}>
                Join Teams Channel
              </Button>
            </motion.div>
            
            <motion.div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }} viewport={{ once: true }}>
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-blue-400 mr-3" />
                <h3 className="text-xl font-semibold text-white">Meeting Notes</h3>
              </div>
              <p className="text-white/70 mb-4">
                Browse our weekly meeting summaries and project updates.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
                <Link to="/meetings">View Team Meetings</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Company Leadership Section - NEW */}
      <motion.section id="leadership" className="py-20 bg-black" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }}>
        <div className="container mx-auto">
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
              { title: "Product Owner", name: "Jesse Mcmeikan", icon: Users },
              { title: "Company Director", name: "Leon Yang", icon: Briefcase },
              { title: "Company Mentor", name: "Scott West", icon: Lightbulb }
            ].map((leader, index) => (
              <motion.div 
                key={leader.title}
                className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 text-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-blue-500/10 p-5">
                    <leader.icon className="w-10 h-10 text-blue-400" />
                  </div>
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
                  <p className="text-white/90">Team Lead: Sarah Johnson</p>
                  <p className="text-white/90">Members:</p>
                  <ul className="list-disc list-inside pl-4 text-white/80 space-y-1">
                    <li>Michael Chen - Social Media</li>
                    <li>Priya Patel - Internal Communications</li>
                    <li>David Wilson - External Relations</li>
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
                  <p className="text-white/90">Team Lead: Alex Rodriguez</p>
                  <p className="text-white/90">Members:</p>
                  <ul className="list-disc list-inside pl-4 text-white/80 space-y-1">
                    <li>Emma Watson - Planning</li>
                    <li>Carlos Jimenez - Execution</li>
                    <li>Sophia Lee - Review & Retrospective</li>
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
                  <p className="text-white/90">Team Lead: James Nguyen</p>
                  <p className="text-white/90">Members:</p>
                  <ul className="list-disc list-inside pl-4 text-white/80 space-y-1">
                    <li>Olivia Smith - Frontend</li>
                    <li>Daniel Kim - Backend</li>
                    <li>Zoe Martinez - Quality Assurance</li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section - Simplified */}
      <motion.section id="contact" className="py-20 bg-black" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }}>
        <div className="container mx-auto">
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
            /CONTACT US
          </motion.h2>
          
          <div className="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
            <motion.div className="md:w-1/2 p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
              <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
              <p className="text-white/80 mb-4">
                Have questions or want to collaborate? Reach out to our team.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-white/80">contact@innovaite.ai</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
                  <span className="text-white/80">MS Teams Channel</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div className="md:w-1/2 p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.5 }} viewport={{ once: true }}>
              <h3 className="text-xl font-semibold text-white mb-4">Visit Us</h3>
              <p className="text-white/80 mb-4">
                We're located at Deakin University's Burwood Campus.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 w-full" onClick={() => window.open('https://goo.gl/maps/9Z9Z9Z9Z9Z9Z9Z9Z9', '_blank')}>
                View Map
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer - Kept similar */}
      <footer className="bg-black border-t border-blue-900/30 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <img src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" alt="InnovAIte Logo" className="h-16 mr-3" />
              <div>
                <p className="text-xl font-mono font-bold text-white mb-2">InnovAIte</p>
                <p className="text-sm text-white/60">
                  A research initiative under Deakin University's SPARK 2026 program
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-6 mb-4">
                <a href="mailto:contact@innovaite.ai" className="text-white/60 hover:text-blue-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="https://gitlab.deakin.edu.au/innovaite/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                  <GitMerge className="h-5 w-5" />
                </a>
                <a href="https://teams.microsoft.com/l/team/19%3AcW6v8QDG1uJuK3IebazxDFvL7RLh8SPVLP7ZMK8jCH01%40thread.tacv2/conversations?groupId=64f97721-41a3-47c1-adad-e07a0e609089&tenantId=d02378ec-1688-46d5-8540-1c28b5f470f6" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </a>
              </div>
              <p className="text-sm text-white/60 flex items-center">
                Made with <Heart className="h-4 w-4 mx-1 text-blue-500" /> by InnovAIte
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};

// TeamMemberCard Component
const TeamMemberCard = ({ name, role, imageUrl, delay = 0.3 }) => {
  return (
    <motion.div 
      className="flex flex-col items-center" 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ delay, duration: 0.5 }} 
      viewport={{ once: true }}
    >
      <div className="w-full aspect-square rounded-full overflow-hidden mb-4 border-2 border-blue-500/30">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <h4 className="text-lg font-medium text-white">{name}</h4>
      <p className="text-sm text-blue-300">{role}</p>
    </motion.div>
  );
};

export default Index;
