
import { motion } from "@/components/ui/motion";
import { useTheme } from "@/contexts/ThemeContext";
import { useState, useEffect } from "react";

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  variant?: "default" | "subtle" | "glow" | "particles";
  className?: string;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = "default",
  className = "",
}) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for interactive effects
  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating particles for the particle variant
  const particles = Array.from({ length: 20 }).map((_, i) => (
    <motion.div
      key={i}
      className={`absolute rounded-full ${
        theme === "dark" ? "bg-primary/20" : "bg-primary/10"
      }`}
      style={{
        width: Math.random() * 20 + 5,
        height: Math.random() * 20 + 5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        x: [0, Math.random() * 100 - 50],
        y: [0, Math.random() * 100 - 50],
        opacity: [0.1, 0.5, 0.1],
      }}
      transition={{
        duration: Math.random() * 10 + 15,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  ));

  if (!mounted) return <div className={className}>{children}</div>;

  if (variant === "particles") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0 z-0">
          {particles}
        </div>
        {children}
      </div>
    );
  }

  if (variant === "glow") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0 z-0 opacity-60 blur-3xl"
          animate={{
            background: theme === "dark" 
              ? [
                  "radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
                  "radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
                ] 
              : [
                  "radial-gradient(circle at 30% 30%, rgba(249, 115, 22, 0.2) 0%, transparent 70%)",
                  "radial-gradient(circle at 70% 70%, rgba(249, 115, 22, 0.2) 0%, transparent 70%)"
                ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute inset-0 z-0 opacity-30 blur-2xl"
          animate={{
            background: [
              `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme === "dark" ? "rgba(139, 92, 246, 0.4)" : "rgba(59, 130, 246, 0.3)"} 0%, transparent 50%)`,
            ]
          }}
          transition={{ duration: 0.5 }}
        />
        {children}
      </div>
    );
  }

  if (variant === "subtle") {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <motion.div
          className="absolute inset-0 z-0 opacity-20"
          animate={{
            background: theme === "dark" 
              ? [
                  "linear-gradient(to right, rgba(139, 92, 246, 0.1), transparent)",
                  "linear-gradient(to right, transparent, rgba(139, 92, 246, 0.1))"
                ] 
              : [
                  "linear-gradient(to right, rgba(59, 130, 246, 0.05), transparent)",
                  "linear-gradient(to right, transparent, rgba(59, 130, 246, 0.05))"
                ]
          }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        />
        {children}
      </div>
    );
  }

  // Default animated background
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{
          background: theme === "dark" 
            ? "radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)"
        }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="absolute inset-0 z-0 opacity-30"
        animate={{
          background: theme === "dark"
            ? "linear-gradient(to bottom right, rgba(139, 92, 246, 0.1) 0%, transparent 100%)"
            : "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05) 0%, transparent 100%)"
        }}
        transition={{ duration: 0.5 }}
      />
      {children}
    </div>
  );
};

export default AnimatedBackground;
