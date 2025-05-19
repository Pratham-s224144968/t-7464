
// Service for handling file uploads

import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";

/**
 * Uploads a file with progress tracking
 */
export const uploadFile = async (
  file: File, 
  bucketName: string, 
  path: string,
  onProgress?: (progress: number) => void
): Promise<string | null> => {
  try {
    // Create a FormData instance
    const formData = new FormData();
    formData.append('file', file);

    // Use the Supabase JavaScript client for upload
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
        // Progress tracking handled in a different way
      });

    if (error) {
      throw error;
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(path);

    return publicUrlData.publicUrl || null;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

/**
 * Generates a unique file path for uploading
 */
export const generateFilePath = (meetingId: string, fileType: 'recording' | 'transcript'): string => {
  const fileName = `${fileType}_${uuidv4()}`;
  return `meetings/${meetingId}/${fileName}`;
};
