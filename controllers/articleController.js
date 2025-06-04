const Article = require('../models/Article');

// Créer un nouvel article
exports.createArticle = async (req, res) => {
    try {
        const { title, content, imageUrl, redirectUrl } = req.body;
        const newArticle = new Article({ title, content, imageUrl, redirectUrl });
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Erreur création article :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupérer tous les articles
exports.getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });
        res.status(200).json(articles);
    } catch (error) {
        console.error('Erreur récupération articles :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Récupérer un article par ID
exports.getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json(article);
    } catch (error) {
        console.error('Erreur récupération article :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Mettre à jour un article
exports.updateArticle = async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedArticle) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json(updatedArticle);
    } catch (error) {
        console.error('Erreur mise à jour article :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};

// Supprimer un article
exports.deleteArticle = async (req, res) => {
    try {
        const deletedArticle = await Article.findByIdAndDelete(req.params.id);
        if (!deletedArticle) return res.status(404).json({ message: 'Article non trouvé' });
        res.status(200).json({ message: 'Article supprimé' });
    } catch (error) {
        console.error('Erreur suppression article :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
};