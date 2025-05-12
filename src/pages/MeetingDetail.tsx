
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "@/components/ui/motion";

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

  if (!meeting) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto py-20">Meeting not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <motion.section className="py-20 bg-gradient-to-b from-black to-blue-950/50" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8
      }}>
        <div className="container mx-auto">
          <motion.h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2,
            duration: 0.5
          }}>
            /MEETING DETAILS
          </motion.h2>
          
          <motion.div className="mb-6" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.3,
            duration: 0.5
          }}>
            <Button variant="ghost" asChild className="mb-4 text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
              <Link to="/meetings">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Meetings
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-white">{meeting.title}</h1>
            <p className="text-blue-300">
              {new Date(meeting.date).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <div className="mt-2 text-blue-200">
              <strong>Participants:</strong> {meeting.participants.join(", ")}
            </div>
          </motion.div>

          <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.4,
            duration: 0.5
          }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8 bg-blue-900/30">
                <TabsTrigger 
                  value="recording" 
                  disabled={!meeting.hasRecording}
                  className="data-[state=active]:bg-blue-800/50 data-[state=active]:text-blue-200"
                >
                  <Video className="mr-2 h-4 w-4" /> Recording
                </TabsTrigger>
                <TabsTrigger 
                  value="minutes" 
                  disabled={!meeting.hasMinutes}
                  className="data-[state=active]:bg-blue-800/50 data-[state=active]:text-blue-200"
                >
                  <FileText className="mr-2 h-4 w-4" /> Minutes
                </TabsTrigger>
                <TabsTrigger 
                  value="summary" 
                  disabled={!meeting.hasSummary}
                  className="data-[state=active]:bg-blue-800/50 data-[state=active]:text-blue-200"
                >
                  <FileText className="mr-2 h-4 w-4" /> AI Summary
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="recording" className="space-y-4">
                {meeting.recording ? (
                  <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
                    <CardHeader className="bg-blue-900/20">
                      <CardTitle className="text-white">Meeting Recording</CardTitle>
                      <CardDescription className="text-blue-300">Video recording from {meeting.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-blue-900/30 rounded-md flex items-center justify-center">
                        <video 
                          controls 
                          className="w-full h-full rounded-md"
                          poster="https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1000"
                        >
                          <source src={meeting.recording} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center p-8 text-blue-300">No recording available</div>
                )}
              </TabsContent>
              
              <TabsContent value="minutes" className="space-y-4">
                {meeting.minutes ? (
                  <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
                    <CardHeader className="bg-blue-900/20">
                      <CardTitle className="text-white">Meeting Minutes</CardTitle>
                      <CardDescription className="text-blue-300">Notes from the meeting on {meeting.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="whitespace-pre-line text-blue-200">{meeting.minutes}</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="text-center p-8 text-blue-300">No minutes available</div>
                )}
              </TabsContent>
              
              <TabsContent value="summary" className="space-y-4">
                {meeting.summary ? (
                  <>
                    <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
                      <CardHeader className="bg-blue-900/20">
                        <CardTitle className="text-white">AI Generated Summary</CardTitle>
                        <CardDescription className="text-blue-300">Auto-generated summary of the meeting content</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="whitespace-pre-line text-blue-200">{meeting.summary.text}</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
                      <CardHeader className="bg-blue-900/20">
                        <CardTitle className="text-white">Key Takeaways</CardTitle>
                        <CardDescription className="text-blue-300">Important points from the meeting</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="list-disc pl-6 space-y-2 text-blue-200">
                          {meeting.summary.keyTakeaways.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <div className="text-center p-8 text-blue-300">No AI summary available</div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default MeetingDetail;
