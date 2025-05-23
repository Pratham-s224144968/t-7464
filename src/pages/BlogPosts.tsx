
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
import { Search, Filter, RefreshCcw, ExternalLink } from 'lucide-react';
import BlogPostCard, { BlogPost } from '@/components/BlogPostCard';
import { blogPosts } from '@/data/blogPosts';
import Navbar from '@/components/Navbar';

const BlogPosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const categories = Array.from(new Set(blogPosts.map(post => post.category))).sort();

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
    <div className="min-h-screen bg-black text-white">
      <div className="container py-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold text-white">InnovAIte Blog & Vlogs</h1>
            <a 
              href="https://www.youtube.com/@innovAIteDeakin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-4 flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors bg-blue-950/30 px-3 py-1 rounded-full text-sm"
            >
              YouTube Channel <ExternalLink size={14} />
            </a>
          </div>
          <div className="flex items-center space-x-4 w-full md:w-auto">
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
              <DropdownMenuContent align="end" className="bg-blue-950/80 backdrop-blur border-blue-500/30 text-white max-h-[300px] overflow-y-auto">
                <DropdownMenuItem onClick={() => handleCategoryChange('')} className="hover:bg-blue-950/50 focus:bg-blue-950/50">
                  All Categories
                </DropdownMenuItem>
                {categories.map(category => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => handleCategoryChange(category)} 
                    className="hover:bg-blue-950/50 focus:bg-blue-950/50"
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
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
        
        {filterCategory && (
          <div className="mb-6 py-2 px-4 bg-blue-500/10 border border-blue-500/20 rounded-md">
            <p className="text-blue-300">
              <span className="font-semibold">Category:</span> {filterCategory}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-white/70 text-lg">No blog posts found matching your search criteria.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4 text-blue-400 border-blue-500/50 hover:bg-blue-950/50">
                <RefreshCcw className="w-4 h-4 mr-2" />
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
