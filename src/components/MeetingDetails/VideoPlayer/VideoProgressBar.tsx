
import React from "react";
import { motion } from "@/components/ui/motion";

const VideoProgressBar: React.FC = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-10"
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{ duration: 30, ease: "linear" }}
    />
  );
};

export default VideoProgressBar;
