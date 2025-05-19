
// Service for handling file uploads

import { v4 as uuidv4 } from "uuid";

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

    // Use fetch for upload with progress tracking
    const xhr = new XMLHttpRequest();
    
    // Create a promise to handle the async operation
    const uploadPromise = new Promise<string>((resolve, reject) => {
      xhr.open('POST', `${process.env.SUPABASE_URL || 'https://kiyrtjzwgtqzmkthlkig.supabase.co'}/storage/v1/object/${bucketName}/${path}`);
      
      // Set authorization header
      xhr.setRequestHeader('Authorization', `Bearer ${process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpeXJ0anp3Z3Rxem1rdGhsa2lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2MDMxMTksImV4cCI6MjA1ODE3OTExOX0.iBB6MDnvCBXCEbncrQmqn2HyQ74mnVvAhr9JDKyJyLQ'}`);
      
      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round((event.loaded / event.total) * 100);
            onProgress(percentComplete);
          }
        };
      }
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          // Get the public URL
          const publicUrl = `${process.env.SUPABASE_URL || 'https://kiyrtjzwgtqzmkthlkig.supabase.co'}/storage/v1/object/public/${bucketName}/${path}`;
          resolve(publicUrl);
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };
      
      xhr.onerror = () => reject(new Error('Network error during upload'));
      xhr.send(formData);
    });

    return await uploadPromise;
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

