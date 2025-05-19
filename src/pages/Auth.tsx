import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "@/components/ui/motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useAuthForm } from "@/hooks/useAuthForm";
import { 
  SignInFormValues, 
  SignUpFormValues, 
  ForgotPasswordFormValues,
  signInSchema, 
  signUpSchema,
  forgotPasswordSchema,
  isDeakinEmail
} from "@/lib/utils/auth-utils";

// UI Components
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Key, User, Info, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Auth = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, signIn, signUp, forgotPassword } = useAuthForm();
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [isPasswordResetMode, setIsPasswordResetMode] = useState(false);
  const [isVerificationMode, setIsVerificationMode] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const verifyParam = searchParams.get("verify");

  // Sign In Form
  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Sign Up Form
  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      agreeToTerms: false,
    },
  });

  // Forgot Password Form
  const forgotPasswordForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    // Check if user is already logged in
    if (isAuthenticated) {
      navigate("/");
    }

    // Check if we're in verification mode
    if (verifyParam === "true") {
      setIsVerificationMode(true);
    }

    // Create particle effects
    const container = document.querySelector('.auth-container');
    if (container) {
      for (let i = 0; i < 15; i++) {
        createParticle(container as HTMLElement);
      }
    }
  }, [isAuthenticated, navigate, verifyParam]);

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

  const handleSignIn = async (data: SignInFormValues) => {
    await signIn(data.email, data.password);
  };

  const handleSignUp = async (data: SignUpFormValues) => {
    await signUp(data.email, data.password, data.fullName);
  };

  const handleForgotPassword = async (data: ForgotPasswordFormValues) => {
    await forgotPassword(data.email);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setIsPasswordResetMode(false);
  };

  return (
    <>
      <div className="auth-container flex min-h-screen bg-black items-center justify-center px-4 py-24 relative overflow-hidden animated-gradient">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M0,100 C30,50 70,50 100,100"
              stroke="rgba(59, 130, 246, 0.5)"
              strokeWidth="0.5"
              fill="none"
              className="path-animation"
              style={{
                animation: "dash 2s ease-in-out forwards",
                strokeDasharray: "1000",
                strokeDashoffset: "1000"
              }}
            />
            <path
              d="M0,80 C20,60 50,100 100,80"
              stroke="rgba(139, 92, 246, 0.5)"
              strokeWidth="0.5"
              fill="none"
              className="path-animation"
              style={{
                animation: "dash 2.5s ease-in-out 0.3s forwards",
                strokeDasharray: "1000",
                strokeDashoffset: "1000"
              }}
            />
          </svg>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 w-full max-w-md"
        >
          {isVerificationMode ? (
            <Card className="glass-effect bg-black/50 border border-blue-500/30 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  Email Verification Sent
                </CardTitle>
                <CardDescription className="text-center text-white/70">
                  We've sent a verification email to your address.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-white/80">
                  Please check your inbox and click the verification link to complete your registration.
                </p>
                <Alert className="bg-blue-900/30 border-blue-500/30">
                  <Info className="h-4 w-4 text-blue-400" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription className="text-sm text-white/70">
                    If you don't see the email, please check your spam or junk folder.
                  </AlertDescription>
                </Alert>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  className="border-blue-500/30 text-white hover:bg-blue-900/50"
                  onClick={() => setIsVerificationMode(false)}
                >
                  Return to Login
                </Button>
              </CardFooter>
            </Card>
          ) : isPasswordResetMode ? (
            <Card className="glass-effect bg-black/50 border border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                <CardDescription className="text-white/60">
                  Enter your email to receive a password reset link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...forgotPasswordForm}>
                  <form 
                    onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} 
                    className="space-y-4"
                  >
                    <FormField
                      control={forgotPasswordForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white/80">Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                              <Input
                                {...field}
                                placeholder="your.email@example.com"
                                className="pl-10 bg-black/50 border-white/20 text-white focus:border-blue-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Reset Link...
                        </span>
                      ) : (
                        "Send Reset Link"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter>
                <Button
                  variant="link"
                  className="w-full text-blue-400 hover:text-blue-300"
                  onClick={() => setIsPasswordResetMode(false)}
                >
                  Return to Sign In
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="glass-effect bg-black/50 border border-white/10 text-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {activeTab === "signin" ? "Sign in to your account" : "Create an account"}
                </CardTitle>
                <CardDescription className="text-white/60">
                  {activeTab === "signin" 
                    ? "Enter your credentials to access your account" 
                    : "Enter your details below to create your account"}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs
                  defaultValue="signin"
                  value={activeTab}
                  onValueChange={handleTabChange}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-black/30">
                    <TabsTrigger value="signin" className="data-[state=active]:bg-blue-900/50">Sign In</TabsTrigger>
                    <TabsTrigger value="signup" className="data-[state=active]:bg-blue-900/50">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  {/* Sign In Form */}
                  <TabsContent value="signin" className="space-y-4">
                    <Form {...signInForm}>
                      <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
                        <FormField
                          control={signInForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                  <Input
                                    {...field}
                                    placeholder="your.email@example.com"
                                    className="pl-10 bg-black/50 border-white/20 text-white focus:border-blue-500"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={signInForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Key className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 bg-black/50 border-white/20 text-white focus:border-blue-500"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="link"
                            className="text-blue-400 hover:text-blue-300 p-0"
                            onClick={() => setIsPasswordResetMode(true)}
                          >
                            Forgot password?
                          </Button>
                        </div>
                        
                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Signing In...
                            </span>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  {/* Sign Up Form */}
                  <TabsContent value="signup" className="space-y-4">
                    <Form {...signUpForm}>
                      <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                        <FormField
                          control={signUpForm.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">Full Name</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <User className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                  <Input
                                    {...field}
                                    placeholder="John Doe"
                                    className="pl-10 bg-black/50 border-white/20 text-white focus:border-blue-500"
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      
                        <FormField
                          control={signUpForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-white/80">Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                  <Input
                                    {...field}
                                    placeholder="your.email@example.com"
                                    className="pl-10 bg-black/50 border-white/20 text-white focus:border-blue-500"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      const isDeakin = isDeakinEmail(e.target.value);
                                      if (isDeakin) {
                                        toast({
                                          title: "Deakin Email Detected",
                                          description: "You'll receive special access to Deakin-specific content.",
                                          variant: "default",
                                        });
                                      }
                                    }}
                                  />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={signUpForm.control}
                            name="password"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/80">Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Key className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                    <Input
                                      {...field}
                                      type="password"
                                      placeholder="••••••••"
                                      className="pl-10 bg-black/50 border-white/20 text-white focus:border-blue-500"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={signUpForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white/80">Confirm Password</FormLabel>
                                <FormControl>
                                  <div className="relative">
                                    <Key className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                                    <Input
                                      {...field}
                                      type="password"
                                      placeholder="••••••••"
                                      className="pl-10 bg-black/50 border-white/20 text-white focus:border-blue-500"
                                    />
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={signUpForm.control}
                          name="agreeToTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-blue-600"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm text-white/70">
                                  I agree to the <a href="#" className="text-blue-400 underline hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 underline hover:text-blue-300">Privacy Policy</a>
                                </FormLabel>
                                <FormMessage />
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Creating Account...
                            </span>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </form>
                    </Form>

                    <Alert className="bg-blue-900/20 border-blue-500/30">
                      <AlertCircle className="h-4 w-4 text-blue-400" />
                      <AlertTitle>Email Verification Required</AlertTitle>
                      <AlertDescription className="text-xs text-white/70">
                        After registration, you'll need to verify your email address before you can sign in.
                      </AlertDescription>
                    </Alert>
                  </TabsContent>
                </Tabs>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-black px-2 text-white/40">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <Button
                    variant="outline"
                    className="border-white/10 text-white hover:bg-blue-900/30 hover:text-white"
                    disabled={loading}
                  >
                    <img src="https://authjs.dev/img/providers/google.svg" className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="flex justify-center text-center text-sm text-white/60">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-4"
                >
                  <img 
                    src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png"
                    alt="Deakin University Logo"
                    className="h-10 opacity-70" 
                  />
                  <p className="mt-2 text-xs">
                    Deakin University users get special access to exclusive content
                  </p>
                </motion.div>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Fix for the TypeScript error - change the style element to use standard attributes */}
      <style>
        {`
          @keyframes float-particle {
            0%, 100% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(-20px) translateX(10px);
            }
          }
          
          @keyframes dash {
            to {
              stroke-dashoffset: 0;
            }
          }
          
          .animated-gradient {
            background: linear-gradient(135deg, rgba(10,10,20,1) 0%, rgba(20,20,40,1) 100%);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }
          
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .particle {
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            opacity: 0.6;
          }
          
          .glass-effect {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        `}
      </style>
    </>
  );
};

export default Auth;
