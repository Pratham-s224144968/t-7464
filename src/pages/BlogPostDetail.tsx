import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format, formatDistanceToNow } from 'date-fns';
import { ArrowLeft, Copy, Heart, Mail, GitMerge, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";

interface BlogPostDetailParams {
  id: string;
}

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  date: Date;
  text: string;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  coverImage: string;
  date: Date;
  author: Author;
  category: string;
  commentCount: number;
  comments: Comment[];
}

const BlogPostDetail = () => {
  const { id } = useParams<BlogPostDetailParams>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Mock data for demonstration
    const mockPost: BlogPost = {
      id: id!,
      title: 'The Future of AI in Web Development',
      content: `
        ## Introduction
        Artificial Intelligence (AI) is rapidly transforming various industries, and web development is no exception. AI-powered tools and techniques are enhancing the way websites are designed, developed, and maintained. This blog post explores the current and future impact of AI on web development.

        ## AI-Powered Design Tools
        AI is revolutionizing the design process by providing intelligent suggestions and automating repetitive tasks. Tools like Adobe Sensei and Fronty use AI to convert design mockups into functional code, significantly reducing development time.

        ## Automated Testing
        AI can automate the testing process, identifying bugs and vulnerabilities more efficiently than manual testing. AI-driven testing tools can simulate user behavior and detect potential issues before they affect the end-users.

        ## Personalized User Experiences
        AI enables web developers to create personalized user experiences by analyzing user data and behavior. AI-powered recommendation engines and chatbots can provide tailored content and support, enhancing user engagement and satisfaction.

        ## Future Trends
        In the future, AI is expected to play an even greater role in web development. We can anticipate more sophisticated AI-powered tools that can generate entire websites from scratch, optimize website performance in real-time, and provide advanced security features.

        ## Conclusion
        AI is poised to reshape the landscape of web development, offering numerous benefits such as increased efficiency, improved quality, and enhanced user experiences. As AI technology continues to evolve, web developers must embrace these changes to stay ahead in the industry.
      `,
      coverImage: 'https://source.unsplash.com/random/800x400',
      date: new Date(),
      author: {
        name: 'John Doe',
        avatar: 'https://source.unsplash.com/random/40x40',
        bio: 'A passionate web developer and AI enthusiast.',
      },
      category: 'AI',
      commentCount: 3,
      comments: [
        {
          id: '1',
          author: {
            name: 'Alice Smith',
            avatar: 'https://source.unsplash.com/random/41x41',
          },
          date: new Date(),
          text: 'Great article! AI is indeed changing web development.',
        },
        {
          id: '2',
          author: {
            name: 'Bob Johnson',
            avatar: 'https://source.unsplash.com/random/42x42',
          },
          date: new Date(),
          text: 'I agree, AI is making our work more efficient.',
        },
        {
          id: '3',
          author: {
            name: 'Charlie Brown',
            avatar: 'https://source.unsplash.com/random/43x43',
          },
          date: new Date(),
          text: 'Looking forward to seeing more AI tools in web dev.',
        },
      ],
    };

    setPost(mockPost);
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      const newComment: Comment = {
        id: Math.random().toString(36).substring(7),
        author: {
          name: 'Current User', // Replace with actual current user
          avatar: 'https://source.unsplash.com/random/44x44', // Replace with actual current user avatar
        },
        date: new Date(),
        text: commentText,
      };

      setPost({
        ...post,
        comments: [...post.comments, newComment],
        commentCount: post.commentCount + 1,
      });

      setCommentText('');
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <Button asChild variant="ghost" className="mb-4">
        <Link to="/blog" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>

      <div className="relative">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full rounded-md shadow-lg aspect-video object-cover"
        />
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-md text-sm">
          {post.category}
        </div>
      </div>

      <h1 className="text-3xl font-bold mt-6 text-white">{post.title}</h1>
      <div className="flex items-center mt-2 text-gray-400">
        <Avatar className="mr-2 h-8 w-8">
          <AvatarImage src={post.author.avatar} alt={post.author.name} />
          <AvatarFallback>{post.author.name?.[0]}</AvatarFallback>
        </Avatar>
        <span>
          By {post.author.name} | {format(post.date, 'MMMM dd, yyyy')} ({formatDistanceToNow(post.date, { addSuffix: true })})
        </span>
      </div>

      <div className="mt-6 text-gray-300 leading-relaxed" style={{ whiteSpace: 'pre-line' }}>
        {post.content}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center space-x-4 text-gray-400">
          <button className="flex items-center hover:text-blue-300">
            <Heart className="mr-1 h-5 w-5" />
            <span>Like</span>
          </button>
          <button className="flex items-center hover:text-blue-300">
            <Mail className="mr-1 h-5 w-5" />
            <span>Share</span>
          </button>
          <button className="flex items-center hover:text-blue-300">
            <Copy className="mr-1 h-5 w-5" />
            <span>Copy Link</span>
          </button>
        </div>
        <Badge variant="secondary">
          {post.commentCount} Comments
        </Badge>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-white">Comments</h2>
        {post.comments.map((comment) => (
          <Card key={comment.id} className="mb-4 bg-blue-950/20 backdrop-blur border-blue-500/30">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name?.[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-white">{comment.author.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{comment.text}</p>
            </CardContent>
            <CardFooter className="text-sm text-gray-400">
              {formatDistanceToNow(comment.date, { addSuffix: true })}
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-3 text-white">Add a Comment</h3>
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write your comment here..."
          className="w-full bg-blue-950/10 border-blue-500/30 text-white"
        />
        <Button onClick={handleAddComment} className="mt-3 bg-blue-600 hover:bg-blue-700 text-white">
          Submit Comment
        </Button>
      </div>
    </div>
  );
};

export default BlogPostDetail;
