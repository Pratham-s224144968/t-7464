
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, FileX } from "lucide-react";

interface MeetingMinutesProps {
  minutes?: string;
  date: string;
  canAccessRestrictedContent: boolean;
}

const MeetingMinutes: React.FC<MeetingMinutesProps> = ({
  minutes,
  date,
  canAccessRestrictedContent,
}) => {
  const navigate = useNavigate();
  
  // Debug the minutes prop
  console.log("MeetingMinutes rendering with:", {
    minutes: minutes,
    minutesType: typeof minutes,
    minutesExists: !!minutes,
    date,
    canAccess: canAccessRestrictedContent
  });

  // If the user doesn't have access, show restricted content message
  if (!canAccessRestrictedContent) {
    return (
      <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <Lock className="h-16 w-16 text-blue-400 mb-4" />
          <CardTitle className="text-white mb-2">Restricted Content</CardTitle>
          <CardDescription className="text-blue-300 mb-4">
            Meeting minutes are only available to authenticated Deakin users
          </CardDescription>
          <Button
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Sign In with Deakin Account
          </Button>
        </CardContent>
      </Card>
    );
  }

  // If there are no minutes available
  if (!minutes || minutes.trim() === '') {
    return (
      <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <FileX className="h-16 w-16 text-blue-400 mb-4" />
          <CardTitle className="text-white mb-2">No Minutes Available</CardTitle>
          <CardDescription className="text-blue-300">
            No minutes were recorded for this meeting from {date}
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  // If minutes content exists
  return (
    <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
      <CardHeader className="bg-blue-900/20">
        <CardTitle className="text-white">Meeting Minutes</CardTitle>
        <CardDescription className="text-blue-300">
          Notes from the meeting on {date}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="whitespace-pre-line text-blue-200">{minutes}</p>
      </CardContent>
    </Card>
  );
};

export default MeetingMinutes;
