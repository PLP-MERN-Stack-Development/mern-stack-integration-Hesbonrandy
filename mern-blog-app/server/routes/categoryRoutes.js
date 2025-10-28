import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import {
  validateCategory,
  handleValidationErrors
} from '../middleware/validation.js';

const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
router.get('/', getCategories);

// @route   POST /api/categories
// @desc    Create a new category
router.post('/', validateCategory, handleValidationErrors, createCategory);

// Critical: export the router as default
export default router;