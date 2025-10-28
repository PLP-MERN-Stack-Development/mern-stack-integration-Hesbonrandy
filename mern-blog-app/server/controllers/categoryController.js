import Category from '../models/Category.js';

// @desc    Get all categories
// @route   GET /api/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    console.error('Error in getCategories:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create new category
// @route   POST /api/categories
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    const saved = await category.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error in createCategory:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};