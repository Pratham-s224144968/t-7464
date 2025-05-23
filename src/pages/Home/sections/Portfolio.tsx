
import React from "react";
import { motion } from "@/components/ui/motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitMerge, Clock } from "lucide-react";

const Portfolio = () => {
  return (
    <motion.section 
      id="portfolio" 
      className="relative py-20 bg-black/30 backdrop-blur-sm" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Add subtle purple glow that doesn't hide particles */}
      <motion.div 
        className="absolute inset-0 bg-purple-500/5 pointer-events-none"
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.h2 
          className="text-3xl font-mono font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          /PORTFOLIO
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1: AI Prototyping Lab */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.5 }} 
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur h-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white text-2xl">AI Prototyping Lab</CardTitle>
                <CardDescription className="text-blue-200">Revolutionizing application development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="Person working on AI development" 
                  className="w-full h-52 object-cover rounded-md"
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

          {/* Project 2: AI Generalist Program */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.4, duration: 0.5 }} 
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur h-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">AI Generalist Program</CardTitle>
                <CardDescription className="text-blue-200">Knowledge-sharing initiative</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                  alt="Person learning about AI" 
                  className="w-full h-52 object-cover rounded-md"
                />
                <p className="text-white/80">
                  A program designed to research and share AI tools that can boost productivity and creativity for non-technical users.
                  Explore curated resources to enhance your workflow with the latest AI technologies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">AI Tools</span>
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">Productivity</span>
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">Education</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite/generalist', '_blank')}>
                  <GitMerge className="mr-2 h-4 w-4" />
                  View Project Repository
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Project 3: Makerspace Innovation Studio */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 0.5 }} 
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur h-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Makerspace Innovation Studio</CardTitle>
                <CardDescription className="text-blue-200">Creative hardware solutions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                  alt="Makerspace workshop" 
                  className="w-full h-52 object-cover rounded-md opacity-80"
                />
                <p className="text-white/80">
                  A collaborative workspace where students can explore hardware innovation, 3D printing, and physical 
                  prototyping to complement their digital solutions and bring ideas to life.
                </p>
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Coming Soon</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">Hardware</span>
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">Prototyping</span>
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">3D Printing</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50" disabled>
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Project 4: AI Organisation Design */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6, duration: 0.5 }} 
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur h-full hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">AI Organisation Design</CardTitle>
                <CardDescription className="text-blue-200">Future-proofing businesses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                  alt="Organisation design with AI" 
                  className="w-full h-52 object-cover rounded-md opacity-80"
                />
                <p className="text-white/80">
                  Research initiative focused on helping organizations redesign their structures and processes 
                  to effectively integrate AI technologies and drive innovation in the digital age.
                </p>
                <div className="flex items-center gap-2 text-amber-400">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Coming Soon</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">Business</span>
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">Strategy</span>
                  <span className="px-2 py-1 bg-blue-900/50 rounded-full text-xs text-blue-200">Innovation</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50" disabled>
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;
