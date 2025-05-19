
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Video, ArrowLeft, Search, List, Grid } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import MeetingUploadForm from "@/components/MeetingUploadForm";
import Navbar from "@/components/Navbar";
import { motion } from "@/components/ui/motion";
import { fadeIn, slideIn, staggerContainer } from "@/components/ui/motion/basic-animations";
import MeetingsCalendar from "@/components/MeetingsCalendar";
import { getMeetings, Meeting } from "@/services/meetingService";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";

type ViewMode = "list" | "calendar";

const TeamMeetings: React.FC = () => {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Fetch meetings with react-query
  const { 
    data: meetings = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['meetings'],
    queryFn: getMeetings,
  });

  // Handle closing the dialog after successful upload
  const handleDialogClose = () => {
    setDialogOpen(false);
    // Refetch meetings to update the list
    refetch();
  };

  // Show error toast if there's an error fetching meetings
  useEffect(() => {
    if (error) {
      toast({
        title: "Error fetching meetings",
        description: "There was a problem loading your meetings. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching meetings:", error);
    }
  }, [error, toast]);

  // Filter meetings based on search term
  const filteredMeetings = meetings.filter((meeting) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Search in title
    if (meeting.title.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    // Search in participants
    if (meeting.participants.some(participant => 
      participant.toLowerCase().includes(searchLower)
    )) {
      return true;
    }
    
    // Search in date
    if (new Date(meeting.date).toLocaleDateString().toLowerCase().includes(searchLower)) {
      return true;
    }
    
    return false;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <motion.section 
        className="py-20 bg-gradient-to-b from-black to-blue-950/50" 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-12 text-center text-blue-500"
            variants={slideIn}
            transition={{ delay: 0.2 }}
          >
            /TEAM MEETINGS
          </motion.h2>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
            variants={slideIn}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                </Link>
              </Button>
              
              <div className="border-r border-blue-500/20 h-6 mx-2"></div>
              
              <div className="hidden sm:flex items-center space-x-1">
                <Button 
                  variant={viewMode === "list" ? "default" : "ghost"} 
                  size="sm" 
                  onClick={() => setViewMode("list")} 
                  className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-400 hover:bg-blue-950/50"}
                >
                  <List className="h-4 w-4 mr-1" /> List
                </Button>
                <Button 
                  variant={viewMode === "calendar" ? "default" : "ghost"} 
                  size="sm" 
                  onClick={() => setViewMode("calendar")} 
                  className={viewMode === "calendar" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-400 hover:bg-blue-950/50"}
                >
                  <Calendar className="h-4 w-4 mr-1" /> Calendar
                </Button>
              </div>
            </div>

            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
              <Input 
                type="text" 
                placeholder="Search meetings..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-blue-950/30 border-blue-500/30 text-blue-100 placeholder:text-blue-400/60 focus:border-blue-400"
              />
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="mr-2 h-4 w-4" /> Add New Meeting
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <MeetingUploadForm onClose={handleDialogClose} />
              </DialogContent>
            </Dialog>
          </motion.div>

          {viewMode === "calendar" ? (
            <MeetingsCalendar meetings={filteredMeetings} />
          ) : (
            <>
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-blue-300">Loading meetings...</p>
                  </div>
                </div>
              ) : filteredMeetings.length === 0 ? (
                <motion.div 
                  className="text-center py-10 text-blue-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {searchTerm ? (
                    <>No meetings found matching "{searchTerm}". Try a different search term.</>
                  ) : (
                    <>
                      <p className="mb-4">No meetings have been added yet.</p>
                      <Button 
                        onClick={() => setDialogOpen(true)} 
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Add Your First Meeting
                      </Button>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                  variants={staggerContainer}
                >
                  {filteredMeetings.map((meeting, index) => (
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
                            {meeting.time && ` • ${meeting.time}`}
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
              )}
            </>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default TeamMeetings;
