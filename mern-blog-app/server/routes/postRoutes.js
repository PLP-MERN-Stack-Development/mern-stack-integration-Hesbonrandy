import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import {
  validatePost,
  validateId,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(validatePost, handleValidationErrors, createPost);

router.route('/:id')
  .get(validateId, handleValidationErrors, getPostById)
  .put(validateId, validatePost, handleValidationErrors, updatePost)
  .delete(validateId, handleValidationErrors, deletePost);

export default router;