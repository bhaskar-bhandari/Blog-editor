const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { saveDraft, publishBlog, getBlogs, getBlogById } = require('../controllers/blogController');

router.post('/save-draft', auth, saveDraft);
router.post('/publish', auth, publishBlog);
router.get('/', auth, getBlogs);
router.get('/:id', auth, getBlogById);

module.exports = router;
