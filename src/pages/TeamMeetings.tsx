
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Video } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MeetingUploadForm from "@/components/MeetingUploadForm";

type Meeting = {
  id: string;
  title: string;
  date: string;
  participants: string[];
  hasRecording: boolean;
  hasMinutes: boolean;
  hasSummary: boolean;
};

const SAMPLE_MEETINGS: Meeting[] = [
  {
    id: "1",
    title: "Q2 Strategy Planning",
    date: "2025-04-15",
    participants: ["John Doe", "Jane Smith", "Robert Johnson"],
    hasRecording: true,
    hasMinutes: true,
    hasSummary: true,
  },
  {
    id: "2",
    title: "Product Roadmap Review",
    date: "2025-04-22",
    participants: ["Jane Smith", "Michael Brown", "Emily Davis"],
    hasRecording: true,
    hasMinutes: true,
    hasSummary: false,
  },
  {
    id: "3",
    title: "Marketing Campaign Kickoff",
    date: "2025-05-01",
    participants: ["Robert Johnson", "Emily Davis", "Sarah Wilson"],
    hasRecording: true,
    hasMinutes: false,
    hasSummary: false,
  },
];

const TeamMeetings: React.FC = () => {
  const [meetings] = useState<Meeting[]>(SAMPLE_MEETINGS);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Team Meetings</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Calendar className="mr-2 h-4 w-4" /> Add New Meeting
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <MeetingUploadForm onClose={() => setDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-card">
              <CardTitle>{meeting.title}</CardTitle>
              <CardDescription>
                {new Date(meeting.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-2 text-sm text-muted-foreground">
                <strong>Participants:</strong> {meeting.participants.join(", ")}
              </p>
              <div className="flex gap-2 mt-4">
                {meeting.hasRecording && (
                  <span className="flex items-center text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                    <Video className="mr-1 h-3 w-3" /> Recording
                  </span>
                )}
                {meeting.hasMinutes && (
                  <span className="flex items-center text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                    <FileText className="mr-1 h-3 w-3" /> Minutes
                  </span>
                )}
                {meeting.hasSummary && (
                  <span className="flex items-center text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">
                    <FileText className="mr-1 h-3 w-3" /> AI Summary
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50">
              <Button variant="outline" asChild className="w-full">
                <Link to={`/meetings/${meeting.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamMeetings;
