const Category = require('../models/CategoryModel');

const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const categoryId = await category.save();
    res.status(201).json({ message: 'Category created successfully', categoryId });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  createCategory,
  getAllCategories
};
