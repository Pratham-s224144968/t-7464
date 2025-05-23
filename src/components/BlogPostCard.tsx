
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: Date;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  commentCount: number;
  isVideo: boolean;
}

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-blue-950/20 border-blue-500/30 backdrop-blur h-full flex flex-col">
      <Link to={`/blog/${post.id}`} className="group">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {post.isVideo && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
              Video
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge className={`${
              post.category === 'AI' ? 'bg-blue-600 hover:bg-blue-700' :
              post.category === 'Technology' ? 'bg-purple-600 hover:bg-purple-700' :
              post.category === 'UX Design' ? 'bg-pink-600 hover:bg-pink-700' :
              post.category === 'Web Development' ? 'bg-amber-600 hover:bg-amber-700' :
              'bg-green-600 hover:bg-green-700'
            }`}>
              {post.category}
            </Badge>
          </div>
        </div>
      </Link>
      
      <CardHeader className="pb-2">
        <Link to={`/blog/${post.id}`}>
          <CardTitle className="text-xl text-white hover:text-blue-400 transition-colors duration-200">
            {post.title}
          </CardTitle>
        </Link>
        <div className="flex items-center space-x-2 mt-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <CardDescription className="text-blue-300 text-sm">
            {post.author.name} • {format(post.date, 'MMM dd, yyyy')}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4 flex-grow">
        <p className="text-gray-300 line-clamp-3">{post.excerpt}</p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between text-sm text-blue-300 border-t border-blue-900/30 py-3">
        <div className="flex space-x-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
          {post.tags.length > 2 && <span>+{post.tags.length - 2}</span>}
        </div>
        <div>{post.commentCount} comments</div>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
