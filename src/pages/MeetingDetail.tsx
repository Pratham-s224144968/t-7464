
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import MeetingHeader from "@/components/MeetingDetails/MeetingHeader";
import MeetingTabs from "@/components/MeetingDetails/MeetingTabs";
import { useQuery } from "@tanstack/react-query";
import { getMeetingById } from "@/services/meetingQueries";

const MeetingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("minutes"); // Default to minutes tab
  const { isAuthenticated, isDeakinUser } = useAuth();
  const navigate = useNavigate();
  
  console.log("Starting meeting detail page with ID:", id);
  
  const { data: meeting, isLoading, error } = useQuery({
    queryKey: ['meeting', id],
    queryFn: async () => {
      if (!id) {
        console.error("No meeting ID provided");
        return null;
      }
      
      try {
        const meeting = await getMeetingById(id);
        
        if (!meeting) {
          console.error("No meeting found with ID:", id);
          return null;
        }
        
        console.log("Meeting fetched successfully:", {
          id: meeting.id,
          title: meeting.title,
          hasMinutes: meeting.hasMinutes,
          minutesExists: meeting.minutes !== undefined,
          minutesType: typeof meeting.minutes,
          minutesLength: meeting.minutes ? meeting.minutes.length : 0,
          minutesPreview: meeting.minutes ? meeting.minutes.substring(0, 100) + '...' : 'No minutes'
        });
        
        return meeting;
      } catch (err) {
        console.error("Error fetching meeting:", err);
        throw err;
      }
    },
    enabled: !!id
  });

  useEffect(() => {
    if (meeting) {
      // Set the active tab based on available content
      if (meeting.hasMinutes) {
        setActiveTab("minutes");
      } else if (meeting.hasRecording) {
        setActiveTab("recording");
      } else if (meeting.hasSummary) {
        setActiveTab("summary");
      }
    }
  }, [meeting]);

  const handleRestrictedContentClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to access this content",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    if (!isDeakinUser) {
      toast({
        title: "Access Denied",
        description: "This content is only available to users with a Deakin email address",
        variant: "destructive",
      });
      return;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white pt-28 pb-8 px-8">
        <div className="container mx-auto text-center">
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error fetching meeting:", error);
    toast({
      title: "Error",
      description: "Failed to load meeting details. Please try again.",
      variant: "destructive",
    });
    return (
      <div className="min-h-screen bg-black text-white pt-28 pb-8 px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500">
            /ERROR LOADING MEETING
          </h2>
          <div className="text-center">
            <p className="text-white/70 mb-6">There was an error loading the meeting details.</p>
            <Button 
              onClick={() => navigate('/meetings')} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Meetings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!meeting) {
    return (
      <div className="min-h-screen bg-black text-white pt-28 pb-8 px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500">
            /MEETING NOT FOUND
          </h2>
          <div className="text-center">
            <p className="text-white/70 mb-6">The requested meeting could not be found.</p>
            <Button 
              onClick={() => navigate('/meetings')} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to Meetings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Check if user can access restricted content (minutes and summary)
  const canAccessRestrictedContent = isAuthenticated && isDeakinUser;
  // Recordings now require basic authentication (any user)
  const canAccessRecordings = isAuthenticated;

  // Debug log entire meeting object
  console.log("Full meeting object:", meeting);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-8 px-8">
      <motion.section 
        className="py-20 bg-gradient-to-b from-black to-blue-950/50" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-12 text-center text-blue-500" 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            /MEETING DETAILS
          </motion.h2>
          
          <MeetingHeader
            title={meeting.title}
            date={meeting.date}
            participants={meeting.participants}
            canAccessRestrictedContent={canAccessRestrictedContent}
            hideParticipants={!isAuthenticated}
          />

          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <MeetingTabs
              meeting={meeting}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              canAccessRestrictedContent={canAccessRestrictedContent}
              canAccessRecordings={canAccessRecordings}
              handleRestrictedContentClick={handleRestrictedContentClick}
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default MeetingDetail;
