import { Database, Server, Network, Users, Code, Globe, GitMerge, Lightbulb, Webhook, Cpu, Mail, Heart, CalendarDays, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "@/components/ui/motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="pt-32 pb-24 bg-gradient-to-br from-blue-900/70 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <motion.img 
            src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" 
            alt="InnovAIte Logo" 
            className="mx-auto mb-6 h-40"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <motion.h1 
            className="text-5xl md:text-7xl font-mono font-bold mb-6 text-white"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            InnovAIte
          </motion.h1>
          <motion.p 
            className="text-2xl max-w-2xl mx-auto mb-4 text-blue-200 font-medium"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Powering the Future of AI-Driven Innovation
          </motion.p>
          <motion.p 
            className="text-lg max-w-3xl mx-auto mb-8 text-white/80"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            InnovAIte is an AI-native innovation platform driven by students and researchers at Deakin University. 
            We validate, prototype, and explore emerging AI tools to accelerate startup and research development across industries.
          </motion.p>
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Explore Our Work
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white bg-transparent hover:bg-white/10">
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section 
        id="about" 
        className="py-24 bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-12 text-center text-blue-500"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            /ABOUT US
          </motion.h2>
          <div className="max-w-4xl mx-auto text-center">
            <motion.p 
              className="text-xl text-white/90 mb-8 leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              InnovAIte is a student-led research company operating under Deakin University's SPARK 2026 initiative. 
              Our aim is to identify, validate, and showcase cutting-edge AI tools and workflows that have the potential 
              to reshape how businesses and academia adopt AI.
            </motion.p>
            <motion.p 
              className="text-lg text-white/80 mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
            >
              We work closely with Deakin staff, researchers, and industry mentors to ensure our projects 
              have real-world applications and impact. Our collaborative approach brings together diverse 
              perspectives and expertise to drive innovation in AI.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <motion.div 
                className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Student-Led</h3>
                <p className="text-white/70">Driven by ambitious students with fresh perspectives</p>
              </motion.div>
              <motion.div 
                className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Cpu className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI-Focused</h3>
                <p className="text-white/70">Specializing in cutting-edge AI technologies</p>
              </motion.div>
              <motion.div 
                className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Industry Connected</h3>
                <p className="text-white/70">Working with real businesses for practical solutions</p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section 
        id="projects" 
        className="py-24 bg-gradient-to-b from-black to-blue-950/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-12 text-center text-blue-500"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            /PROJECTS
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Lightbulb className="h-6 w-6 text-blue-400" />
                    <Link to="/projects/ai-prototyping-lab" className="hover:text-blue-400 transition-colors">
                      AI Prototyping Lab
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Exploring AI development platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    A hands-on lab where student teams explore AI development platforms and test how AI can build applications rapidly for businesses and startups.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50"
                    onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite/prototyping', '_blank')}
                  >
                    <GitMerge className="mr-2 h-4 w-4" />
                    View GitLab Repository
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Code className="h-6 w-6 text-blue-400" />
                    <Link to="/projects/ai-generalist-program" className="hover:text-blue-400 transition-colors">
                      AI Generalist Program
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Knowledge-sharing for non-technical users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    A knowledge-sharing program that researches AI tools for non-technical users and academics to boost productivity, creativity, and learning.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50"
                    onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite/generalist', '_blank')}
                  >
                    <GitMerge className="mr-2 h-4 w-4" />
                    View GitLab Repository
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Webhook className="h-6 w-6 text-blue-400" />
                    <Link to="/projects/coming-soon-1" className="hover:text-blue-400 transition-colors">
                      Coming Soon
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    New project under development
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    We're working on expanding our project portfolio. Stay tuned for our next innovative AI research initiative.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50" disabled>
                    <GitMerge className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Network className="h-6 w-6 text-blue-400" />
                    <Link to="/projects/coming-soon-2" className="hover:text-blue-400 transition-colors">
                      Coming Soon
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-blue-200">
                    Future innovation project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90">
                    Another exciting project is in the pipeline. Check back later for updates on our newest AI research avenue.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50" disabled>
                    <GitMerge className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* GitLab Repositories Section */}
      <motion.section 
        id="gitlab" 
        className="py-24 bg-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-12 text-center text-blue-500"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            /GITLAB REPOS
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <motion.div 
                className="p-6 rounded-lg bg-blue-900/10 border border-blue-900/30 flex items-center justify-between hover:bg-blue-900/20 transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center">
                  <GitMerge className="h-8 w-8 text-blue-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-white">AI Prototyping Lab Repository</h3>
                    <p className="text-sm text-white/70">Source code and documentation for our AI prototyping projects</p>
                  </div>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite/prototyping', '_blank')}
                >
                  View Repo
                </Button>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-lg bg-blue-900/10 border border-blue-900/30 flex items-center justify-between hover:bg-blue-900/20 transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center">
                  <GitMerge className="h-8 w-8 text-blue-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-white">AI Generalist Program Repository</h3>
                    <p className="text-sm text-white/70">Resources and guides for non-technical AI adoption</p>
                  </div>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite/generalist', '_blank')}
                >
                  View Repo
                </Button>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-lg bg-blue-900/10 border border-blue-900/30 flex items-center justify-between hover:bg-blue-900/20 transition-all duration-300"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center">
                  <GitMerge className="h-8 w-8 text-blue-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-white">GitLab Access Guide</h3>
                    <p className="text-sm text-white/70">How to access and contribute to our repositories</p>
                  </div>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('https://gitlab.deakin.edu.au/innovaite', '_blank')}
                >
                  View Guide
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* MS Teams Section */}
      <motion.section 
        id="teams" 
        className="py-24 bg-gradient-to-b from-black to-blue-950/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-12 text-center text-blue-500"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            /MS TEAMS
          </motion.h2>
          <div className="max-w-3xl mx-auto">
            <motion.div 
              className="p-8 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 text-center hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <MessageSquare className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-white mb-4">Join Our MS Teams Channel</h3>
              <p className="text-lg text-white/80 mb-6">
                Connect with the InnovAIte team and participate in our discussions, meetings, and collaborative work.
              </p>
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                onClick={() => window.open('https://teams.microsoft.com/l/team/19%3AcW6v8QDG1uJuK3IebazxDFvL7RLh8SPVLP7ZMK8jCH01%40thread.tacv2/conversations?groupId=64f97721-41a3-47c1-adad-e07a0e609089&tenantId=d02378ec-1688-46d5-8540-1c28b5f470f6', '_blank')}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Join MS Teams Channel
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Weekly Meeting Summary Section */}
      <motion.section 
        id="meetings" 
        className="py-24 bg-gradient-to-t from-black to-blue-950/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-12 text-center text-blue-500"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            /WEEKLY MEETING SUMMARIES
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="p-8 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div className="flex items-center mb-4 md:mb-0">
                  <CalendarDays className="w-12 h-12 text-blue-400 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">Meeting Summaries</h3>
                    <p className="text-white/70">Records of our weekly progress and discussions</p>
                  </div>
                </div>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => window.open('#', '_blank')}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  View Document
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">Meeting - June 20, 2024</h4>
                    <span className="text-xs bg-blue-600 rounded-full px-2 py-1">Latest</span>
                  </div>
                  <p className="text-white/70 text-sm">Discussion on AI prototyping progress and next sprint planning</p>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">Meeting - June 13, 2024</h4>
                  </div>
                  <p className="text-white/70 text-sm">Review of AI generalist program materials and community engagement</p>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/20">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-white">Meeting - June 6, 2024</h4>
                  </div>
                  <p className="text-white/70 text-sm">Introduction of new team members and project roadmap discussion</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact" 
        className="py-24 bg-gradient-to-t from-blue-950/30 to-black"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto text-center">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-12 text-blue-500"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            /CONTACT US
          </motion.h2>
          <div className="max-w-lg mx-auto">
            <motion.p 
              className="text-lg text-white/80 mb-8"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
            >
              Interested in collaborating with InnovAIte or learning more about our projects? 
              We'd love to hear from you!
            </motion.p>
            <motion.div 
              className="p-8 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
              <p className="text-white/70 mb-6">
                Email us at: <a href="mailto:contact@innovaite.ai" className="text-blue-400 hover:underline">contact@innovaite.ai</a>
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full">
                Send Message
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-black border-t border-blue-900/30 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <img 
                src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" 
                alt="InnovAIte Logo" 
                className="h-18 mr-3" 
              />
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
    </div>
  );
};

export default Index;
