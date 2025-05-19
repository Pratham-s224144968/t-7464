
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, generateFilePath } from "./fileUploadService";
import { v4 as uuidv4 } from "uuid";
import { Meeting, MeetingCreateData } from "./types";

// Re-export the Meeting type so it can be imported from this module
export type { Meeting, MeetingCreateData };

// In-memory cache for demo purposes (would be replaced by actual database in production)
const MEETINGS_CACHE: Meeting[] = [
  {
    id: "1",
    title: "Q2 Strategy Planning",
    date: "2025-04-15",
    time: "14:00",
    participants: ["John Doe", "Jane Smith", "Robert Johnson"],
    hasRecording: true,
    hasMinutes: true,
    hasSummary: true,
    recording_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
  {
    id: "2",
    title: "Product Roadmap Review",
    date: "2025-04-22",
    time: "10:30",
    participants: ["Jane Smith", "Michael Brown", "Emily Davis"],
    hasRecording: true,
    hasMinutes: true,
    hasSummary: false,
    recording_url: "https://www.youtube.com/embed/C0DPdy98e4c",
    minutes: "The team reviewed the current product roadmap and made several adjustments to the timeline. Feature X was prioritized for the next release, while Feature Y was pushed back to Q3. Michael presented user research findings that will inform our next design sprint."
  },
  {
    id: "3",
    title: "Marketing Campaign Kickoff",
    date: "2025-05-01",
    time: "15:00",
    participants: ["Robert Johnson", "Emily Davis", "Sarah Wilson"],
    hasRecording: true,
    hasMinutes: false,
    hasSummary: false,
    recording_url: "https://www.youtube.com/embed/9bZkp7q19f0"
  }
];

/**
 * Fetches all meetings from the database
 */
export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    // In a real app, this would fetch from Supabase
    // For now, return cached data
    return [...MEETINGS_CACHE];
  } catch (error) {
    console.error("Error fetching meetings:", error);
    return [];
  }
};

/**
 * Creates a new meeting in the database
 */
export const createMeeting = async (meetingData: MeetingCreateData): Promise<boolean> => {
  try {
    console.log("Creating meeting:", meetingData);
    // In a real app, this would insert into Supabase
    
    // For demo purposes, add to our in-memory cache
    const newMeeting: Meeting = {
      id: meetingData.id,
      title: meetingData.title,
      date: meetingData.date,
      time: meetingData.time,
      participants: meetingData.participants,
      hasRecording: !!meetingData.recording_url,
      hasMinutes: !!meetingData.minutes,
      hasSummary: false, // Summary gets generated later
      recording_url: meetingData.recording_url,
      transcript_url: meetingData.transcript_url,
      minutes: meetingData.minutes,
      created_at: new Date().toISOString()
    };
    
    MEETINGS_CACHE.push(newMeeting);
    
    return true;
  } catch (error) {
    console.error("Error creating meeting:", error);
    return false;
  }
};

/**
 * Creates a processing queue item for generating AI summary
 */
export const createProcessingQueueItem = async (meetingId: string, transcriptUrl: string): Promise<boolean> => {
  try {
    console.log("Creating processing queue item for meeting:", meetingId, "with transcript:", transcriptUrl);
    // In a real app, this would insert into a queue for processing
    // For now, just log it and return success
    return true;
  } catch (error) {
    console.error("Error creating processing queue item:", error);
    return false;
  }
};

/**
 * Processes a transcript to generate an AI summary
 */
export const processTranscript = async (meetingId: string): Promise<boolean> => {
  try {
    console.log("Processing transcript for meeting:", meetingId);
    // In a real app, this would process the transcript
    // For now, just log it and return success
    return true;
  } catch (error) {
    console.error("Error processing transcript:", error);
    return false;
  }
};

/**
 * Deletes a meeting and its associated files
 */
export const deleteMeeting = async (id: string): Promise<boolean> => {
  try {
    console.log("Deleting meeting:", id);
    // In a real app, this would delete from Supabase
    
    // For demo purposes, remove from in-memory cache
    const index = MEETINGS_CACHE.findIndex(meeting => meeting.id === id);
    if (index !== -1) {
      MEETINGS_CACHE.splice(index, 1);
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting meeting:", error);
    return false;
  }
};
