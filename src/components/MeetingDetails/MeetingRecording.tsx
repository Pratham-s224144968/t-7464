
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface MeetingRecordingProps {
  recording?: string;
  date: string;
}

const MeetingRecording: React.FC<MeetingRecordingProps> = ({ recording, date }) => {
  if (!recording) {
    return <div className="text-center p-8 text-blue-300">No recording available</div>;
  }

  return (
    <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
      <CardHeader className="bg-blue-900/20">
        <CardTitle className="text-white">Meeting Recording</CardTitle>
        <CardDescription className="text-blue-300">
          Video recording from {date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-blue-900/30 rounded-md flex items-center justify-center">
          <video
            controls
            className="w-full h-full rounded-md"
            poster="https://images.unsplash.com/photo-1556155092-8707de31f9c4?q=80&w=1000"
          >
            <source src={recording} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeetingRecording;
