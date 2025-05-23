
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the BlogPosts page
    navigate('/blog');
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <p className="text-gray-300">Redirecting to blog posts...</p>
    </div>
  );
};

export default Blog;
