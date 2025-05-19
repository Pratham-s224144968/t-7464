
// Common types used across meeting services

export type Meeting = {
  id: string;
  title: string;
  date: string;
  time?: string;
  participants: string[];
  hasRecording: boolean;
  hasMinutes: boolean;
  hasSummary: boolean;
  recording_url?: string;
  transcript_url?: string;
  minutes?: string;
  summary?: {
    text: string;
    keyTakeaways: string[];
  };
  created_at?: string;
};

export type MeetingCreateData = {
  id: string;
  title: string;
  date: string;
  time?: string;
  participants: string[];
  recording_url?: string;
  transcript_url?: string;
  minutes?: string;
};
