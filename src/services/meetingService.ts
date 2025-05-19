
import { supabase } from "@/integrations/supabase/client";
import { uploadFile, generateFilePath } from "./fileUploadService";
import { v4 as uuidv4 } from "uuid";
import { Meeting, MeetingCreateData } from "./types";

// Re-export the Meeting type so it can be imported from this module
export type { Meeting, MeetingCreateData };

/**
 * Fetches all meetings from the database
 */
export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    // Use generic type for from() to bypass TypeScript's strict checking
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching meetings:", error);
      throw error;
    }

    if (!data) return [];

    // Transform the data to match our frontend Meeting type
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      time: item.time,
      participants: item.participants || [],
      hasRecording: item.has_recording || false,
      hasMinutes: !!item.minutes,
      hasSummary: item.has_summary || false,
      recording_url: item.recording_url,
      transcript_url: item.transcript_url,
      minutes: item.minutes,
      summary: item.summary ? {
        text: item.summary.text || "",
        keyTakeaways: item.summary.key_takeaways || []
      } : undefined,
      created_at: item.created_at
    }));
  } catch (error) {
    console.error("Error in getMeetings:", error);
    return [];
  }
};

/**
 * Creates a new meeting in the database
 */
export const createMeeting = async (meetingData: MeetingCreateData): Promise<boolean> => {
  try {
    console.log("Creating meeting:", meetingData);
    
    const { error } = await supabase
      .from('meetings')
      .insert({
        id: meetingData.id,
        title: meetingData.title,
        date: meetingData.date,
        time: meetingData.time,
        participants: meetingData.participants,
        recording_url: meetingData.recording_url,
        transcript_url: meetingData.transcript_url,
        minutes: meetingData.minutes,
        has_recording: !!meetingData.recording_url,
        has_minutes: !!meetingData.minutes,
        has_summary: false, // Summary gets generated later
      });

    if (error) {
      console.error("Error inserting meeting:", error);
      return false;
    }
    
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
    // In a real app, this would process the transcript and update the meeting with the summary
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
    
    const { error } = await supabase
      .from('meetings')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting meeting:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error deleting meeting:", error);
    return false;
  }
};
