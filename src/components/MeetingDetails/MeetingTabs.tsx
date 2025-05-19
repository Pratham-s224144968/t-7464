
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Lock, Video } from "lucide-react";
import MeetingRecording from "./MeetingRecording";
import MeetingMinutes from "./MeetingMinutes";
import MeetingSummary from "./MeetingSummary";

interface MeetingTabsProps {
  meeting: {
    id: string;
    title: string;
    date: string;
    participants: string[];
    hasRecording: boolean;
    hasMinutes: boolean;
    hasSummary: boolean;
    recording?: string;
    minutes?: string;
    summary?: {
      text: string;
      keyTakeaways: string[];
    };
  };
  activeTab: string;
  setActiveTab: (tab: string) => void;
  canAccessRestrictedContent: boolean;
  canAccessRecordings: boolean;
  handleRestrictedContentClick: () => void;
}

const MeetingTabs: React.FC<MeetingTabsProps> = ({
  meeting,
  activeTab,
  setActiveTab,
  canAccessRestrictedContent,
  canAccessRecordings,
  handleRestrictedContentClick,
}) => {
  console.log("MeetingTabs props:", { 
    meeting, 
    activeTab, 
    canAccessRestrictedContent,
    minutes: meeting.minutes 
  });

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 mb-8 bg-blue-900/30">
        <TabsTrigger
          value="recording"
          disabled={!meeting.hasRecording}
          className="data-[state=active]:bg-blue-800/50 data-[state=active]:text-blue-200"
          onClick={() => !canAccessRecordings && handleRestrictedContentClick()}
        >
          <Video className="mr-2 h-4 w-4" /> Recording
          {!canAccessRecordings && <Lock className="ml-2 h-3 w-3" />}
        </TabsTrigger>
        <TabsTrigger
          value="minutes"
          className="data-[state=active]:bg-blue-800/50 data-[state=active]:text-blue-200"
          onClick={() => !canAccessRestrictedContent && handleRestrictedContentClick()}
        >
          <FileText className="mr-2 h-4 w-4" />
          Minutes
          {!canAccessRestrictedContent && <Lock className="ml-2 h-3 w-3" />}
        </TabsTrigger>
        <TabsTrigger
          value="summary"
          disabled={!meeting.hasSummary}
          className="data-[state=active]:bg-blue-800/50 data-[state=active]:text-blue-200"
        >
          <FileText className="mr-2 h-4 w-4" />
          AI Summary
        </TabsTrigger>
      </TabsList>

      <TabsContent value="recording" className="space-y-4">
        <MeetingRecording 
          recording={meeting.recording} 
          date={meeting.date} 
          canAccessRecordings={canAccessRecordings} 
        />
      </TabsContent>

      <TabsContent value="minutes" className="space-y-4">
        <MeetingMinutes
          minutes={meeting.minutes}
          date={meeting.date}
          canAccessRestrictedContent={canAccessRestrictedContent}
        />
      </TabsContent>

      <TabsContent value="summary" className="space-y-4">
        <MeetingSummary
          summary={meeting.summary}
          date={meeting.date}
          canAccessRestrictedContent={canAccessRestrictedContent}
          previewMode={!canAccessRestrictedContent}
        />
      </TabsContent>
    </Tabs>
  );
};

export default MeetingTabs;
