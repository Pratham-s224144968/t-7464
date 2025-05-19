
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import NoRecordingNotice from "./NoRecordingNotice";
import { getYoutubeEmbedUrl, isValidYoutubeUrl } from "@/utils/youtubeUtils";

interface MeetingRecordingProps {
  recording?: string;
  date?: string;
  canAccessRecordings: boolean;
}

interface NoRecordingNoticeProps {
  date?: string;
}

const MeetingRecording: React.FC<MeetingRecordingProps> = ({
  recording,
  date,
  canAccessRecordings
}) => {
  if (!recording || !canAccessRecordings) {
    return <NoRecordingNotice date={date} />;
  }

  // Get embed URL if it's a YouTube URL
  const embedUrl = isValidYoutubeUrl(recording) 
    ? getYoutubeEmbedUrl(recording) 
    : recording;

  return (
    <Card className="border-blue-500/30 bg-blue-950/20">
      <CardContent className="p-0">
        <div className="aspect-video w-full">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            title="Meeting Recording"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingRecording;
