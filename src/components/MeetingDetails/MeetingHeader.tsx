
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { motion } from "@/components/ui/motion";

interface MeetingHeaderProps {
  title: string;
  date: string;
  participants: string[];
  canAccessRestrictedContent: boolean;
}

const MeetingHeader: React.FC<MeetingHeaderProps> = ({
  title,
  date,
  participants,
  canAccessRestrictedContent,
}) => {
  return (
    <>
      <motion.div
        className="mb-6"
        initial={{
          y: 20,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.3,
          duration: 0.5,
        }}
      >
        <Button
          variant="ghost"
          asChild
          className="mb-4 text-blue-400 border-blue-500/50 hover:bg-blue-950/50"
        >
          <Link to="/meetings">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Meetings
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-blue-300">
          {new Date(date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="mt-2 text-blue-200">
          <strong>Participants:</strong> {participants.join(", ")}
        </div>

        {!canAccessRestrictedContent && (
          <div className="mt-4 p-3 border border-amber-500/30 bg-amber-900/20 rounded-md flex items-center text-amber-200">
            <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
            <p>
              Some content requires authentication with a Deakin email address
              (@deakin.edu.au)
            </p>
          </div>
        )}
      </motion.div>
    </>
  );
};

export default MeetingHeader;
