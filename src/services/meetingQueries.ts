
// Service for fetching meeting data

import { supabase } from "@/integrations/supabase/client";
import { Meeting } from "./types";

/**
 * Fetches all meetings from the database
 */
export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    // Use generic type for from() to bypass TypeScript's strict checking
    const { data, error } = await supabase
      .from('meetings' as any)
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching meetings:", error);
      throw error;
    }

    if (!data) return [];

    // Transform the data to match our frontend Meeting type
    return (data as any[]).map((item) => ({
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
 * Fetches a meeting by its ID
 */
export const getMeetingById = async (id: string): Promise<Meeting | null> => {
  try {
    // Use generic type for from() to bypass TypeScript's strict checking
    const { data, error } = await supabase
      .from('meetings' as any)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching meeting:", error);
      return null;
    }

    if (!data) return null;
    
    // Cast data to any to bypass TypeScript checking
    const item = data as any;

    // Transform the data to match our frontend Meeting type
    return {
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
    };
  } catch (error) {
    console.error("Error in getMeetingById:", error);
    return null;
  }
};
