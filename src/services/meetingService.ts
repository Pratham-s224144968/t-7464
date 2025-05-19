
// Re-export all meeting service functionality from this central file

export type { Meeting, MeetingCreateData } from './types';
export { getMeetings, getMeetingById } from './meetingQueries';
export { createMeeting, deleteMeeting } from './meetingMutations';
export { uploadFile, generateFilePath } from './fileUploadService';
export { processTranscript, createProcessingQueueItem } from './transcriptProcessingService';

/**
 * This function is used to check if the meetings functionality is working
 * It's a simple helper that can be used for debugging
 */
export const checkMeetingsService = () => {
  console.log("Meetings service is loaded and ready.");
  return true;
};
