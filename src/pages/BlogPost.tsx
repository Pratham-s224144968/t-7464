
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Blog Post {id}</h1>
      <p className="text-gray-300">Individual blog post content will be displayed here.</p>
    </div>
  );
};

export default BlogPost;
