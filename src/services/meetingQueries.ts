
// Service for fetching meeting data

import { supabase } from "@/integrations/supabase/client";
import { Meeting } from "./types";

/**
 * Fetches all meetings from the database
 */
export const getMeetings = async (): Promise<Meeting[]> => {
  try {
    console.log("Fetching all meetings");
    // Use generic type for from() to bypass TypeScript's strict checking
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

    // Transform the data to match our frontend Meeting type
    return data.map((item: any) => {
      // Extract and process the minutes field
      let processedMinutes = undefined;
      if (item.minutes !== null) {
        processedMinutes = String(item.minutes);
      }
      
      return {
        id: item.id,
        title: item.title,
        date: item.date,
        time: item.time,
        participants: item.participants || [],
        hasRecording: item.has_recording || false,
        hasMinutes: !!item.minutes,
        hasSummary: item.has_summary || false,
        recording: item.recording_url,
        transcript_url: item.transcript_url,
        minutes: processedMinutes,
        summary: item.summary ? {
          text: item.summary.text || "",
          keyTakeaways: item.summary.key_takeaways || []
        } : undefined,
        created_at: item.created_at
      };
    });
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
    
    console.log("Raw meeting data:", {
      id: data.id,
      title: data.title, 
      hasMinutes: data.has_minutes,
      minutesType: typeof data.minutes,
      minutes: data.minutes
    });
    
    // Extract and process the minutes field
    let processedMinutes = undefined;
    if (data.minutes !== null) {
      processedMinutes = String(data.minutes);
      console.log("Processed minutes:", {
        length: processedMinutes.length,
        preview: processedMinutes.substring(0, 50) + "..."
      });
    } else {
      console.log("No minutes data found");
    }

    // Process summary data safely with type checking
    let processedSummary = undefined;
    if (data.summary) {
      console.log("Raw summary data:", data.summary);
      
      // Check if summary is an object with the expected properties
      if (
        typeof data.summary === 'object' && 
        data.summary !== null &&
        !Array.isArray(data.summary) &&
        'text' in data.summary &&
        'key_takeaways' in data.summary
      ) {
        processedSummary = {
          text: String(data.summary.text || ""),
          keyTakeaways: Array.isArray(data.summary.key_takeaways) 
            ? data.summary.key_takeaways.map(String)
            : []
        };
        console.log("Processed summary:", processedSummary);
      } else {
        console.log("Summary data found but in unexpected format");
      }
    } else {
      console.log("No summary data found");
    }

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
      recording: data.recording_url,
      transcript_url: data.transcript_url,
      minutes: processedMinutes,
      summary: processedSummary,
      created_at: data.created_at
    };
  } catch (error) {
    console.error("Error in getMeetingById:", error);
    return null;
  }
};
