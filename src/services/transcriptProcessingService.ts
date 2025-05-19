
import { supabase } from "@/integrations/supabase/client";

/**
 * Creates a queue item for processing a transcript asynchronously
 */
export const createProcessingQueueItem = async (meetingId: string, transcriptUrl: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('processing_queue' as any)
      .insert({
        meeting_id: meetingId,
        transcript_url: transcriptUrl,
        status: 'pending'
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error creating processing queue item:', error);
    return false;
  }
};

/**
 * Triggers manual AI processing of a transcript
 */
export const processTranscript = async (meetingId: string): Promise<boolean> => {
  try {
    // In a real application, this would make a call to a Supabase Edge Function
    // that would process the transcript and update the meeting with a summary
    
    // For demo purposes, we'll simulate a successful processing
    // by updating the meeting with a mock summary
    const mockSummary = {
      text: "This meeting focused on project updates and timelines for the upcoming quarter. The team discussed resource allocation and identified potential risks.",
      key_takeaways: [
        "Project Alpha is on track for Q3 delivery",
        "Additional resources needed for Team B",
        "Customer feedback indicates high satisfaction with recent features",
        "Next sprint planning session scheduled for next week",
        "Budget approval pending for new initiative"
      ]
    };
    
    const { error } = await supabase
      .from('meetings' as any)
      .update({
        has_summary: true,
        summary: mockSummary
      })
      .eq('id', meetingId);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error processing transcript:', error);
    return false;
  }
};
