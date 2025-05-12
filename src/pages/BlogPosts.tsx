import Navbar from "@/components/Navbar";
import BlogPostCard from "@/components/BlogPostCard";
import { blogPosts } from "@/data/blogPosts";
import { BookOpenText, Youtube, FileVideo } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/ui/motion";

const categories = ["All", "AI Education", "Development", "Ethics", "Sprint Review", "AI Society"];

const BlogPosts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.section className="py-16 bg-gradient-to-br from-blue-900/70 to-black" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.6
      }}>
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
            <BookOpenText className="w-16 h-16 mx-auto text-blue-400 mb-4" />
          </motion.div>
          <motion.h1 className="text-4xl md:text-5xl font-mono font-bold mb-6 text-white" initial={{
            y: 30,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.3,
            duration: 0.5
          }}>
            Blog &amp; Vlogs
          </motion.h1>
          <motion.p className="text-lg max-w-2xl mx-auto mb-8 text-white/80" initial={{
            y: 30,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.4,
            duration: 0.5
          }}>
            The latest insights, updates, and knowledge from the InnovAIte team
          </motion.p>
          
          <motion.div className="flex flex-wrap justify-center gap-2 mt-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}>
            {categories.map((category) => (
              <Button 
                key={category}
                variant={selectedCategory === category ? "default" : "outline"} 
                size="sm"
                className={selectedCategory === category 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "text-white/70 border-blue-500/30 hover:bg-blue-950/50"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </motion.section>
      
      {/* Blog Posts Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div 
                key={post.id} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <BlogPostCard post={post} />
              </motion.div>
            ))}
          </div>
          
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-lg">No posts found in this category.</p>
              <Button 
                variant="outline" 
                className="mt-4 text-blue-400 border-blue-500/50 hover:bg-blue-950/50"
                onClick={() => setSelectedCategory("All")}
              >
                Show All Posts
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Video Playlist Section */}
      <section className="py-16 bg-gradient-to-b from-black to-blue-950/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-mono font-bold text-blue-500 mb-4">/YOUTUBE CHANNEL</h2>
              <p className="text-white/80 max-w-2xl">
                Check out our latest videos on the InnovAIte YouTube channel
              </p>
            </div>
            <Button className="mt-4 md:mt-0 bg-red-600 hover:bg-red-700" onClick={() => window.open("https://www.youtube.com", "_blank")}>
              <Youtube className="mr-2 h-4 w-4" />
              Subscribe to Channel
            </Button>
          </div>
          
          <div className="aspect-video w-full max-w-4xl mx-auto mb-12 rounded-lg overflow-hidden shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-blue-950/30 flex items-center justify-center">
              {/* This would be replaced with actual YouTube embed when available */}
              <div className="text-center p-10">
                <FileVideo className="w-20 h-20 text-blue-400 mx-auto mb-4" />
                <p className="text-white/80">
                  Featured video placeholder - replace with actual YouTube embed
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/blog">View All Videos</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
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
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="https://gitlab.deakin.edu.au/innovaite/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                  <FileVideo className="h-5 w-5" />
                </a>
                <a href="https://teams.microsoft.com/l/team/19%3AcW6v8QDG1uJuK3IebazxDFvL7RLh8SPVLP7ZMK8jCH01%40thread.tacv2/conversations?groupId=64f97721-41a3-47c1-adad-e07a0e609089&tenantId=d02378ec-1688-46d5-8540-1c28b5f470f6" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                  <BookOpenText className="h-5 w-5" />
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

export default BlogPosts;
