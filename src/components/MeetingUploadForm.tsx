import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { MeetingCreateData } from "@/services/types";
import { createMeeting } from "@/services/meetingMutations";

// Add the YouTube validation utility
import { isValidYoutubeUrl, getYoutubeEmbedUrl } from "@/utils/youtubeUtils";

const MeetingUploadForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [participants, setParticipants] = useState("");
  const [meetingMinutes, setMeetingMinutes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add state for YouTube URL and validation
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isValidUrl, setIsValidUrl] = useState<boolean | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // Add validation for YouTube URL
  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    
    if (url.trim() === "") {
      setIsValidUrl(null);
      setVideoPreview(null);
      return;
    }
    
    const isValid = isValidYoutubeUrl(url);
    setIsValidUrl(isValid);
    
    if (isValid) {
      const embedUrl = getYoutubeEmbedUrl(url);
      setVideoPreview(embedUrl);
    } else {
      setVideoPreview(null);
    }
  };

  // Update the form submission handler to use the YouTube URL
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      // Validate the form data
      if (!title || !date || !participants || participants.length === 0) {
        toast({
          title: "Missing required fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Validate the YouTube URL if provided
      if (videoUrl && !isValidUrl) {
        toast({
          title: "Invalid YouTube URL",
          description: "Please enter a valid YouTube video URL.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Generate a unique ID for the new meeting
      const meetingId = uuidv4();
      
      // Prepare the meeting data
      const meetingData: MeetingCreateData = {
        id: meetingId,
        title,
        date,
        time,
        participants: participants.split(",").map(p => p.trim()),
        recording_url: videoUrl ? getYoutubeEmbedUrl(videoUrl) || undefined : undefined,
        minutes: meetingMinutes || undefined,
      };
      
      // Create the meeting record
      const success = await createMeeting(meetingData);
      
      if (success) {
        toast({
          title: "Meeting added successfully",
          description: "Your meeting has been added to the system.",
        });
        onClose();
      } else {
        toast({
          title: "Error adding meeting",
          description: "There was a problem adding your meeting. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding meeting:", error);
      toast({
        title: "Error adding meeting",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Update the form to include the YouTube URL input and preview
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Add New Meeting</h2>
        <p className="text-gray-500 text-center">Upload a team meeting recording, minutes, or both.</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Meeting Title*</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Q3 Strategy Planning"
            className="mt-1"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Meeting Date*</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="time">Meeting Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="participants">Participants* (comma-separated)</Label>
          <Input
            id="participants"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="John Doe, Jane Smith, Robert Johnson"
            className="mt-1"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="videoUrl">YouTube Video URL</Label>
          <Input
            id="videoUrl"
            value={videoUrl}
            onChange={handleVideoUrlChange}
            placeholder="https://www.youtube.com/watch?v=example"
            className={`mt-1 ${isValidUrl === false ? 'border-red-500' : ''}`}
          />
          {isValidUrl === false && (
            <p className="text-red-500 text-sm mt-1">Please enter a valid YouTube video URL</p>
          )}
          
          {videoPreview && (
            <div className="mt-4 aspect-video w-full">
              <iframe
                src={videoPreview}
                className="w-full h-full rounded-md"
                title="YouTube video preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
        
        <div>
          <Label htmlFor="meetingMinutes">Meeting Minutes</Label>
          <Textarea
            id="meetingMinutes"
            value={meetingMinutes}
            onChange={(e) => setMeetingMinutes(e.target.value)}
            placeholder="Enter the minutes from your meeting..."
            className="mt-1 min-h-[150px]"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
            </>
          ) : (
            <>Add Meeting</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default MeetingUploadForm;
