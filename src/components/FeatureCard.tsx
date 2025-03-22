
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-blue-900/30 bg-blue-950/20 p-6 hover:shadow-lg transition-all backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <div className="rounded-full bg-blue-500/10 p-3">
          <Icon className="h-6 w-6 text-blue-400" />
        </div>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      <p className="mt-4 text-sm text-white/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
