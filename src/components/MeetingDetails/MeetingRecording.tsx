
import React from "react";
import { motion } from "@/components/ui/motion";
import { fadeIn } from "@/components/ui/motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import VideoPlayer from "./VideoPlayer";
import RestrictedContent from "./RestrictedContent";
import NoRecordingNotice from "./NoRecordingNotice";

interface MeetingRecordingProps {
  recording?: string;
  date: string;
  canAccessRecordings: boolean;
}

const MeetingRecording: React.FC<MeetingRecordingProps> = ({ 
  recording, 
  date, 
  canAccessRecordings 
}) => {
  if (!canAccessRecordings) {
    return <RestrictedContent />;
  }

  if (!recording) {
    return <NoRecordingNotice />;
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
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
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
          <VideoPlayer src={recording} />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MeetingRecording;
