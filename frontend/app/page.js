'use client';
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { getAllBlogs } from "@/lib/api";

export default function Home() {
  const [blogs, setBlogs] = useState({ drafts: [], published: [] });

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getAllBlogs();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Published Blogs</h1>
      <div className="grid gap-4 mb-8">
        {blogs.published.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
      <h2 className="text-2xl font-semibold mb-4">Drafts</h2>
      <div className="grid gap-4">
        {blogs.drafts.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
