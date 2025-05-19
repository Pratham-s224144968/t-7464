
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { motion } from "@/components/ui/motion";
import { ParticleBackground } from "@/components/ui/motion/particles";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import TeamMeetings from "./pages/TeamMeetings";
import MeetingDetail from "./pages/MeetingDetail";
import MeetingAdmin from "./pages/MeetingAdmin";
import TeamMembers from "./pages/TeamMembers";
import BlogPosts from "./pages/BlogPosts";
import BlogPostDetail from "./pages/BlogPostDetail";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-900 to-purple-900 overflow-hidden">
        <ParticleBackground variant="cyber" density="medium" />
        
        <div className="text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="mb-6"
          >
            <img 
              src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png" 
              alt="Deakin University Logo" 
              className="w-32 h-32 mx-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="flex space-x-2 mb-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="h-3 w-3 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            <div className="text-white text-lg font-medium">Loading InnovAIte...</div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <div className="relative">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <BrowserRouter>
                  {/* Deakin Logo in corner with enhanced animation */}
                  <motion.div 
                    className="fixed bottom-4 right-4 z-50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 260, 
                      damping: 20,
                      delay: 1 
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 5,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/20 blur-md"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <img 
                      src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png" 
                      alt="Deakin University Logo" 
                      className="h-14 w-14 opacity-80 hover:opacity-100 transition-opacity relative z-10"
                      title="Deakin University"
                    />
                  </motion.div>
                  
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/meetings" element={<TeamMeetings />} />
                    <Route path="/meetings/:id" element={<MeetingDetail />} />
                    <Route path="/admin/meetings" element={<MeetingAdmin />} />
                    <Route path="/team" element={<TeamMembers />} />
                    <Route path="/blog" element={<BlogPosts />} />
                    <Route path="/blog/:id" element={<BlogPostDetail />} />
                  </Routes>
                </BrowserRouter>
              </motion.div>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
