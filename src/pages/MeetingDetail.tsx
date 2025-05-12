
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Video, ArrowLeft } from "lucide-react";

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
    return <div className="container mx-auto py-8">Meeting not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link to="/meetings">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Meetings
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{meeting.title}</h1>
        <p className="text-muted-foreground">
          {new Date(meeting.date).toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <div className="mt-2">
          <strong>Participants:</strong> {meeting.participants.join(", ")}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="recording" disabled={!meeting.hasRecording}>
            <Video className="mr-2 h-4 w-4" /> Recording
          </TabsTrigger>
          <TabsTrigger value="minutes" disabled={!meeting.hasMinutes}>
            <FileText className="mr-2 h-4 w-4" /> Minutes
          </TabsTrigger>
          <TabsTrigger value="summary" disabled={!meeting.hasSummary}>
            <FileText className="mr-2 h-4 w-4" /> AI Summary
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recording" className="space-y-4">
          {meeting.recording ? (
            <Card>
              <CardHeader>
                <CardTitle>Meeting Recording</CardTitle>
                <CardDescription>Video recording from {meeting.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
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
            <div className="text-center p-8">No recording available</div>
          )}
        </TabsContent>
        
        <TabsContent value="minutes" className="space-y-4">
          {meeting.minutes ? (
            <Card>
              <CardHeader>
                <CardTitle>Meeting Minutes</CardTitle>
                <CardDescription>Notes from the meeting on {meeting.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{meeting.minutes}</p>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center p-8">No minutes available</div>
          )}
        </TabsContent>
        
        <TabsContent value="summary" className="space-y-4">
          {meeting.summary ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>AI Generated Summary</CardTitle>
                  <CardDescription>Auto-generated summary of the meeting content</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-line">{meeting.summary.text}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Key Takeaways</CardTitle>
                  <CardDescription>Important points from the meeting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    {meeting.summary.keyTakeaways.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="text-center p-8">No AI summary available</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MeetingDetail;
