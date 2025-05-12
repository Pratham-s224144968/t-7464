import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Filter, X, RefreshCcw, Heart } from 'lucide-react';
import BlogPostCard, { BlogPost } from '@/components/BlogPostCard';

const dummyBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of AI in Healthcare",
    excerpt: "Explore how artificial intelligence is revolutionizing healthcare, from diagnostics to personalized medicine.",
    coverImage: "https://source.unsplash.com/800x600/?artificialintelligence",
    date: new Date(),
    author: {
      name: "Dr. Emily Carter",
      avatar: "https://source.unsplash.com/50x50/?woman"
    },
    commentCount: 25,
    category: "AI in Medicine",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "2",
    title: "Sustainable Energy Solutions for Tomorrow",
    excerpt: "Discover innovative approaches to sustainable energy that can help combat climate change.",
    coverImage: "https://source.unsplash.com/800x600/?sustainableenergy",
    date: new Date(),
    author: {
      name: "Alex Johnson",
      avatar: "https://source.unsplash.com/50x50/?man"
    },
    commentCount: 15,
    category: "Renewable Energy",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "3",
    title: "The Art of Minimalist Living",
    excerpt: "Learn how to declutter your life and embrace minimalism for a more fulfilling existence.",
    coverImage: "https://source.unsplash.com/800x600/?minimalism",
    date: new Date(),
    author: {
      name: "Sophia Lee",
      avatar: "https://source.unsplash.com/50x50/?woman"
    },
    commentCount: 30,
    category: "Lifestyle",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "4",
    title: "Coding Best Practices for Beginners",
    excerpt: "A comprehensive guide to writing clean, efficient, and maintainable code for novice programmers.",
    coverImage: "https://source.unsplash.com/800x600/?coding",
    date: new Date(),
    author: {
      name: "David Brown",
      avatar: "https://source.unsplash.com/50x50/?man"
    },
    commentCount: 40,
    category: "Programming",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "5",
    title: "The Impact of Social Media on Society",
    excerpt: "Analyze the profound effects of social media platforms on communication, culture, and politics.",
    coverImage: "https://source.unsplash.com/800x600/?socialmedia",
    date: new Date(),
    author: {
      name: "Olivia Wilson",
      avatar: "https://source.unsplash.com/50x50/?woman"
    },
    commentCount: 20,
    category: "Social Issues",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
];

const BlogPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [blogPosts, setBlogPosts] = useState(dummyBlogPosts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching blog posts from an API
    // In a real application, you would replace this with an actual API call
    const fetchBlogPosts = async () => {
      // Simulate a delay to mimic network request
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real scenario, you would set the fetched data here
      // setBlogPosts(fetchedPosts);
    };

    fetchBlogPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setFilterCategory(category);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('');
  };

  const filteredPosts = blogPosts.filter(post => {
    const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const categoryMatch = filterCategory ? post.category === filterCategory : true;
    return searchMatch && categoryMatch;
  });

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Blog & Vlogs</h1>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search blog posts..."
            className="bg-blue-950/10 border-blue-500/30 text-white focus-visible:ring-blue-500 focus-visible:border-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-blue-950/80 backdrop-blur border-blue-500/30 text-white">
              <DropdownMenuItem onClick={() => handleCategoryChange('')} className="hover:bg-blue-950/50 focus:bg-blue-950/50">
                All Categories
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange('AI in Medicine')} className="hover:bg-blue-950/50 focus:bg-blue-950/50">
                AI in Medicine
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange('Renewable Energy')} className="hover:bg-blue-950/50 focus:bg-blue-950/50">
                Renewable Energy
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange('Lifestyle')} className="hover:bg-blue-950/50 focus:bg-blue-950/50">
                Lifestyle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange('Programming')} className="hover:bg-blue-950/50 focus:bg-blue-950/50">
                Programming
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleCategoryChange('Social Issues')} className="hover:bg-blue-950/50 focus:bg-blue-950/50">
                Social Issues
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {searchQuery || filterCategory ? (
            <Button variant="ghost" onClick={clearFilters} className="text-blue-400 hover:bg-blue-950/50">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Clear
            </Button>
          ) : null}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
