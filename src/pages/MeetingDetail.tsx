
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { motion } from "@/components/ui/motion";
import MeetingHeader from "@/components/MeetingDetails/MeetingHeader";
import MeetingTabs from "@/components/MeetingDetails/MeetingTabs";

type Meeting = {
  id: string;
  title: string;
  date: string;
  participants: string[];
  hasRecording: boolean;
  hasMinutes: boolean;
  hasSummary: boolean;
  recording?: string;
  minutes?: string;
  summary?: {
    text: string;
    keyTakeaways: string[];
  };
};

// Sample data - in a real app this would come from an API or database
const SAMPLE_MEETINGS: Record<string, Meeting> = {
  "1": {
    id: "1",
    title: "Q2 Strategy Planning",
    date: "2025-04-15",
    participants: ["John Doe", "Jane Smith", "Robert Johnson"],
    hasRecording: true,
    hasMinutes: true,
    hasSummary: true,
    recording: "https://example.com/recordings/q2-strategy.mp4",
    minutes: "During this meeting, we discussed our Q2 strategy including key market initiatives, budget allocations, and performance targets. The team agreed to focus on expanding our product line and improving customer retention rates. John will lead the product expansion, while Jane will develop the retention program.",
    summary: {
      text: "The Q2 strategy meeting covered market initiatives, budget allocations, and performance targets with a consensus on two primary objectives: product line expansion and customer retention improvement. The team identified competitive advantages and allocated resources accordingly, with clear ownership and timelines established for each initiative.",
      keyTakeaways: [
        "Focus on expanding product line with 3 new offerings by end of Q2",
        "Develop customer retention program aiming for 15% improvement",
        "Allocate 40% of Q2 budget to marketing initiatives",
        "Schedule bi-weekly check-ins to track progress",
        "Coordinate with Sales team for integrated approach"
      ]
    }
  },
  "2": {
    id: "2",
    title: "Product Roadmap Review",
    date: "2025-04-22",
    participants: ["Jane Smith", "Michael Brown", "Emily Davis"],
    hasRecording: true,
    hasMinutes: true,
    hasSummary: false,
    recording: "https://example.com/recordings/product-roadmap.mp4",
    minutes: "The team reviewed the current product roadmap and made several adjustments to the timeline. Feature X was prioritized for the next release, while Feature Y was pushed back to Q3. Michael presented user research findings that will inform our next design sprint."
  },
  "3": {
    id: "3",
    title: "Marketing Campaign Kickoff",
    date: "2025-05-01",
    participants: ["Robert Johnson", "Emily Davis", "Sarah Wilson"],
    hasRecording: true,
    hasMinutes: false,
    hasSummary: false,
    recording: "https://example.com/recordings/marketing-campaign.mp4"
  }
};

const MeetingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [activeTab, setActiveTab] = useState("recording");
  const { isAuthenticated, isDeakinUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, you'd fetch the meeting data from an API
    if (id && SAMPLE_MEETINGS[id]) {
      setMeeting(SAMPLE_MEETINGS[id]);
      
      // Set the active tab based on available content
      if (SAMPLE_MEETINGS[id].hasRecording) {
        setActiveTab("recording");
      } else if (SAMPLE_MEETINGS[id].hasMinutes) {
        setActiveTab("minutes");
      } else if (SAMPLE_MEETINGS[id].hasSummary) {
        setActiveTab("summary");
      }
    }
  }, [id]);

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

  if (!meeting) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto py-20">Meeting not found</div>
      </div>
    );
  }

  // Check if user can access restricted content (minutes and summary)
  const canAccessRestrictedContent = isAuthenticated && isDeakinUser;

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
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
              handleRestrictedContentClick={handleRestrictedContentClick}
            />
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default MeetingDetail;
