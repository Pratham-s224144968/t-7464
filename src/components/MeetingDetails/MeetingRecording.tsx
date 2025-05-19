
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "@/components/ui/motion";
import { fadeIn, floatAnimation, elasticEntry } from "@/components/ui/motion";
import { Lock } from "lucide-react";

interface MeetingRecordingProps {
  recording?: string;
  date: string;
  canAccessRecordings: boolean;
}

const MeetingRecording: React.FC<MeetingRecordingProps> = ({ recording, date, canAccessRecordings }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showWatermark, setShowWatermark] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    // Hide watermark after 5 seconds if video is playing
    if (isPlaying) {
      const watermarkTimer = setTimeout(() => {
        setShowWatermark(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
        clearTimeout(watermarkTimer);
      };
    }

    return () => clearTimeout(timer);
  }, [isPlaying]);

  if (!canAccessRecordings) {
    return (
      <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Lock className="h-16 w-16 text-blue-400 mb-4" />
          </motion.div>
          <CardTitle className="text-white mb-2">Restricted Content</CardTitle>
          <CardDescription className="text-blue-300 mb-4">
            Meeting recordings are only available to authenticated users
          </CardDescription>
          <Button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Sign In to Access
          </Button>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8"
          >
            <img 
              src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png" 
              alt="Deakin University Logo"
              className="h-16 opacity-70" 
            />
          </motion.div>
        </CardContent>
      </Card>
    );
  }

  if (!recording) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center p-8 text-blue-300 glass-effect rounded-lg flex flex-col items-center justify-center h-64"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatAnimation}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <path d="M22 4 12 14.01l-3-3"></path>
          </svg>
        </motion.div>
        <motion.p
          animate={{ 
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          No recording available
        </motion.p>
        <motion.img 
          src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png"
          alt="Deakin University Logo"
          className="w-24 mt-4 opacity-70"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="w-full"
    >
      <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur overflow-hidden">
        <CardHeader className="bg-blue-900/20 relative">
          <motion.div 
            className="absolute top-0 right-0 w-full h-1 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ background: "linear-gradient(90deg, #3b82f6, #8b5cf6)" }}
          />
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Meeting Recording</CardTitle>
              <CardDescription className="text-blue-300">
                Video recording from {date}
              </CardDescription>
            </div>
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={elasticEntry}
            >
              <img 
                src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png"
                alt="Deakin University Logo" 
                className="h-10 w-10"
              />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <motion.div 
            className="aspect-video bg-blue-900/30 rounded-md flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {!isLoaded && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-blue-950/80 z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="loading-spinner"></div>
              </motion.div>
            )}
            <video
              controls
              className="w-full h-full rounded-md"
              poster="https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1000"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onLoadedData={() => setIsLoaded(true)}
            >
              <source src={recording} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {!isPlaying && isLoaded && (
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center cursor-pointer z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  const videoEl = document.querySelector('video');
                  if (videoEl) {
                    videoEl.play();
                  }
                }}
              >
                <motion.div 
                  className="w-20 h-20 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="motion-svg"
                    style={{
                      animation: "pulse 2s infinite"
                    }}
                  >
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                </motion.div>
              </motion.div>
            )}
            
            {/* Add Deakin watermark that fades away when playing */}
            {showWatermark && (
              <motion.div 
                className="absolute bottom-4 right-4 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: isPlaying ? 0.6 : 0.8 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <img 
                  src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png" 
                  alt="Deakin University Logo"
                  className="h-12 w-12"
                />
              </motion.div>
            )}
            
            {/* Add dynamic video progress bar */}
            {isPlaying && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-10"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 30, ease: "linear" }}
              />
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MeetingRecording;
