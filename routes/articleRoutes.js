const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Middleware de vérification de la clé admin
const checkAdminKey = (req, res, next) => {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: 'Accès interdit : clé invalide.' });
  }
  next();
};

// Obtenir tous les articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des articles :", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Obtenir un article par ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    res.json(article);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de l’article :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Créer un nouvel article (protégé par clé)
router.post('/', checkAdminKey, async (req, res) => {
  try {
    const { title, content, imageUrl, redirectUrl } = req.body;
    const newArticle = new Article({ title, content, imageUrl, redirectUrl });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('❌ Erreur création article :', error);
    res.status(400).json({ message: 'Erreur lors de la création de l’article' });
  }
});

// Supprimer un article (protégé par clé)
router.delete('/:id', checkAdminKey, async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Article non trouvé' });
    res.json({ message: 'Article supprimé' });
  } catch (error) {
    console.error('❌ Erreur suppression article :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;