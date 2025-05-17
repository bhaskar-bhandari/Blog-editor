const Blog = require('../models/Blog');

exports.saveDraft = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const userId = req.user.userId;

    let blog;
    if (id) {
      blog = await Blog.findOneAndUpdate({ _id: id, userId }, {
        title, content, tags, status: 'draft', updated_at: new Date()
      }, { new: true });
    } else {
      blog = new Blog({ title, content, tags, userId, status: 'draft' });
      await blog.save();
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to save draft" });
  }
};

exports.publishBlog = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const userId = req.user.userId;

    let blog;
    if (id) {
      blog = await Blog.findOneAndUpdate({ _id: id, userId }, {
        title, content, tags, status: 'published', updated_at: new Date()
      }, { new: true });
    } else {
      blog = new Blog({ title, content, tags, userId, status: 'published' });
      await blog.save();
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to publish" });
  }
};

// exports.getBlogs = async (req, res) => {
//   const blogs = await Blog.find({ userId: req.user.userId }).sort({ updated_at: -1 });
//   res.json(blogs);
// };
exports.getBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({ userId: req.user.userId }).sort({ updated_at: -1 });

    const drafts = allBlogs.filter(blog => blog.status === 'draft');
    const published = allBlogs.filter(blog => blog.status === 'published');

    res.json({ drafts, published });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
};


exports.getBlogById = async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id, userId: req.user.userId });
  if (!blog) return res.status(404).json({ error: "Blog not found" });
  res.json(blog);
};
