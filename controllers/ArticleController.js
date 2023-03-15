const Article = require('../models/ArticleModel');

const createArticle = async (req, res) => {
  const article = new Article(req.body);
  try {
    await article.save();
    res.status(201).json({ message: 'Article created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getAllArticles = async (req, res) => {
    try {
      const articles = await Article.getAll();
      res.status(200).json(articles);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  
const getArticlesByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
      const articles = await Article.getByCategory(categoryId);
      res.status(200).json(articles);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal server error' });
    }
};
  

const updateArticle = async (req, res, next) => {
    const id = req.params.id;
    const newData = req.body;
  
    try {
      const article = new Article({}); 
      await article.update(id, newData); 
      res.status(200).send('Article updated successfully');
    } catch (err) {
      next(err);
    }
}
  
 const deleteArticle = async (req, res, next) => {
    const id = req.params.id;
  
    try {
      await Article.remove(id);
      res.status(200).send('Article removed successfully');
    } catch (err) {
      next(err);
    }
  };



module.exports = {
    createArticle,
    getAllArticles,
    getArticlesByCategory,
    updateArticle,
    deleteArticle
};

