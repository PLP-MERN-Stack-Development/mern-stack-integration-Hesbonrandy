import express from 'express';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { validateCategory, validateId, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(validateCategory, handleValidationErrors, createCategory);

router.route('/:id')
  .put(validateId, validateCategory, handleValidationErrors, updateCategory)
  .delete(validateId, handleValidationErrors, deleteCategory);

export default router;