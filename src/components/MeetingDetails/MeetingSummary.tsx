
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { motion } from "@/components/ui/motion";
import { fadeIn } from "@/components/ui/motion";

interface MeetingSummaryProps {
  summary?: {
    text: string;
    keyTakeaways: string[];
  };
  date: string;
  canAccessRestrictedContent: boolean;
  previewMode?: boolean;
}

const MeetingSummary: React.FC<MeetingSummaryProps> = ({
  summary,
  date,
  canAccessRestrictedContent,
  previewMode = false,
}) => {
  const navigate = useNavigate();

  if (!summary) {
    return <div className="text-center p-8 text-blue-300">No AI summary available</div>;
  }

  // For preview mode (unauthenticated users), show only first paragraph
  if (previewMode) {
    // Extract first paragraph
    const firstParagraph = summary.text.split('\n\n')[0];
    
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="space-y-4"
      >
        <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
          <CardHeader className="bg-blue-900/20">
            <CardTitle className="text-white flex items-center">
              <span>AI Generated Summary</span>
              <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded-full">Preview</span>
            </CardTitle>
            <CardDescription className="text-blue-300">
              Preview of the meeting summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-line text-blue-200">{firstParagraph}</p>
          </CardContent>
          <CardFooter className="bg-blue-900/10 flex flex-col space-y-4 p-6">
            <div className="w-full">
              <div className="h-24 relative overflow-hidden rounded-md bg-blue-900/20">
                <div className="absolute inset-0 backdrop-blur-sm flex items-center justify-center">
                  <Lock className="h-8 w-8 text-blue-400 opacity-50" />
                </div>
                <div className="h-full bg-gradient-to-b from-transparent via-transparent to-blue-900/80"></div>
              </div>
            </div>
            <p className="text-blue-300 text-center mt-2">
              Full summary and key takeaways available for authenticated Deakin users
            </p>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-blue-600 hover:bg-blue-700 w-full"
            >
              Sign In with Deakin Account
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

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
