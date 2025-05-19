
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import MeetingHeader from "@/components/MeetingDetails/MeetingHeader";
import MeetingTabs from "@/components/MeetingDetails/MeetingTabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type Meeting } from "@/services/types";
import { Json } from "@/integrations/supabase/types";

const MeetingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("recording");
  const { isAuthenticated, isDeakinUser } = useAuth();
  const navigate = useNavigate();
  
  const { data: meeting, isLoading, error } = useQuery({
    queryKey: ['meeting', id],
    queryFn: async () => {
      try {
        if (!id) return null;
        
        const { data, error } = await supabase
          .from('meetings')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        if (!data) return null;
        
        console.log("Meeting data retrieved:", data);
        
        // Parse summary data correctly based on its type
        let parsedSummary;
        if (data.summary) {
          if (typeof data.summary === 'object' && !Array.isArray(data.summary)) {
            // Use type assertion with a more specific type to access properties safely
            const summaryObj = data.summary as { [key: string]: any };
            parsedSummary = {
              text: summaryObj.text || "",
              keyTakeaways: summaryObj.key_takeaways || []
            };
          } else {
            // Fallback if summary is not in expected format
            parsedSummary = {
              text: String(data.summary),
              keyTakeaways: []
            };
          }
        }
        
        // Transform the data to match our frontend Meeting type
        return {
          id: data.id,
          title: data.title,
          date: data.date,
          participants: data.participants || [],
          hasRecording: data.has_recording || false,
          hasMinutes: !!data.minutes,
          hasSummary: data.has_summary || false,
          recording: data.recording_url,
          minutes: data.minutes,
          summary: parsedSummary
        } as Meeting;
      } catch (err) {
        console.error("Error fetching meeting:", err);
        return null;
      }
    }
  });

  useEffect(() => {
    if (meeting) {
      // Set the active tab based on available content
      if (meeting.hasRecording) {
        setActiveTab("recording");
      } else if (meeting.hasMinutes) {
        setActiveTab("minutes");
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

  if (error || !meeting) {
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
