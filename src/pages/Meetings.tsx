
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import RestrictedContent from '@/components/MeetingDetails/RestrictedContent';

const Meetings = () => {
  const { isAuthenticated, isDeakinUser } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-8 px-8">
      <h1 className="text-3xl font-bold mb-6">Meetings</h1>
      
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
      ) : (
        <div className="grid gap-6">
          <div className="p-6 rounded-lg bg-blue-950/30 border border-blue-500/30">
            <h2 className="text-xl font-bold mb-4">Recent Team Meetings</h2>
            <p className="text-gray-300 mb-6">Welcome, Deakin team member! Here are the latest meeting notes and recordings.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-950/50 rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-300">Sprint Planning - May 15, 2025</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4">Discussion of Q2 roadmap and task allocation for upcoming features.</p>
                <button className="text-blue-400 text-sm flex items-center">
                  View Details <span className="ml-1">→</span>
                </button>
              </div>
              
              <div className="p-4 bg-blue-950/50 rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-300">Tech Demo - May 8, 2025</h3>
                <p className="text-sm text-gray-400 mt-2 mb-4">Presentation of AI integration features and discussion of implementation details.</p>
                <button className="text-blue-400 text-sm flex items-center">
                  View Details <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Meetings;
