
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileVideo, MessageSquare, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  youtubeUrl?: string;
  date: Date;
  author: {
    name: string;
    avatar: string;
  };
  commentCount: number;
  category: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <Card className="overflow-hidden border-blue-500/30 bg-blue-950/20 backdrop-blur hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
      <div className="aspect-video w-full overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <span className="px-2 py-1 bg-blue-600/50 rounded-full text-xs text-blue-200">{post.category}</span>
          <span className="text-sm text-white/60">{formatDistanceToNow(post.date, { addSuffix: true })}</span>
        </div>
        <CardTitle className="text-xl font-semibold text-white mt-2">{post.title}</CardTitle>
        <CardDescription className="text-blue-200">{post.excerpt}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-8 h-8 rounded-full border border-blue-500/50" 
          />
          <span className="text-sm text-white/70">{post.author.name}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-4">
          {post.youtubeUrl && (
            <div className="flex items-center text-white/70">
              <Youtube className="w-4 h-4 mr-1 text-blue-400" />
              <span className="text-xs">Watch</span>
            </div>
          )}
          <div className="flex items-center text-white/70">
            <MessageSquare className="w-4 h-4 mr-1 text-blue-400" />
            <span className="text-xs">{post.commentCount}</span>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/blog/${post.id}`} className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
            Read More
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
