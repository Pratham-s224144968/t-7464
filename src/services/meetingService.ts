
// Re-export all meeting service functionality from this central file

export type { Meeting, MeetingCreateData } from './types';
export { getMeetings, getMeetingById } from './meetingQueries';
export { createMeeting, deleteMeeting } from './meetingMutations';
export { uploadFile, generateFilePath } from './fileUploadService';
export { processTranscript, createProcessingQueueItem } from './transcriptProcessingService';
