
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

    // Transform the data to match our frontend Meeting type
    return {
      id: data.id,
      title: data.title,
      date: data.date,
      time: data.time,
      participants: data.participants || [],
      hasRecording: data.has_recording || false,
      hasMinutes: !!data.minutes,
      hasSummary: data.has_summary || false,
      recording_url: data.recording_url,
      transcript_url: data.transcript_url,
      minutes: data.minutes,
      summary: data.summary ? {
        text: data.summary.text || "",
        keyTakeaways: data.summary.key_takeaways || []
      } : undefined,
      created_at: data.created_at
    };
  } catch (error) {
    console.error("Error in getMeetingById:", error);
    return null;
  }
};
