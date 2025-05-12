
import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type MeetingFormData = {
  title: string;
  date: string;
  participants: string;
  recording: FileList | null;
  minutes: string;
};

const MeetingUploadForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<MeetingFormData>();

  const onSubmit = (data: MeetingFormData) => {
    console.log("Form submitted:", data);
    // In a real app, you would process the form data here
    // For example, upload files to storage and save meeting info to a database
    onClose();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Meeting</CardTitle>
        <CardDescription>
          Add a new team meeting with recording, minutes, and participants
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              placeholder="Enter meeting title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Meeting Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: "Date is required" })}
            />
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="participants">Participants</Label>
            <Input
              id="participants"
              placeholder="Enter participant names separated by commas"
              {...register("participants", { required: "Participants are required" })}
            />
            {errors.participants && (
              <p className="text-sm text-destructive">{errors.participants.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="recording">Meeting Recording</Label>
            <Input
              id="recording"
              type="file"
              accept="video/mp4,video/webm"
              {...register("recording")}
            />
            <p className="text-sm text-muted-foreground">
              Upload the video recording of your meeting (MP4 or WebM format)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minutes">Meeting Minutes</Label>
            <Textarea
              id="minutes"
              placeholder="Enter the meeting minutes here..."
              rows={5}
              {...register("minutes")}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Upload Meeting</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default MeetingUploadForm;
