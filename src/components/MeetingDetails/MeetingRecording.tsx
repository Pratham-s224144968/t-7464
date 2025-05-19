
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "@/components/ui/motion";
import { fadeIn } from "@/components/ui/motion";

interface MeetingRecordingProps {
  recording?: string;
  date: string;
}

const MeetingRecording: React.FC<MeetingRecordingProps> = ({ recording, date }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!recording) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="text-center p-8 text-blue-300 glass-effect rounded-lg flex flex-col items-center justify-center h-64"
      >
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.95, 1, 0.95],
          }}
          transition={{ duration: 3, repeat: Infinity }}
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
          <CardTitle className="text-white">Meeting Recording</CardTitle>
          <CardDescription className="text-blue-300">
            Video recording from {date}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <motion.div 
            className="aspect-video bg-blue-900/30 rounded-md flex items-center justify-center relative overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            {!isLoaded && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-blue-950/80"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
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
                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-center cursor-pointer"
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
                  className="w-20 h-20 bg-blue-500/80 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
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
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MeetingRecording;
