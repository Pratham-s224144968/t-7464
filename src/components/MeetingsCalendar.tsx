
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Video, FileText } from 'lucide-react';
import { motion } from "@/components/ui/motion";
import { Link } from 'react-router-dom';

type Meeting = {
  id: string;
  title: string;
  date: string;
  time?: string;
  participants: string[];
  hasRecording: boolean;
  hasMinutes: boolean;
  hasSummary: boolean;
};

interface MeetingsCalendarProps {
  meetings: Meeting[];
}

const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({ meetings }) => {
  // Get current year and month
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  
  // Generate calendar days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Function to navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  // Function to navigate to next month
  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  // Get month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[currentMonth];
  
  // Group meetings by date for the current month
  const meetingsByDate: Record<string, Meeting[]> = {};
  
  meetings.forEach(meeting => {
    const meetingDate = new Date(meeting.date);
    
    // Only include meetings for the current month
    if (meetingDate.getMonth() === currentMonth && meetingDate.getFullYear() === currentYear) {
      const day = meetingDate.getDate();
      if (!meetingsByDate[day]) {
        meetingsByDate[day] = [];
      }
      meetingsByDate[day].push(meeting);
    }
  });
  
  // Generate calendar cells
  const calendarCells = [];
  
  // Add day names header
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dayNames.forEach(day => {
    calendarCells.push(
      <div key={`header-${day}`} className="text-center py-2 text-blue-400 font-medium text-sm">
        {day}
      </div>
    );
  });
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarCells.push(
      <div key={`empty-start-${i}`} className="p-1 bg-blue-950/10 border border-blue-500/5 min-h-[100px]"></div>
    );
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = new Date().getDate() === day && 
                   new Date().getMonth() === currentMonth && 
                   new Date().getFullYear() === currentYear;
    
    const meetingsForDay = meetingsByDate[day] || [];
    const hasEvents = meetingsForDay.length > 0;
    
    calendarCells.push(
      <div 
        key={`day-${day}`} 
        className={`p-1 border border-blue-500/10 ${isToday ? 'bg-blue-900/20' : 'bg-blue-950/10'} min-h-[100px] relative overflow-hidden hover:bg-blue-900/30 transition-colors`}
      >
        <div className={`text-right p-1 sticky top-0 ${isToday ? 'text-blue-300 font-bold' : 'text-blue-400'}`}>
          {day}
        </div>
        
        {hasEvents ? (
          <div className="mt-1 space-y-1">
            {meetingsForDay.slice(0, 2).map(meeting => (
              <Link to={`/meetings/${meeting.id}`} key={meeting.id}>
                <div className="bg-blue-800/40 text-blue-100 rounded p-1 text-xs hover:bg-blue-700/40 transition-colors cursor-pointer">
                  <div className="truncate font-medium">{meeting.title}</div>
                  <div className="flex items-center mt-1 space-x-1">
                    {meeting.hasRecording && <Video className="h-3 w-3 text-blue-300" />}
                    {meeting.hasMinutes && <FileText className="h-3 w-3 text-blue-300" />}
                    {meeting.time && <span className="text-blue-300">{meeting.time}</span>}
                  </div>
                </div>
              </Link>
            ))}
            
            {meetingsForDay.length > 2 && (
              <div className="text-xs text-center text-blue-400 py-1">
                + {meetingsForDay.length - 2} more
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
  
  // Add empty cells for days after the last day of the month
  const totalCellsNeeded = 42; // 7 days * 6 rows (max possible)
  const addedCells = startingDayOfWeek + daysInMonth;
  
  if (addedCells < totalCellsNeeded) {
    const remainingEmptyCells = Math.min(7 - (addedCells % 7), 7);
    for (let i = 0; i < remainingEmptyCells; i++) {
      calendarCells.push(
        <div key={`empty-end-${i}`} className="p-1 bg-blue-950/10 border border-blue-500/5 min-h-[100px]"></div>
      );
    }
  }
  
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur">
        <CardHeader className="bg-blue-900/20 flex flex-row justify-between items-center pb-4">
          <CardTitle className="text-white flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5 text-blue-400" />
            <span>{currentMonthName} {currentYear}</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={goToPreviousMonth} className="h-8 w-8 border-blue-500/30 text-blue-300 hover:bg-blue-900/30">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous month</span>
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextMonth} className="h-8 w-8 border-blue-500/30 text-blue-300 hover:bg-blue-900/30">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next month</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-7 gap-1">
            {calendarCells}
          </div>
          
          <div className="mt-4 flex items-center justify-end gap-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-800/40 rounded-sm mr-1"></div>
              <span className="text-blue-300">Meeting scheduled</span>
            </div>
            <div className="flex items-center">
              <Video className="h-3 w-3 text-blue-300 mr-1" />
              <span className="text-blue-300">Has recording</span>
            </div>
            <div className="flex items-center">
              <FileText className="h-3 w-3 text-blue-300 mr-1" />
              <span className="text-blue-300">Has minutes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MeetingsCalendar;
