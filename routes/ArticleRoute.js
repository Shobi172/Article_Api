const express = require("express");
const router = express.Router();
const articleController = require("../controllers/ArticleController");
const categoryController = require("../controllers/CategoryController");


router.get("/article", articleController.getAllArticles);
router.post("/createArticle", articleController.createArticle);
router.get('/categories/:categoryId', articleController.getArticlesByCategory);
router.patch("/article/:id", articleController.updateArticle);
router.delete("/article/:id", articleController.deleteArticle);


router.post("/createCategory", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);


module.exports = router;
