
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import TeamMeetings from "./pages/TeamMeetings";
import MeetingDetail from "./pages/MeetingDetail";
import TeamMembers from "./pages/TeamMembers";
import BlogPosts from "./pages/BlogPosts";
import BlogPostDetail from "./pages/BlogPostDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/meetings" element={<TeamMeetings />} />
              <Route path="/meetings/:id" element={<MeetingDetail />} />
              <Route path="/team" element={<TeamMembers />} />
              <Route path="/blog" element={<BlogPosts />} />
              <Route path="/blog/:id" element={<BlogPostDetail />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
