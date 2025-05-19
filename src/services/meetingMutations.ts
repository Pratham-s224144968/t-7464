
// Service for creating, updating, and deleting meetings

import { supabase } from "@/integrations/supabase/client";
import { MeetingCreateData } from "./types";

/**
 * Creates a new meeting in the database
 */
export const createMeeting = async (meetingData: MeetingCreateData): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('meetings' as any)
      .insert({
        id: meetingData.id,
        title: meetingData.title,
        date: meetingData.date,
        participants: meetingData.participants,
        recording_url: meetingData.recording_url,
        transcript_url: meetingData.transcript_url,
        minutes: meetingData.minutes,
        has_recording: !!meetingData.recording_url,
        has_minutes: !!meetingData.minutes,
        has_summary: false,
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating meeting:', error);
    return false;
  }
};

/**
 * Deletes a meeting and its associated files
 */
export const deleteMeeting = async (id: string): Promise<boolean> => {
  try {
    // First, fetch the meeting to check if it exists
    const { data: meetingData, error: fetchError } = await supabase
      .from('meetings' as any)
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error("Error fetching meeting:", fetchError);
      return false;
    }

    // Ensure we have the meeting data before proceeding
    if (!meetingData) {
      console.error("Meeting not found:", id);
      return false;
    }

    // Delete any files stored in the meeting folder
    const { error: storageError } = await supabase.storage
      .from('meeting-files')
      .remove([`meetings/${id}`]);
        
    if (storageError) {
      console.error("Error deleting meeting files:", storageError);
      // Continue anyway to delete the database record
    }

    // Delete the database record
    const { error } = await supabase
      .from('meetings' as any)
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting meeting:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error in deleteMeeting:", error);
    return false;
  }
};
