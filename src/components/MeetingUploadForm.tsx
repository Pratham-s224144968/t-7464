
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "@/components/ui/motion";
import { Loader, Upload, Check, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/services/fileUploadService";
import { createMeeting, createProcessingQueueItem } from "@/services/meetingService";
import { useAuth } from "@/contexts/AuthContext";

type MeetingFormData = {
  title: string;
  date: string;
  participants: string;
  recording: FileList | null;
  transcript: FileList | null;
  minutes: string;
};

const MeetingUploadForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { toast } = useToast();
  const { user, isAuthenticated, isDeakinUser } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    recording: 0,
    transcript: 0
  });
  
  const form = useForm<MeetingFormData>({
    defaultValues: {
      title: "",
      date: "",
      participants: "",
      recording: null,
      transcript: null,
      minutes: "",
    }
  });

  // Render restricted access message if not authenticated or not a Deakin user
  if (!isAuthenticated || !isDeakinUser) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
          <Lock className="h-16 w-16 text-red-400 mb-4" />
          <CardTitle className="mb-2">Restricted Access</CardTitle>
          <CardDescription className="mb-4">
            Only users with Deakin University accounts (@deakin.edu.au) can upload meetings.
          </CardDescription>
        </CardContent>
      </Card>
    );
  }

  const onSubmit = async (data: MeetingFormData) => {
    try {
      setIsUploading(true);
      
      // Generate a unique folder name for this meeting
      const meetingId = uuidv4();
      let recordingUrl = null;
      let transcriptUrl = null;
      
      // Upload recording if provided
      if (data.recording && data.recording[0]) {
        const file = data.recording[0];
        const fileExt = file.name.split('.').pop();
        const filePath = `meetings/${meetingId}/recording.${fileExt}`;
        
        recordingUrl = await uploadFile(
          file, 
          'meeting-files', 
          filePath,
          (progress) => {
            setUploadProgress(prev => ({ ...prev, recording: progress }));
          }
        );
        
        if (!recordingUrl) {
          throw new Error('Failed to upload recording');
        }
      }
      
      // Upload transcript if provided
      if (data.transcript && data.transcript[0]) {
        const file = data.transcript[0];
        const fileExt = file.name.split('.').pop();
        const filePath = `meetings/${meetingId}/transcript.${fileExt}`;
        
        transcriptUrl = await uploadFile(
          file, 
          'meeting-files', 
          filePath,
          (progress) => {
            setUploadProgress(prev => ({ ...prev, transcript: progress }));
          }
        );
        
        if (!transcriptUrl) {
          throw new Error('Failed to upload transcript');
        }
      }
      
      // Parse participants from comma-separated string to array
      const participantsArray = data.participants
        .split(',')
        .map(p => p.trim())
        .filter(p => p !== '');
      
      // Create meeting in database
      const meetingCreated = await createMeeting({
        id: meetingId,
        title: data.title,
        date: data.date,
        participants: participantsArray,
        recording_url: recordingUrl || undefined,
        transcript_url: transcriptUrl || undefined,
        minutes: data.minutes || undefined,
      });
      
      if (!meetingCreated) {
        throw new Error('Failed to create meeting record');
      }
      
      // Generate AI summary if transcript is uploaded
      if (transcriptUrl) {
        const queueCreated = await createProcessingQueueItem(meetingId, transcriptUrl);
        
        if (!queueCreated) {
          console.error('Failed to create processing queue item, but continuing...');
        }
      }
      
      toast({
        title: "Meeting uploaded successfully",
        description: "Your meeting has been saved and will be available soon.",
      });
      
      // Close the dialog
      onClose();
      
    } catch (error) {
      console.error("Error uploading meeting:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Meeting</CardTitle>
        <CardDescription>
          Add a new team meeting with recording, transcript, and minutes
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter meeting title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              rules={{ required: "Date is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="participants"
              rules={{ required: "Participants are required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Participants</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter participant names separated by commas" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recording"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Meeting Recording</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="file" 
                        accept="video/mp4,video/webm"
                        onChange={(e) => onChange(e.target.files)}
                        disabled={isUploading}
                        className={isUploading ? "opacity-50" : ""}
                        {...rest}
                      />
                      {isUploading && uploadProgress.recording > 0 && uploadProgress.recording < 100 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <div className="text-sm text-primary font-medium flex items-center">
                            <Loader className="animate-spin mr-2 h-4 w-4" />
                            {uploadProgress.recording}%
                          </div>
                        </div>
                      )}
                      {isUploading && uploadProgress.recording === 100 && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload the video recording of your meeting (MP4 or WebM format)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transcript"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Meeting Transcript</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="file" 
                        accept=".txt,.doc,.docx,.pdf"
                        onChange={(e) => onChange(e.target.files)}
                        disabled={isUploading}
                        className={isUploading ? "opacity-50" : ""}
                        {...rest}
                      />
                      {isUploading && uploadProgress.transcript > 0 && uploadProgress.transcript < 100 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <div className="text-sm text-primary font-medium flex items-center">
                            <Loader className="animate-spin mr-2 h-4 w-4" />
                            {uploadProgress.transcript}%
                          </div>
                        </div>
                      )}
                      {isUploading && uploadProgress.transcript === 100 && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload the transcript to generate an AI summary (TXT, DOC, DOCX, or PDF)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Minutes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter the meeting minutes here..." 
                      rows={5} 
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? (
                <motion.div className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" /> Uploading...
                </motion.div>
              ) : (
                <motion.div className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" /> Upload Meeting
                </motion.div>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default MeetingUploadForm;
