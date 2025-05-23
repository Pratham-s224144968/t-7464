
import { BlogPost } from '../components/BlogPostCard';

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Transforming Education with AI: InnovAIte's Approach",
    excerpt: "Discover how InnovAIte is revolutionizing higher education through innovative AI solutions that enhance learning outcomes and student engagement.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
    date: new Date('2025-05-15'),
    author: {
      name: "Dr. Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "AI",
    tags: ["education", "innovation", "student-experience"],
    commentCount: 12,
    isVideo: false
  },
  {
    id: "2",
    title: "Behind the Scenes: Building AI Models for Education",
    excerpt: "Our technical team shares insights into the development process of creating custom AI models that understand educational content and student needs.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=800",
    date: new Date('2025-05-10'),
    author: {
      name: "James Chen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "Technology",
    tags: ["machine-learning", "data-science", "algorithms"],
    commentCount: 8,
    isVideo: false
  },
  {
    id: "3",
    title: "Student Success Stories: AI-Assisted Learning Outcomes",
    excerpt: "Read inspiring stories from students who have benefited from InnovAIte's personalized learning tools and improved their academic performance.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=800",
    date: new Date('2025-05-05'),
    author: {
      name: "Michelle Rodriguez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "Education",
    tags: ["student-stories", "success", "case-study"],
    commentCount: 15,
    isVideo: false
  },
  {
    id: "4",
    title: "Designing for Accessibility: InnovAIte's UX Principles",
    excerpt: "Our UX team explains how we design AI-powered educational tools with accessibility and inclusivity at the forefront of our process.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=800",
    date: new Date('2025-04-28'),
    author: {
      name: "Alex Patel",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "UX Design",
    tags: ["accessibility", "inclusive-design", "user-experience"],
    commentCount: 6,
    isVideo: false
  },
  {
    id: "5",
    title: "The Future of Education: AI Trends for 2026",
    excerpt: "Our research team analyzes emerging trends in educational AI and predicts how they will shape learning environments in the coming year.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?q=80&w=800",
    date: new Date('2025-04-20'),
    author: {
      name: "Dr. Robert Williams",
      avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "Research",
    tags: ["future-trends", "predictions", "innovation"],
    commentCount: 21,
    isVideo: false
  },
  {
    id: "6",
    title: "[Video] Introduction to InnovAIte's Educational Platform",
    excerpt: "Watch this walkthrough of our platform's key features and how they integrate into existing educational workflows.",
    content: "Video content and transcript...",
    coverImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: new Date('2025-04-15'),
    author: {
      name: "Emily Cooper",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "Tutorial",
    tags: ["tutorial", "platform-overview", "features"],
    commentCount: 9,
    isVideo: true
  },
  {
    id: "7",
    title: "Collaborative AI: How We're Working with Universities",
    excerpt: "Learn about our partnerships with leading universities and how we're co-developing AI solutions for specific educational challenges.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: new Date('2025-04-08'),
    author: {
      name: "Prof. Jonathan Blake",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "Partnerships",
    tags: ["collaboration", "universities", "research"],
    commentCount: 5,
    isVideo: false
  },
  {
    id: "8",
    title: "[Video] AI & Ethics in Education: Our Framework",
    excerpt: "Watch our presentation on how we approach ethical considerations in AI development for educational contexts.",
    content: "Video content and transcript...",
    coverImage: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: new Date('2025-04-01'),
    author: {
      name: "Dr. Maria Gonzalez",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "Ethics",
    tags: ["ethics", "responsibility", "governance"],
    commentCount: 17,
    isVideo: true
  },
  {
    id: "9",
    title: "How We're Making Academic Content More Accessible with AI",
    excerpt: "Discover our approach to converting complex academic materials into more digestible formats using AI-powered summarization and visualization.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: new Date('2025-03-25'),
    author: {
      name: "Thomas Lee",
      avatar: "https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "Accessibility",
    tags: ["content-transformation", "simplification", "learning-materials"],
    commentCount: 11,
    isVideo: false
  },
  {
    id: "10",
    title: "Building the Web Infrastructure for Educational AI",
    excerpt: "Our web development team shares insights into creating robust, scalable platforms that deliver AI capabilities to educational institutions.",
    content: "Full article content here...",
    coverImage: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    date: new Date('2025-03-18'),
    author: {
      name: "Sophia Wang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    category: "Web Development",
    tags: ["web-development", "infrastructure", "scalability"],
    commentCount: 7,
    isVideo: false
  }
];
