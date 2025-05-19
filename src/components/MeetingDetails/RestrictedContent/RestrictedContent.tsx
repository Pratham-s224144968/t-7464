
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "@/components/ui/motion";
import { Lock } from "lucide-react";

interface RestrictedContentProps {
  title?: string;
  description?: string;
  buttonText?: string;
  logoSrc?: string;
  isDeakinSpecific?: boolean;
}

const RestrictedContent: React.FC<RestrictedContentProps> = ({
  title = "Restricted Content",
  description = "Meeting recordings are only available to authenticated users",
  buttonText = "Sign In to Access",
  logoSrc = "/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png",
  isDeakinSpecific = false
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className={`${isDeakinSpecific ? 'bg-blue-950/30 border-blue-400/50' : 'bg-blue-950/20 border-blue-500/30'} backdrop-blur`}>
      <CardContent className="flex flex-col items-center justify-center p-12 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Lock className={`h-16 w-16 ${isDeakinSpecific ? 'text-blue-300' : 'text-blue-400'} mb-4`} />
        </motion.div>
        <CardTitle className="text-white mb-2">{title}</CardTitle>
        <CardDescription className="text-blue-300 mb-4">
          {description}
          {isDeakinSpecific && (
            <div className="mt-2 font-medium text-blue-200">
              Only users with @deakin.edu.au email addresses have access to this feature.
            </div>
          )}
        </CardDescription>
        <Button
          onClick={() => navigate("/auth")}
          className={isDeakinSpecific ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"}
        >
          {buttonText}
        </Button>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <img 
            src={logoSrc}
            alt="Deakin University Logo"
            className="h-16 opacity-70" 
          />
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default RestrictedContent;
