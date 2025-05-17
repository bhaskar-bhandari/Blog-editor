'use client';
import { useState, useEffect } from 'react';

export default function BlogForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  let timer;

  const debounceSave = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      handleSaveDraft();
    }, 5000); // 5 seconds of inactivity
  };

 const handleSaveDraft = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/blogs/save-draft', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, tags }),
    });
    const data = await res.json();
    setStatusMsg('Draft auto-saved');
    console.log(data);
  } catch (err) {
    console.error('Error saving draft:', err);
  }
};


  const handlePublish = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/blogs/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, tags }),
      });
      const data = await res.json();
      setStatusMsg('Published successfully');
      console.log(data);
    } catch (err) {
      console.error('Error publishing blog:', err);
    }
  };

  useEffect(() => {
    if (title || content) debounceSave();
    return () => clearTimeout(timer);
  }, [title, content]);

  return (
    <div className="space-y-4">
      {statusMsg && <div className="text-green-600">{statusMsg}</div>}
      <input
        className="w-full border p-2 rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Blog Title"
      />
      <textarea
        className="w-full border p-2 rounded h-40"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Blog Content"
      />
      <input
        className="w-full border p-2 rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
      />
      <div className="space-x-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSaveDraft}
        >
          Save Draft
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handlePublish}
        >
          Publish
        </button>
      </div>
    </div>
  );
}
