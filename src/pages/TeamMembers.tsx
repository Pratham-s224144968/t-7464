
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Mail, Phone, Users, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import { motion } from "@/components/ui/motion";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  skills: string[];
  projects: string[];
  availability: "Available" | "In Meeting" | "Busy" | "Out of Office";
};

// Sample team members data
const SAMPLE_TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    role: "Senior Developer",
    department: "Engineering",
    email: "john.doe@innovaite.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    bio: "John is a senior developer with over 10 years of experience in building web applications. He specializes in React, TypeScript, and Node.js.",
    skills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
    projects: ["Product Dashboard", "Client Portal", "Mobile App"],
    availability: "Available"
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "UX Designer",
    department: "Design",
    email: "jane.smith@innovaite.com",
    phone: "+1 (555) 987-6543",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150",
    bio: "Jane is a UX designer with a passion for creating intuitive and engaging user experiences. She has a background in visual design and user research.",
    skills: ["UI Design", "User Research", "Wireframing", "Prototyping", "Figma"],
    projects: ["Product Dashboard", "Marketing Website", "Mobile App"],
    availability: "In Meeting"
  },
  {
    id: "3",
    name: "Robert Johnson",
    role: "Product Manager",
    department: "Product",
    email: "robert.johnson@innovaite.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
    bio: "Robert is a product manager with expertise in agile methodologies. He works closely with developers, designers, and stakeholders to deliver high-quality products.",
    skills: ["Agile", "JIRA", "Product Strategy", "User Stories", "Market Research"],
    projects: ["Product Dashboard", "Client Portal", "Feature Planning"],
    availability: "Busy"
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Marketing Specialist",
    department: "Marketing",
    email: "emily.davis@innovaite.com",
    phone: "+1 (555) 789-0123",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150",
    bio: "Emily specializes in digital marketing, SEO, and content strategy. She has helped numerous companies grow their online presence and reach their target audience.",
    skills: ["SEO", "Content Strategy", "Social Media", "Google Analytics", "Email Marketing"],
    projects: ["Marketing Website", "Social Media Campaign", "Content Calendar"],
    availability: "Available"
  },
  {
    id: "5",
    name: "Michael Brown",
    role: "DevOps Engineer",
    department: "Operations",
    email: "michael.brown@innovaite.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=150",
    bio: "Michael is a DevOps engineer experienced in cloud infrastructure, CI/CD pipelines, and automation. He ensures smooth operations and deployment of our applications.",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"],
    projects: ["Infrastructure Upgrade", "Deployment Pipeline", "Cloud Migration"],
    availability: "Out of Office"
  },
  {
    id: "6",
    name: "Sarah Wilson",
    role: "Data Scientist",
    department: "Engineering",
    email: "sarah.wilson@innovaite.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
    bio: "Sarah is a data scientist with a strong background in machine learning and statistical analysis. She helps our team make data-driven decisions.",
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "TensorFlow"],
    projects: ["Analytics Dashboard", "Recommendation Engine", "Data Pipeline"],
    availability: "Available"
  }
];

// Available filters for department 
const DEPARTMENTS = ["All", "Engineering", "Design", "Product", "Marketing", "Operations"];

// Available projects
const PROJECTS = ["All", "Product Dashboard", "Client Portal", "Mobile App", "Marketing Website", "Social Media Campaign", "Content Calendar", "Infrastructure Upgrade", "Deployment Pipeline", "Cloud Migration", "Analytics Dashboard", "Recommendation Engine", "Data Pipeline", "Feature Planning"];

const TeamMembers: React.FC = () => {
  const [teamMembers] = useState<TeamMember[]>(SAMPLE_TEAM_MEMBERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedProjects, setSelectedProjects] = useState<string[]>(["All"]);
  const [showFilters, setShowFilters] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Handle project filter selection
  const handleProjectChange = (project: string) => {
    if (project === "All") {
      // If "All" is selected, clear other selections
      setSelectedProjects(["All"]);
    } else {
      // If "All" is already selected and another is chosen, remove "All"
      if (selectedProjects.includes("All")) {
        setSelectedProjects([project]);
      } else {
        // Toggle the selection
        if (selectedProjects.includes(project)) {
          const newProjects = selectedProjects.filter(p => p !== project);
          // If no projects left, set back to "All"
          setSelectedProjects(newProjects.length ? newProjects : ["All"]);
        } else {
          setSelectedProjects([...selectedProjects, project]);
        }
      }
    }
  };

  // If user is not authenticated, show locked content view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <motion.section 
          className="py-20 px-4 pt-28 bg-gradient-to-b from-black to-blue-950/50" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto max-w-3xl">
            <motion.h2 
              className="text-3xl font-mono font-bold mb-12 text-center text-blue-500" 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              /TEAM MEMBERS - RESTRICTED
            </motion.h2>
            
            <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur overflow-hidden">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <Lock className="h-20 w-20 text-blue-400 mb-6" />
                </motion.div>
                <CardTitle className="text-white text-2xl mb-4">Confidential Information</CardTitle>
                <CardDescription className="text-blue-300 mb-8 max-w-md text-lg">
                  Team member details are only available to authenticated users. Please sign in to access this information.
                </CardDescription>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => {
                      toast({
                        title: "Authentication Required",
                        description: "Redirecting to login page...",
                        variant: "default",
                      });
                      navigate("/auth");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                    size="lg"
                  >
                    Sign In to Access
                  </Button>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-8"
                >
                  <img 
                    src="/lovable-uploads/e2814672-f895-4078-9d7c-faa5569a0d14.png" 
                    alt="Deakin University Logo"
                    className="h-24 opacity-70" 
                  />
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      </div>
    );
  }

  // Filter team members based on search, department, and project
  const filteredTeamMembers = teamMembers.filter((member) => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = 
      selectedDepartment === "All" || member.department === selectedDepartment;
    
    const matchesProject = 
      selectedProjects.includes("All") || 
      member.projects.some(project => selectedProjects.includes(project));
    
    return matchesSearch && matchesDepartment && matchesProject;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <motion.section className="py-20 px-4 pt-28 bg-gradient-to-b from-black to-blue-950/50" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        duration: 0.8
      }}>
        <div className="container mx-auto">
          <motion.h2 className="text-3xl font-mono font-bold mb-12 text-center text-blue-500" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2,
            duration: 0.5
          }}>
            /TEAM MEMBERS
          </motion.h2>
          
          <motion.div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4" initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.3,
            duration: 0.5
          }}>
            <Button variant="ghost" asChild className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>

            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-400" />
              <Input 
                type="text" 
                placeholder="Search members by name, role, or skills..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-blue-950/30 border-blue-500/30 text-blue-100 placeholder:text-blue-400/60 focus:border-blue-400"
              />
            </div>

            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="bg-blue-950/30 border-blue-500/30 text-blue-100 hover:bg-blue-900/50"
            >
              Filters {showFilters ? '▲' : '▼'}
            </Button>
          </motion.div>

          {/* Filters Section */}
          <Collapsible open={showFilters} className="mb-8">
            <CollapsibleContent>
              <motion.div 
                className="p-4 bg-blue-950/30 border border-blue-500/30 rounded-md mb-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-2">Department</h3>
                    <div className="flex flex-wrap gap-2">
                      {DEPARTMENTS.map((dept) => (
                        <Button
                          key={dept}
                          variant={selectedDepartment === dept ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedDepartment(dept)}
                          className={selectedDepartment === dept ? 
                            "bg-blue-600 hover:bg-blue-700" : 
                            "bg-blue-950/10 border-blue-500/20 text-blue-300 hover:bg-blue-900/30"}
                        >
                          {dept}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-blue-300 mb-2">Projects</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {PROJECTS.slice(0, 8).map((project) => (
                        <div key={project} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`project-${project}`} 
                            checked={selectedProjects.includes(project)}
                            onCheckedChange={() => handleProjectChange(project)}
                            className="border-blue-500/50 data-[state=checked]:bg-blue-600"
                          />
                          <label 
                            htmlFor={`project-${project}`}
                            className="text-sm text-blue-200 cursor-pointer"
                          >
                            {project}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </CollapsibleContent>
          </Collapsible>

          {filteredTeamMembers.length === 0 ? (
            <motion.div 
              className="text-center py-10 text-blue-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              No team members found matching your search criteria. Try adjusting your filters.
            </motion.div>
          ) : (
            <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.4,
              duration: 0.5
            }}>
              {filteredTeamMembers.map((member, index) => (
                <motion.div 
                  key={member.id} 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                >
                  <Card className="bg-blue-950/20 border-blue-500/30 backdrop-blur overflow-hidden hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                    <CardHeader className="bg-blue-900/20 flex flex-row items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-400/50">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-white">{member.name}</CardTitle>
                        <CardDescription className="text-blue-200">
                          {member.role} • {member.department}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="mb-4">
                        <p className="text-sm mb-2">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs mr-2 ${
                            member.availability === "Available" ? "bg-green-900/40 text-green-300" :
                            member.availability === "In Meeting" ? "bg-yellow-900/40 text-yellow-300" :
                            member.availability === "Busy" ? "bg-orange-900/40 text-orange-300" :
                            "bg-red-900/40 text-red-300"
                          }`}>
                            {member.availability}
                          </span>
                        </p>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center text-blue-300 mb-2">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${member.email}`} className="text-sm hover:text-blue-400">
                            {member.email}
                          </a>
                        </div>
                        <div className="flex items-center text-blue-300">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${member.phone}`} className="text-sm hover:text-blue-400">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {member.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} className="bg-blue-900/40 text-blue-200 hover:bg-blue-800/50">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <Badge className="bg-blue-900/40 text-blue-200 hover:bg-blue-800/50 cursor-pointer">
                                +{member.skills.length - 3}
                              </Badge>
                            </HoverCardTrigger>
                            <HoverCardContent className="bg-blue-950 border-blue-500/30 text-blue-100">
                              <div className="flex flex-wrap gap-1">
                                {member.skills.slice(3).map((skill) => (
                                  <Badge key={skill} className="bg-blue-900/40 text-blue-200">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                        )}
                      </div>
                      
                      <div className="flex items-center text-sm text-blue-300 mb-2">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Active Projects:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.projects.map((project) => (
                          <Badge key={project} variant="outline" className="border-blue-500/30 text-blue-200">
                            {project}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="bg-blue-900/10">
                      <Button variant="outline" className="w-full border-blue-500/30 text-blue-300 hover:bg-blue-900/30 hover:text-blue-200">
                        View Full Profile
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default TeamMembers;
