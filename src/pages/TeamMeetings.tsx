
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Video, ArrowLeft } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MeetingUploadForm from "@/components/MeetingUploadForm";
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
            /TEAM MEETINGS
          </motion.h2>
          
          <motion.div className="flex justify-between items-center mb-8" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.3,
            duration: 0.5
          }}>
            <Button variant="ghost" asChild className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="mr-2 h-4 w-4" /> Add New Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <MeetingUploadForm onClose={() => setDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.4,
            duration: 0.5
          }}>
            {meetings.map((meeting, index) => (
              <motion.div 
                key={meeting.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
              >
                <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  <CardHeader className="bg-blue-900/20">
                    <CardTitle className="text-white">{meeting.title}</CardTitle>
                    <CardDescription className="text-blue-200">
                      {new Date(meeting.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="mb-2 text-sm text-blue-300">
                      <strong>Participants:</strong> {meeting.participants.join(", ")}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {meeting.hasRecording && (
                        <span className="flex items-center text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                          <Video className="mr-1 h-3 w-3" /> Recording
                        </span>
                      )}
                      {meeting.hasMinutes && (
                        <span className="flex items-center text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                          <FileText className="mr-1 h-3 w-3" /> Minutes
                        </span>
                      )}
                      {meeting.hasSummary && (
                        <span className="flex items-center text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded">
                          <FileText className="mr-1 h-3 w-3" /> AI Summary
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="bg-blue-900/10">
                    <Button variant="outline" asChild className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200">
                      <Link to={`/meetings/${meeting.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default TeamMeetings;
