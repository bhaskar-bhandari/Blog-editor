'use client';
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogById } from "@/lib/api";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getBlogById(id).then(setBlog);
    }
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-600 mb-2">{new Date(blog.updated_at).toLocaleString()}</p>
      <div className="whitespace-pre-wrap">{blog.content}</div>
    </div>
  );
}
