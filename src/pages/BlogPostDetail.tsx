import { useParams, Link, useNavigate } from "react-router-dom";
import { getBlogPost } from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Youtube, MessageSquare, Share2, BookOpenText } from "lucide-react";
import { motion } from "@/components/ui/motion";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const BlogPostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const post = id ? getBlogPost(id) : undefined;
  
  useEffect(() => {
    if (!post) {
      toast({
        title: "Post not found",
        description: "The blog post you're looking for doesn't exist.",
        variant: "destructive"
      });
      navigate("/blog");
    }
  }, [post, navigate, toast]);
  
  if (!post) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Content area */}
      <div className="container mx-auto py-8">
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button 
            variant="outline" 
            className="text-white/70 border-blue-500/30 hover:bg-blue-950/50"
            asChild
          >
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </motion.div>
        
        {/* Hero section */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="outline" className="bg-blue-600/20 text-blue-300 border-blue-500/50">
              {post.category}
            </Badge>
            <span className="text-sm text-white/60">
              {format(post.date, "MMMM dd, yyyy")}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">{post.title}</h1>
          
          <div className="flex items-center mb-8">
            <Avatar className="h-10 w-10 mr-4">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-white">{post.author.name}</p>
              <p className="text-sm text-white/60">InnovAIte Team Member</p>
            </div>
          </div>
          
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* YouTube video if available */}
          {post.youtubeUrl && (
            <div className="mb-10">
              <div className="flex items-center gap-2 text-white mb-4">
                <Youtube className="h-5 w-5 text-red-500" />
                <h2 className="text-xl font-semibold">Watch the Video</h2>
              </div>
              
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-blue-950/20 flex items-center justify-center">
                <div className="text-center p-10">
                  <Youtube className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  <p className="text-white/80 mb-4">
                    YouTube video placeholder - replace with actual embed
                  </p>
                  <Button 
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => window.open(post.youtubeUrl, "_blank")}
                  >
                    Watch on YouTube
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-white/90 mb-6">
              {post.excerpt}
            </p>
            
            <p className="text-white/80 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed euismod, nisl nec tincidunt lacinia, nunc est ultricies nunc, vitae aliquam nunc nisl vitae nunc. Sed euismod, nisl nec tincidunt lacinia, nunc est ultricies nunc, vitae aliquam nunc nisl vitae nunc.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Key Insights</h2>
            
            <p className="text-white/80 mb-6">
              Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Donec ullamcorper nulla non metus auctor fringilla.
            </p>
            
            <ul className="list-disc pl-6 mb-6 text-white/80 space-y-2">
              <li>Nullam quis risus eget urna mollis ornare vel eu leo.</li>
              <li>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</li>
              <li>Vestibulum id ligula porta felis euismod semper.</li>
            </ul>
            
            <p className="text-white/80">
              Aenean lacinia bibendum nulla sed consectetur. Curabitur blandit tempus porttitor. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit. Vestibulum id ligula porta felis euismod semper.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-10 mb-4">Conclusion</h2>
            
            <p className="text-white/80 mb-6">
              Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
            </p>
          </div>
          
          <Separator className="my-10 bg-blue-500/30" />
          
          {/* Actions */}
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline"
                size="sm"
                className="text-white/70 border-blue-500/30 hover:bg-blue-950/50"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Comments ({post.commentCount})
              </Button>
              <Button 
                variant="outline"
                size="sm"
                className="text-white/70 border-blue-500/30 hover:bg-blue-950/50"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast({
                    title: "Link copied",
                    description: "The link to this post has been copied to your clipboard.",
                  });
                }}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
            
            <Button 
              asChild
              className="bg-blue-600 hover:bg-blue-700 mt-4 sm:mt-0"
            >
              <Link to="/blog">
                <BookOpenText className="mr-2 h-4 w-4" />
                View More Posts
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <footer className="bg-black border-t border-blue-900/30 py-12 mt-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0 flex items-center">
              <img src="/lovable-uploads/2ac77590-a08e-4983-bafa-7be5dc24647b.png" alt="InnovAIte Logo" className="h-16 mr-3" />
              <div>
                <p className="text-xl font-mono font-bold text-white mb-2">InnovAIte</p>
                <p className="text-sm text-white/60">
                  A research initiative under Deakin University's SPARK 2026 program
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <div className="flex space-x-6 mb-4">
                <a href="mailto:contact@innovaite.ai" className="text-white/60 hover:text-blue-400 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="https://gitlab.deakin.edu.au/innovaite/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                  <GitMerge className="h-5 w-5" />
                </a>
                <a href="https://teams.microsoft.com/l/team/19%3AcW6v8QDG1uJuK3IebazxDFvL7RLh8SPVLP7ZMK8jCH01%40thread.tacv2/conversations?groupId=64f97721-41a3-47c1-adad-e07a0e609089&tenantId=d02378ec-1688-46d5-8540-1c28b5f470f6" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-blue-400 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </a>
              </div>
              <p className="text-sm text-white/60 flex items-center">
                Made with <Heart className="h-4 w-4 mx-1 text-blue-500" /> by InnovAIte
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPostDetail;
