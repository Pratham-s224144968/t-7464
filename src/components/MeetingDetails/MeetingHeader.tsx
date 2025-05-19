
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Calendar, Lock } from "lucide-react";
import { motion } from "@/components/ui/motion";

interface MeetingHeaderProps {
  title: string;
  date: string;
  participants: string[];
  canAccessRestrictedContent: boolean;
  hideParticipants?: boolean;
}

const MeetingHeader: React.FC<MeetingHeaderProps> = ({
  title,
  date,
  participants,
  canAccessRestrictedContent,
  hideParticipants = false,
}) => {
  // Format the date to be more readable
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur mb-8">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          <div className="flex items-center justify-center text-blue-300">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center mt-4">
          <div className="flex items-center text-blue-300 mr-4">
            <User className="h-5 w-5 mr-2" />
            {hideParticipants ? (
              <motion.div
                initial={{ opacity: 0.8 }}
                animate={{ 
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="flex items-center"
              >
                <Lock className="h-4 w-4 mr-2 text-blue-400" />
                <span className="text-blue-400">Participants hidden</span>
              </motion.div>
            ) : (
              <span>
                {participants.length} participant{participants.length !== 1 && "s"}
              </span>
            )}
          </div>

          {!hideParticipants && (
            <div className="mt-2 sm:mt-0">
              {participants.map((participant, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="mr-2 mb-2 bg-blue-900/20 border-blue-500/30 text-blue-100"
                >
                  {participant}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingHeader;
