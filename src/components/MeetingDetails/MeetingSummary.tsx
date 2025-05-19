
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

interface MeetingSummaryProps {
  summary?: {
    text: string;
    keyTakeaways: string[];
  };
  date: string;
  canAccessRestrictedContent: boolean;
}

const MeetingSummary: React.FC<MeetingSummaryProps> = ({
  summary,
  date,
  canAccessRestrictedContent,
}) => {
  const navigate = useNavigate();

  if (!canAccessRestrictedContent) {
    return (
      <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <Lock className="h-16 w-16 text-blue-400 mb-4" />
          <CardTitle className="text-white mb-2">Restricted Content</CardTitle>
          <CardDescription className="text-blue-300 mb-4">
            AI generated summaries are only available to authenticated Deakin users
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

  if (!summary) {
    return <div className="text-center p-8 text-blue-300">No AI summary available</div>;
  }

  return (
    <>
      <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
        <CardHeader className="bg-blue-900/20">
          <CardTitle className="text-white">AI Generated Summary</CardTitle>
          <CardDescription className="text-blue-300">
            Auto-generated summary of the meeting content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line text-blue-200">{summary.text}</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur mt-4">
        <CardHeader className="bg-blue-900/20">
          <CardTitle className="text-white">Key Takeaways</CardTitle>
          <CardDescription className="text-blue-300">
            Important points from the meeting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2 text-blue-200">
            {summary.keyTakeaways.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default MeetingSummary;
