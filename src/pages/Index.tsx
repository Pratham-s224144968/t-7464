
import { Database, Server, Network, Users, Code, Globe, GitBranch, Lightbulb, Webhook, Cpu, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FeatureCard from "@/components/FeatureCard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="pt-32 pb-24 bg-gradient-to-br from-blue-900/70 to-black">
        <div className="container mx-auto text-center">
          <img 
            src="/lovable-uploads/3f33997c-c5f6-4835-b087-7fd5e1060a12.png" 
            alt="InnovAIte Logo" 
            className="h-32 mx-auto mb-6" 
          />
          <h1 className="text-5xl md:text-7xl font-mono font-bold mb-6 text-white">
            InnovAIte
          </h1>
          <p className="text-2xl max-w-2xl mx-auto mb-4 text-blue-200 font-medium">
            Powering the Future of AI-Driven Innovation
          </p>
          <p className="text-lg max-w-3xl mx-auto mb-8 text-white/80">
            InnovAIte is an AI-native innovation platform driven by students and researchers at Deakin University. 
            We validate, prototype, and explore emerging AI tools to accelerate startup and research development across industries.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Explore Our Work
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white bg-transparent hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500">
            /ABOUT US
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              InnovAIte is a student-led research company operating under Deakin University's SPARK 2026 initiative. 
              Our aim is to identify, validate, and showcase cutting-edge AI tools and workflows that have the potential 
              to reshape how businesses and academia adopt AI.
            </p>
            <p className="text-lg text-white/80 mb-8">
              We work closely with Deakin staff, researchers, and industry mentors to ensure our projects 
              have real-world applications and impact. Our collaborative approach brings together diverse 
              perspectives and expertise to drive innovation in AI.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30">
                <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Student-Led</h3>
                <p className="text-white/70">Driven by ambitious students with fresh perspectives</p>
              </div>
              <div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30">
                <Cpu className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">AI-Focused</h3>
                <p className="text-white/70">Specializing in cutting-edge AI technologies</p>
              </div>
              <div className="p-6 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30">
                <Globe className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Industry Connected</h3>
                <p className="text-white/70">Working with real businesses for practical solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gradient-to-b from-black to-blue-950/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500">
            /PROJECTS
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
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
                <Button variant="outline" className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
                  <GitBranch className="mr-2 h-4 w-4" />
                  View GitLab Repository
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
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
                <Button variant="outline" className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
                  <GitBranch className="mr-2 h-4 w-4" />
                  View GitLab Repository
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
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
                  <GitBranch className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
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
                  <GitBranch className="mr-2 h-4 w-4" />
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* GitLab Repositories Section */}
      <section id="gitlab" className="py-24 bg-black">
        <div className="container mx-auto">
          <h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500">
            /GITLAB REPOS
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-blue-900/10 border border-blue-900/30 flex items-center justify-between">
                <div className="flex items-center">
                  <GitBranch className="h-8 w-8 text-blue-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-white">AI Prototyping Lab Repository</h3>
                    <p className="text-sm text-white/70">Source code and documentation for our AI prototyping projects</p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View Repo
                </Button>
              </div>
              
              <div className="p-6 rounded-lg bg-blue-900/10 border border-blue-900/30 flex items-center justify-between">
                <div className="flex items-center">
                  <GitBranch className="h-8 w-8 text-blue-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-white">AI Generalist Program Repository</h3>
                    <p className="text-sm text-white/70">Resources and guides for non-technical AI adoption</p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View Repo
                </Button>
              </div>
              
              <div className="p-6 rounded-lg bg-blue-900/10 border border-blue-900/30 flex items-center justify-between">
                <div className="flex items-center">
                  <GitBranch className="h-8 w-8 text-blue-400 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-white">GitLab Access Guide</h3>
                    <p className="text-sm text-white/70">How to access and contribute to our repositories</p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View Guide
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-t from-blue-950/30 to-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-mono font-bold mb-12 text-blue-500">
            /CONTACT US
          </h2>
          <div className="max-w-lg mx-auto">
            <p className="text-lg text-white/80 mb-8">
              Interested in collaborating with InnovAIte or learning more about our projects? 
              We'd love to hear from you!
            </p>
            <div className="p-8 rounded-lg bg-blue-900/20 backdrop-blur border border-blue-500/30">
              <Mail className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Get In Touch</h3>
              <p className="text-white/70 mb-6">
                Email us at: <a href="mailto:contact@innovaite.ai" className="text-blue-400 hover:underline">contact@innovaite.ai</a>
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 w-full">
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-blue-900/30 py-12">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <img 
                src="/lovable-uploads/3f33997c-c5f6-4835-b087-7fd5e1060a12.png" 
                alt="InnovAIte Logo" 
                className="h-12 mr-3" 
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
                <a href="#" className="text-white/60 hover:text-blue-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-blue-400 transition-colors">
                  <GitBranch className="h-5 w-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-blue-400 transition-colors">
                  <Globe className="h-5 w-5" />
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
