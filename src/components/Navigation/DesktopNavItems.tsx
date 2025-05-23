
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ExternalLink, BookOpenText, Users } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Resource components for the navigation dropdown
const resourceComponents: { title: string; href: string; description: string }[] = [
  {
    title: 'Meeting Notes',
    href: '/meetings',
    description:
      'Access all team meeting notes and sprint retrospectives.',
  },
  {
    title: 'Team Members',
    href: '/team',
    description:
      'View all InnovAIte team members and their profiles.',
  },
  {
    title: 'Blog & Vlogs',
    href: '/blog',
    description:
      'Read our latest blogs and watch video content.',
  },
];

export const DesktopNavItems = () => {
  return (
    <div className="hidden md:flex md:flex-1 md:justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link to="/">
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-white hover:bg-blue-900/50 dark:hover:bg-blue-950/70"
              )}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent text-white hover:bg-blue-900/50 dark:hover:bg-blue-950/70">
              Resources
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black/90 backdrop-blur dark:bg-black/95">
                {resourceComponents.map((component) => (
                  <li key={component.title} className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        to={component.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-900/40 hover:text-white focus:bg-blue-900/40 focus:text-white"
                      >
                        <div className="text-sm font-medium leading-none text-white">{component.title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-white/70">
                          {component.description}
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/blog">
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-white hover:bg-blue-900/50 dark:hover:bg-blue-950/70"
              )}>
                <BookOpenText className="mr-1 h-4 w-4" />
                Blog
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/team">
              <NavigationMenuLink className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent text-white hover:bg-blue-900/50 dark:hover:bg-blue-950/70"
              )}>
                <Users className="mr-1 h-4 w-4" />
                Team
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://innovate-spark-hackathon-hub.lovable.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    )}
                  >
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Hackathon
                  </a>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 text-white border-blue-800/30">
                  Visit InnovAIte Hackathon Hub
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://creative-caramel-881abb.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                    )}
                  >
                    <ExternalLink className="mr-1 h-4 w-4" />
                    No Code Jam
                  </a>
                </TooltipTrigger>
                <TooltipContent className="bg-black/90 text-white border-blue-800/30">
                  Visit No Code Jam Platform
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default DesktopNavItems;
