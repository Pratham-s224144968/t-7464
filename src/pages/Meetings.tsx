
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RestrictedContent from '@/components/MeetingDetails/RestrictedContent';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Calendar, FileText, Video, Plus, Lock } from 'lucide-react';
import MeetingUploadForm from '@/components/MeetingUploadForm';
import { Meeting } from '@/services/types';
import { useQuery } from '@tanstack/react-query';
import { getMeetings } from '@/services/meetingService';

const Meetings = () => {
  const { isAuthenticated, isDeakinUser } = useAuth();
  const navigate = useNavigate();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  // Fetch meetings with react-query
  const { 
    data: meetings = [], 
    isLoading, 
    error
  } = useQuery({
    queryKey: ['meetings'],
    queryFn: getMeetings,
  });

  const handleMeetingClick = (id: string) => {
    navigate(`/meetings/${id}`);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Meetings</h1>
          
          {isAuthenticated && isDeakinUser && (
            <Button 
              onClick={() => setUploadDialogOpen(true)} 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={16} /> Upload Meeting
            </Button>
          )}
        </div>
        
        {!isAuthenticated ? (
          <RestrictedContent 
            title="Authentication Required"
            description="Please sign in to view meeting notes and recordings."
            buttonText="Sign In to Access"
          />
        ) : !isDeakinUser ? (
          <RestrictedContent 
            title="Deakin Access Required"
            description="These meeting notes are restricted to Deakin University members."
            buttonText="Return to Home"
            isDeakinSpecific={true}
          />
        ) : isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-300">
            There was an error loading meetings. Please try again.
          </div>
        ) : meetings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-6">No meetings have been added yet.</p>
            <Button 
              onClick={() => setUploadDialogOpen(true)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus size={16} className="mr-2" /> Add Your First Meeting
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            <div className="p-6 rounded-lg bg-blue-950/30 border border-blue-500/30">
              <h2 className="text-xl font-bold mb-4">Recent Team Meetings</h2>
              <p className="text-gray-300 mb-6">Welcome, Deakin team member! Here are the latest meeting notes and recordings.</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meetings.map((meeting) => (
                  <div 
                    key={meeting.id} 
                    className="p-4 bg-blue-950/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer"
                    onClick={() => handleMeetingClick(meeting.id)}
                  >
                    <h3 className="font-semibold text-blue-300">{meeting.title}</h3>
                    <p className="text-sm text-gray-400 mt-2 mb-4">
                      {new Date(meeting.date).toLocaleDateString()}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {meeting.hasRecording && (
                        <span className="inline-flex items-center text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                          <Video className="mr-1 h-3 w-3" />
                        </span>
                      )}
                      {meeting.hasMinutes && (
                        <span className="inline-flex items-center text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                          <FileText className="mr-1 h-3 w-3" />
                        </span>
                      )}
                      {meeting.hasSummary && (
                        <span className="inline-flex items-center text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded">
                          <FileText className="mr-1 h-3 w-3" /> AI
                        </span>
                      )}
                    </div>
                    <button className="text-blue-400 text-sm flex items-center mt-3">
                      View Details <span className="ml-1">→</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <MeetingUploadForm onClose={() => setUploadDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Meetings;
