
import React from "react";
import { motion } from "@/components/ui/motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitMerge } from "lucide-react";
import { ParticleBackground } from "@/components/ui/motion/particles";

const Portfolio = () => {
  return (
    <motion.section 
      id="portfolio" 
      className="relative py-20 bg-black" 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <ParticleBackground variant="purple" density="low" className="opacity-30" />
      
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
        
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div 
            className="col-span-3 md:col-span-2" 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.5 }} 
            viewport={{ once: true }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
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

          <motion.div 
            className="col-span-3 md:col-span-1" 
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
  );
};

export default Portfolio;
