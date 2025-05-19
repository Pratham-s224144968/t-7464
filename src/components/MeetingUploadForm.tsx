
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "@/components/ui/motion";
import { Loader, Upload, Check, Lock, VideoIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { isValidYoutubeUrl, getYoutubeEmbedUrl } from "@/services/fileUploadService";
import { createMeeting } from "@/services/meetingService";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";

type MeetingFormData = {
  title: string;
  date: string;
  time?: string;
  participants: string;
  youtubeUrl: string;
  transcript: FileList | null;
  minutes: string;
};

const MeetingUploadForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { toast } = useToast();
  const { user, isAuthenticated, isDeakinUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({
    transcript: 0
  });
  const [youtubePreview, setYoutubePreview] = useState<string | null>(null);
  
  const form = useForm<MeetingFormData>({
    defaultValues: {
      title: "",
      date: "",
      time: "",
      participants: "",
      youtubeUrl: "",
      transcript: null,
      minutes: "",
    }
  });

  // Preview YouTube video when URL changes
  const watchYoutubeUrl = form.watch("youtubeUrl");
  React.useEffect(() => {
    if (watchYoutubeUrl && isValidYoutubeUrl(watchYoutubeUrl)) {
      const embedUrl = getYoutubeEmbedUrl(watchYoutubeUrl);
      setYoutubePreview(embedUrl);
    } else {
      setYoutubePreview(null);
    }
  }, [watchYoutubeUrl]);

  // Render restricted access message if not authenticated or not a Deakin user
  if (!isAuthenticated || !isDeakinUser) {
    return (
      <Card className="w-full max-w-lg mx-auto">
        <CardContent className="flex flex-col items-center justify-center p-8 md:p-12 text-center">
          <Lock className="h-12 w-12 md:h-16 md:w-16 text-red-400 mb-4" />
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
      // Validate that the YouTube URL is correct
      if (!isValidYoutubeUrl(data.youtubeUrl)) {
        form.setError("youtubeUrl", {
          type: "manual",
          message: "Please enter a valid YouTube video URL"
        });
        return;
      }

      setIsSubmitting(true);
      
      // Generate a unique ID for this meeting
      const meetingId = uuidv4();
      
      // Get YouTube embed URL
      const youtubeEmbedUrl = getYoutubeEmbedUrl(data.youtubeUrl);
      if (!youtubeEmbedUrl) {
        throw new Error("Failed to process YouTube URL");
      }
      
      let transcriptUrl = null;
      
      // Upload transcript if provided
      if (data.transcript && data.transcript[0]) {
        const file = data.transcript[0];
        const fileExt = file.name.split('.').pop();
        const filePath = `meetings/${meetingId}/transcript.${fileExt}`;
        
        /* In a real app, this would upload to Supabase storage
        transcriptUrl = await uploadFile(
          file, 
          'meeting-files', 
          filePath,
          (progress) => {
            setUploadProgress(prev => ({ ...prev, transcript: progress }));
          }
        ); */
        
        // For demo purposes
        setTimeout(() => {
          setUploadProgress(prev => ({ ...prev, transcript: 100 }));
        }, 1500);
        
        transcriptUrl = "https://example.com/transcript.txt";
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
        time: data.time,
        participants: participantsArray,
        recording_url: youtubeEmbedUrl,
        transcript_url: transcriptUrl || undefined,
        minutes: data.minutes || undefined,
      });
      
      if (!meetingCreated) {
        throw new Error('Failed to create meeting record');
      }
      
      toast({
        title: "Meeting added successfully",
        description: "Your meeting has been saved and is now available.",
      });
      
      // Close the dialog
      onClose();
      
    } catch (error) {
      console.error("Error submitting meeting:", error);
      toast({
        title: "Submission failed",
        description: "There was an error adding your meeting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="px-4 sm:px-6 bg-gradient-to-r from-blue-900/50 to-blue-700/30">
        <CardTitle className="text-xl sm:text-2xl text-white">Add New Meeting</CardTitle>
        <CardDescription className="text-blue-200">
          Enter meeting details and provide a YouTube video link
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4 px-4 sm:px-6 py-6 max-h-[70vh] overflow-y-auto">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meeting Time (optional)</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              name="youtubeUrl"
              rules={{ 
                required: "YouTube URL is required",
                validate: value => isValidYoutubeUrl(value) || "Please enter a valid YouTube video URL" 
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube Video URL</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <div className="relative">
                        <VideoIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="https://www.youtube.com/watch?v=..." 
                          className="pl-8" 
                          {...field} 
                        />
                      </div>
                      
                      {field.value && !isValidYoutubeUrl(field.value) && (
                        <Alert variant="destructive" className="py-2 px-3">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-xs">
                            This doesn't look like a valid YouTube URL
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {youtubePreview && (
                        <div className="aspect-video w-full max-h-36 mt-2 overflow-hidden rounded border border-blue-500/30 bg-black/50">
                          <iframe
                            src={youtubePreview}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                            title="YouTube video preview"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Enter a YouTube URL (e.g., https://www.youtube.com/watch?v=XXXX)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transcript"
              render={({ field: { onChange, value, ...rest } }) => (
                <FormItem>
                  <FormLabel>Meeting Transcript (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="file" 
                        accept=".txt,.doc,.docx,.pdf"
                        onChange={(e) => onChange(e.target.files)}
                        disabled={isSubmitting}
                        className={isSubmitting ? "opacity-50" : ""}
                        {...rest}
                      />
                      {isSubmitting && uploadProgress.transcript > 0 && uploadProgress.transcript < 100 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                          <div className="text-sm text-primary font-medium flex items-center">
                            <Loader className="animate-spin mr-2 h-4 w-4" />
                            {uploadProgress.transcript}%
                          </div>
                        </div>
                      )}
                      {isSubmitting && uploadProgress.transcript === 100 && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Upload the transcript (TXT, DOC, DOCX, or PDF)
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting Minutes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter the meeting minutes here..." 
                      rows={4} 
                      {...field} 
                      className="resize-none"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between px-4 sm:px-6 py-4 bg-gradient-to-r from-blue-900/30 to-blue-700/20 border-t border-blue-500/20">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <motion.div className="flex items-center">
                  <Loader className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </motion.div>
              ) : (
                <motion.div className="flex items-center">
                  <Upload className="mr-2 h-4 w-4" /> Add Meeting
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
