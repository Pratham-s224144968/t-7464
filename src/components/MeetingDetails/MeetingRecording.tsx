import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import NoRecordingNotice from "./NoRecordingNotice";

interface MeetingRecordingProps {
  recording?: string;
  date?: string;
  canAccessRecordings: boolean;
}

const MeetingRecording: React.FC<MeetingRecordingProps> = ({
  recording,
  date,
  canAccessRecordings
}) => {
  if (!recording || !canAccessRecordings) {
    return <NoRecordingNotice date={date} />;
  }

  return (
    <Card className="border-blue-500/30 bg-blue-950/20">
      <CardContent className="p-0">
        <div className="aspect-video w-full">
          <iframe
            src={recording}
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
