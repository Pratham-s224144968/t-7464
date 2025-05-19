
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, FileText, Search, Trash, Video, Edit, Eye, Calendar, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "@/components/ui/motion";
import { fadeIn, slideIn } from "@/components/ui/motion/basic-animations";
import { deleteMeeting, processTranscript, getMeetings, type Meeting } from "@/services/meetingService";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MeetingUploadForm from "@/components/MeetingUploadForm";
import { useAuth } from "@/contexts/AuthContext";
import RestrictedContent from "@/components/MeetingDetails/RestrictedContent";

const MeetingAdmin: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, isDeakinUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  // Redirect non-Deakin users
  useEffect(() => {
    // Check authentication after a short delay to ensure auth state is loaded
    const checkAccess = setTimeout(() => {
      if (isAuthenticated === false || (isAuthenticated && !isDeakinUser)) {
        // Non-Deakin users shouldn't be on this page
        navigate('/meetings');
      }
    }, 500);
    
    return () => clearTimeout(checkAccess);
  }, [isAuthenticated, isDeakinUser, navigate]);

  // If not authenticated or not Deakin user, show restricted content
  if (!isAuthenticated || !isDeakinUser) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-lg mx-auto"
          >
            <RestrictedContent 
              title="Administrator Access Only"
              description="This area is restricted to Deakin staff members. Please sign in with your Deakin account to access administration features."
              buttonText="Sign In with Deakin"
            />
          </motion.div>
        </div>
      </div>
    );
  }

  // Fetch meetings with react-query
  const { 
    data: meetings = [], 
    isLoading, 
    error
  } = useQuery({
    queryKey: ['meetings'],
    queryFn: getMeetings,
  });

  // Delete meeting mutation
  const deleteMeetingMutation = useMutation({
    mutationFn: (id: string) => deleteMeeting(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
      toast({
        title: "Meeting deleted",
        description: "The meeting has been successfully deleted",
      });
      setDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error deleting meeting",
        description: "There was a problem deleting the meeting",
        variant: "destructive",
      });
      console.error("Error deleting meeting:", error);
    }
  });

  // Process transcript mutation
  const processTranscriptMutation = useMutation({
    mutationFn: (id: string) => processTranscript(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meetings'] });
      toast({
        title: "Transcript processed",
        description: "The AI summary has been generated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error processing transcript",
        description: "There was a problem generating the AI summary",
        variant: "destructive",
      });
      console.error("Error processing transcript:", error);
    }
  });

  // Handle deletions
  const handleDeleteClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedMeeting) {
      deleteMeetingMutation.mutate(selectedMeeting.id);
    }
  };

  // Handle dialog close after upload
  const handleUploadClose = () => {
    setUploadDialogOpen(false);
    queryClient.invalidateQueries({ queryKey: ['meetings'] });
  };

  // Filter meetings based on search term
  const filteredMeetings = meetings.filter((meeting) => {
    const searchLower = searchTerm.toLowerCase();
    
    if (meeting.title.toLowerCase().includes(searchLower)) {
      return true;
    }
    
    if (meeting.participants.some(participant => 
      participant.toLowerCase().includes(searchLower)
    )) {
      return true;
    }
    
    if (new Date(meeting.date).toLocaleDateString().toLowerCase().includes(searchLower)) {
      return true;
    }
    
    return false;
  });

  // Handle transcript processing
  const handleProcessTranscript = (meeting: Meeting) => {
    if (meeting.transcript_url && !meeting.hasSummary) {
      processTranscriptMutation.mutate(meeting.id);
    } else {
      toast({
        title: "Cannot process transcript",
        description: "This meeting either has no transcript or already has a summary",
        variant: "destructive",
      });
    }
  };

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
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center mb-8"
            variants={slideIn}
          >
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <Button variant="ghost" asChild className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
                <Link to="/meetings">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Meetings
                </Link>
              </Button>
              <h2 className="text-2xl font-mono font-bold text-blue-500">
                /MEETINGS ADMIN
              </h2>
            </div>

            <div className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
                <Input 
                  type="text" 
                  placeholder="Search meetings..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-blue-950/30 border-blue-500/30 text-blue-100 placeholder:text-blue-400/60 focus:border-blue-400"
                />
              </div>

              <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                    <Calendar className="mr-2 h-4 w-4" /> New Meeting
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <MeetingUploadForm onClose={handleUploadClose} />
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
          
          <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
            <CardHeader>
              <CardTitle>Meeting Management</CardTitle>
              <CardDescription>Manage all team meetings and their content</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-10">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-4 text-blue-300">Loading meetings...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-300">
                  Error loading meetings. Please try again.
                </div>
              ) : filteredMeetings.length === 0 ? (
                <div className="text-center py-10 text-blue-300">
                  {searchTerm ? (
                    <>No meetings found matching "{searchTerm}". Try a different search term.</>
                  ) : (
                    <>
                      <p className="mb-4">No meetings have been added yet.</p>
                      <Button 
                        onClick={() => setUploadDialogOpen(true)} 
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Add Your First Meeting
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Participants</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredMeetings.map((meeting) => (
                        <TableRow key={meeting.id}>
                          <TableCell className="font-medium">{meeting.title}</TableCell>
                          <TableCell>
                            {new Date(meeting.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {meeting.participants.length > 2
                              ? `${meeting.participants[0]}, ${meeting.participants[1]}, +${meeting.participants.length - 2} more`
                              : meeting.participants.join(", ")}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
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
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/meetings/${meeting.id}`)}
                                className="border-blue-500/30 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {meeting.transcript_url && !meeting.hasSummary && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleProcessTranscript(meeting)}
                                  className="border-purple-500/30 text-purple-300 hover:bg-purple-900/30 hover:text-purple-200"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteClick(meeting)}
                                className="border-red-500/30 text-red-300 hover:bg-red-900/30 hover:text-red-200"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Meeting</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this meeting? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedMeeting && (
              <Card className="bg-blue-950/20 border-blue-500/30">
                <CardHeader className="py-4">
                  <CardTitle className="text-lg">{selectedMeeting.title}</CardTitle>
                  <CardDescription>
                    {new Date(selectedMeeting.date).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
          <DialogFooter className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteMeetingMutation.isPending}
            >
              {deleteMeetingMutation.isPending ? "Deleting..." : "Delete Meeting"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MeetingAdmin;
