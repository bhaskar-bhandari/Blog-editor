export const saveDraft = async (data) => {
  const res = await fetch("http://localhost:5000/api/blogs/save-draft", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const publishBlog = async (data) => {
  const res = await fetch("http://localhost:5000/api/blogs/publish", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// export const getAllBlogs = async () => {
//   const res = await fetch("http://localhost:5000/api/blogs");
//   const all = await res.json();
//   return {
//     drafts: all.filter((b) => b.status === "draft"),
//     published: all.filter((b) => b.status === "published"),
//   };
// };

export const getAllBlogs = async () => {
  const res = await fetch("http://localhost:5000/api/blogs");
  const all = await res.json();

  // If the backend already splits into drafts and published:
  return {
    drafts: all.drafts || [],
    published: all.published || [],
  };
};


export const getBlogById = async (id) => {
  const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
  return res.json();
};
