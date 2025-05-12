
import { BlogPost } from "@/components/BlogPostCard";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How AI is Transforming Educational Tools",
    excerpt: "Exploring the latest AI innovations for educational platforms and their impact on learning outcomes.",
    coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    youtubeUrl: "https://www.youtube.com/watch?v=example1",
    date: new Date("2025-04-28"),
    author: {
      name: "Thomas Fleming",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commentCount: 8,
    category: "AI Education"
  },
  {
    id: "2",
    title: "Implementing GPT Models in Student Projects",
    excerpt: "A step-by-step guide on how to integrate GPT models in your university projects with practical examples.",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    youtubeUrl: "https://www.youtube.com/watch?v=example2",
    date: new Date("2025-05-02"),
    author: {
      name: "Pooja Dissanayake",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commentCount: 12,
    category: "Development"
  },
  {
    id: "3",
    title: "AI Ethics: The Future of Responsible Innovation",
    excerpt: "Discussing the ethical considerations of AI development and how Deakin is leading in responsible AI research.",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    youtubeUrl: "https://www.youtube.com/watch?v=example3",
    date: new Date("2025-05-08"),
    author: {
      name: "Leon Yang",
      avatar: "/lovable-uploads/56f17cfa-e923-4bfe-8f17-008f082f7ba9.png",
    },
    commentCount: 5,
    category: "Ethics"
  },
  {
    id: "4",
    title: "Sprint Review: March AI Innovation Projects",
    excerpt: "A summary of our team's achievements during the March sprint and the exciting projects we've been working on.",
    coverImage: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    date: new Date("2025-04-20"),
    author: {
      name: "Negin Pakroohjahromi",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commentCount: 3,
    category: "Sprint Review"
  },
  {
    id: "5",
    title: "The Future of AI and Human Collaboration",
    excerpt: "Exploring how AI tools can enhance human creativity rather than replace it, with real-world examples.",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    youtubeUrl: "https://www.youtube.com/watch?v=example5",
    date: new Date("2025-04-15"),
    author: {
      name: "Jay Shrimpton",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commentCount: 7,
    category: "AI Society"
  },
  {
    id: "6",
    title: "Coding with LLMs: Tips and Tricks",
    excerpt: "Learn how our team uses Large Language Models to accelerate development without sacrificing code quality.",
    coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: new Date("2025-05-10"),
    author: {
      name: "Aneesh Sameer Pedram",
      avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    commentCount: 15,
    category: "Development"
  }
];

export function getBlogPost(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}
