
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RestrictedContent from '@/components/MeetingDetails/RestrictedContent';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import MeetingUploadForm from '@/components/MeetingUploadForm';
import { useToast } from '@/hooks/use-toast';

// Sample meeting data - in a real app this would come from an API or database
const SAMPLE_MEETINGS = [
  {
    id: "1",
    title: "Q2 Strategy Planning",
    date: "2025-04-15",
    hasRecording: true, 
    hasMinutes: true,
    hasSummary: true
  },
  {
    id: "2",
    title: "Product Roadmap Review",
    date: "2025-04-22",
    hasRecording: true,
    hasMinutes: true,
    hasSummary: false
  },
  {
    id: "3",
    title: "Marketing Campaign Kickoff",
    date: "2025-05-01",
    hasRecording: true,
    hasMinutes: false,
    hasSummary: false
  }
];

const Meetings = () => {
  const { isAuthenticated, isDeakinUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  
  const handleMeetingClick = (id: string) => {
    navigate(`/meetings/${id}`);
  };

  const handleUploadSuccess = () => {
    setUploadDialogOpen(false);
    toast({
      title: "Meeting Created",
      description: "Your meeting has been successfully added.",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 sm:pt-20 md:pt-28 pb-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Meetings</h1>
          <RestrictedContent 
            title="Authentication Required"
            description="Please sign in to view meeting notes and recordings."
            buttonText="Sign In to Access"
          />
        </div>
      </div>
    );
  }
  
  if (!isDeakinUser) {
    return (
      <div className="min-h-screen bg-black text-white pt-16 sm:pt-20 md:pt-28 pb-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Meetings</h1>
          <RestrictedContent 
            title="Deakin Access Required"
            description="These meeting notes are restricted to Deakin University members."
            buttonText="Return to Home"
            isDeakinSpecific={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-16 sm:pt-20 md:pt-28 pb-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold">Meetings</h1>
          
          {isAuthenticated && isDeakinUser && (
            <Button 
              onClick={() => setUploadDialogOpen(true)} 
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap"
            >
              <Plus size={16} /> Upload Meeting
            </Button>
          )}
        </div>
        
        {SAMPLE_MEETINGS.length === 0 ? (
          <div className="text-center py-12 sm:py-20">
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
            <div className="p-4 sm:p-6 rounded-lg bg-blue-950/30 border border-blue-500/30">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Recent Team Meetings</h2>
              <p className="text-gray-300 mb-6">Welcome, Deakin team member! Here are the latest meeting notes and recordings.</p>
              
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {SAMPLE_MEETINGS.map((meeting) => (
                  <div 
                    key={meeting.id} 
                    className="p-4 bg-blue-950/50 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-colors cursor-pointer"
                    onClick={() => handleMeetingClick(meeting.id)}
                  >
                    <h3 className="font-semibold text-blue-300">{meeting.title}</h3>
                    <p className="text-sm text-gray-400 mt-2 mb-4">
                      {new Date(meeting.date).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {meeting.hasRecording && (
                        <span className="inline-flex items-center text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                          Recording
                        </span>
                      )}
                      {meeting.hasMinutes && (
                        <span className="inline-flex items-center text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">
                          Minutes
                        </span>
                      )}
                      {meeting.hasSummary && (
                        <span className="inline-flex items-center text-xs bg-purple-900/30 text-purple-300 px-2 py-1 rounded">
                          AI Summary
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
          <DialogContent className="w-full max-w-3xl p-0 sm:p-4 md:p-6 sm:max-w-[90vw] md:max-w-[600px]">
            <MeetingUploadForm onClose={() => setUploadDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Meetings;
