
import React from "react";
import { motion } from "@/components/ui/motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpenText } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { ParticleBackground } from "@/components/ui/motion/particles";

const Blog = () => {
  // Get the latest 3 blog posts
  const latestPosts = [...blogPosts].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 3);

  return (
    <motion.section id="blog" className="relative py-20 bg-black/20 backdrop-blur-sm" initial={{
      opacity: 0
    }} whileInView={{
      opacity: 1
    }} transition={{
      duration: 0.8
    }} viewport={{
      once: true
    }}>
      {/* Subtle particle background specific to this section */}
      <ParticleBackground 
        variant="blue" 
        density="low" 
        speed="slow" 
        className="absolute inset-0 opacity-20" 
      />
      
      {/* Add subtle blue glow that doesn't hide particles */}
      <motion.div 
        className="absolute inset-0 bg-blue-500/5 pointer-events-none"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <motion.h2 className="text-3xl font-mono font-bold mb-6 text-center text-blue-500" initial={{
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
          /BLOG & VLOGS
        </motion.h2>
        
        <motion.p className="text-lg max-w-2xl mx-auto mb-12 text-center text-white/80" initial={{
          y: 20,
          opacity: 0
        }} whileInView={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.3,
          duration: 0.5
        }} viewport={{
          once: true
        }}>
          The latest insights, updates, and video content from our team
        </motion.p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {latestPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-blue-500/30 bg-blue-950/20 backdrop-blur hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 h-full flex flex-col">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-1 bg-blue-600/50 rounded-full text-xs text-blue-200">{post.category}</span>
                  </div>
                  <CardTitle className="text-lg font-semibold text-white mt-2 line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-white/80 text-sm line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild className="w-full text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
                    <Link to={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link to="/blog">
              <BookOpenText className="mr-2 h-4 w-4" />
              View All Blog Posts
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Blog;
