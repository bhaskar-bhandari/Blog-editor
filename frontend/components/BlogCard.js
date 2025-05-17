import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          {blog.status}
        </span>
      </div>

      <p className="text-gray-600 text-sm line-clamp-3 mb-3">{blog.content}</p>

      <div className="text-xs text-gray-500 mb-2">
        Created at: {new Date(blog.created_at).toLocaleString()}
      </div>

      {blog.tags?.length > 0 && (
        <div className="text-xs text-blue-600 mb-2">
          Tags: {blog.tags.join(', ')}
        </div>
      )}

      <Link href={`/blogs/${blog._id}`}>
        <span className="text-sm text-blue-500 hover:underline">View / Edit</span>
      </Link>
    </div>
  );
}
