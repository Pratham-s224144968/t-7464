
// Service for creating, updating, and deleting meetings

import { supabase } from "@/integrations/supabase/client";
import { MeetingCreateData } from "./types";

/**
 * Creates a new meeting in the database
 */
export const createMeeting = async (meetingData: MeetingCreateData): Promise<boolean> => {
  try {
    const { error } = await (supabase as any)
      .from('meetings')
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
    // First, delete any files in storage
    const { data: meeting } = await (supabase as any)
      .from('meetings')
      .select('id')
      .eq('id', id)
      .single();

    if (meeting) {
      // Delete any files stored in the meeting folder
      const { error: storageError } = await (supabase.storage as any)
        .from('meeting-files')
        .remove([`meetings/${meeting.id}`]);
        
      if (storageError) {
        console.error("Error deleting meeting files:", storageError);
        // Continue anyway to delete the database record
      }
    }

    // Delete the database record
    const { error } = await (supabase as any)
      .from('meetings')
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

