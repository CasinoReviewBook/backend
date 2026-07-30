import { Router } from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog, updateBlogRanking, updateBlogPosition } from '../controllers/blogController';

const router = Router();

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.put('/ranking/bulk', updateBlogRanking);
router.put('/:id/position', updateBlogPosition);

export default router;
