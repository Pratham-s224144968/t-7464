
// Service for fetching meeting data

import { supabase } from "@/integrations/supabase/client";
import { Meeting } from "./types";

/**
 * Fetches all meetings from the database
 */
export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    console.log("Fetching all meetings");
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching meetings:", error);
      throw error;
    }

    if (!data) {
      console.log("No meetings data returned");
      return [];
    }

    console.log(`Found ${data.length} meetings`);
    
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      date: item.date,
      time: item.time,
      participants: item.participants || [],
      hasRecording: item.has_recording || false,
      hasMinutes: item.minutes ? true : false, // Explicitly check if minutes exist
      hasSummary: item.has_summary || false,
      recording: item.recording_url,
      transcript_url: item.transcript_url,
      minutes: item.minutes ? String(item.minutes) : undefined, // Convert minutes to string
      summary: item.summary && typeof item.summary === 'object' ? {
        text: String(item.summary.text || ""),
        keyTakeaways: Array.isArray(item.summary.key_takeaways) 
          ? item.summary.key_takeaways.map(String)
          : []
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
    console.log(`Fetching meeting with ID: ${id}`);
    
    if (!id) {
      console.error("Invalid meeting ID provided");
      return null;
    }
    
    // Fetch meeting from database
    const { data, error } = await supabase
      .from('meetings')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching meeting:", error);
      return null;
    }

    if (!data) {
      console.error("No meeting found with ID:", id);
      return null;
    }
    
    console.log("Raw meeting data:", data);
    console.log("Minutes type:", typeof data.minutes);
    console.log("Minutes value:", data.minutes);
    
    // Ensure minutes is a string if it exists
    const minutes = data.minutes ? String(data.minutes) : undefined;
    
    // Process summary if it exists
    let processedSummary = undefined;
    if (data.summary && typeof data.summary === 'object') {
      const summaryObj = data.summary as Record<string, any>;
      
      processedSummary = {
        text: String(summaryObj.text || ""),
        keyTakeaways: Array.isArray(summaryObj.key_takeaways) 
          ? summaryObj.key_takeaways.map(String)
          : []
      };
    }

    // Transform the data to match our frontend Meeting type
    return {
      id: data.id,
      title: data.title,
      date: data.date,
      time: data.time,
      participants: data.participants || [],
      hasRecording: data.has_recording || false,
      hasMinutes: data.minutes ? true : false, // Explicitly check if minutes exist
      hasSummary: data.has_summary || false,
      recording: data.recording_url,
      transcript_url: data.transcript_url,
      minutes: minutes,
      summary: processedSummary,
      created_at: data.created_at
    };
  } catch (error) {
    console.error("Error in getMeetingById:", error);
    return null;
  }
};
