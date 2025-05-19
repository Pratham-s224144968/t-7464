
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { motion } from "@/components/ui/motion";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    
    // Create particle effects
    const container = document.querySelector('.auth-container');
    if (container) {
      for (let i = 0; i < 15; i++) {
        createParticle(container as HTMLElement);
      }
    }
  }, []);

  const createParticle = (container: HTMLElement) => {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 4;
    
    particle.className = 'particle';
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = `rgba(59, 130, 246, ${Math.random() * 0.5 + 0.2})`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    const animDuration = Math.random() * 15 + 10;
    const animDelay = Math.random() * 5;
    
    particle.style.animation = `float-particle ${animDuration}s infinite ease-in-out ${animDelay}s`;
    
    container.appendChild(particle);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        // Sign up flow
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Account created successfully!",
          description: "Please check your email for the confirmation link.",
        });
      } else {
        // Sign in flow
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast({
          title: "Signed in successfully!",
          description: "Welcome back!",
        });
        
        // Redirect to home page on successful login
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.error_description || error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container flex min-h-screen bg-black items-center justify-center px-4 py-24 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,100 C30,50 70,50 100,100"
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="path-animation"
            />
            <motion.path
              d="M0,80 C20,60 50,100 100,80"
              stroke="rgba(139, 92, 246, 0.5)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
              className="path-animation"
            />
          </svg>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 w-full max-w-md"
        >
          <Card className="glass-effect bg-black/50 border border-white/10 text-white">
            <CardHeader className="space-y-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CardTitle className="text-2xl font-bold">
                  {isSignUp ? "Create an account" : "Sign in to your account"}
                </CardTitle>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CardDescription className="text-white/60">
                  {isSignUp
                    ? "Enter your details below to create your account"
                    : "Enter your credentials to access your account"}
                </CardDescription>
              </motion.div>
            </CardHeader>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <CardContent>
                <form onSubmit={handleAuth} className="space-y-4">
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-black/50 border-white/20 text-white focus:border-blue-500 transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-black/50 border-white/20 text-white focus:border-blue-500 transition-all duration-300"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 btn-animated"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : isSignUp ? (
                        "Create Account"
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-white/60 text-center w-full">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="ml-2 text-blue-400 hover:text-blue-300 underline transition-colors duration-300"
                  >
                    {isSignUp ? "Sign in" : "Sign up"}
                  </button>
                </div>
              </CardFooter>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Auth;
