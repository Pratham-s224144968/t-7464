
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

// Create a NavbarWrapper component that will only render on the client side
const NavbarWrapper = () => {
  // Only render Navbar in browser environment
  if (typeof window === 'undefined') return null;
  
  return <Navbar />;
};

const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <AuthProvider>
              <NavbarWrapper />
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
