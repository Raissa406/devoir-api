const ArticleModel = require('../models/articleModel');

const ArticleController = {
  createArticle: async (req, res) => {
    const { title, content, author, category, tags } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ error: ' le titre, contenu et auteur sont obligatoires' });
    }

    try {
      const id = await ArticleModel.create({ title, content, author, category, tags });
      res.status(201).json({ message: 'Article créé', id });
    } catch (err) {
      res.status(500).json({ error: 'Erreur du serveur' });
    }
  },

  getArticles: async (req, res) => {
    try {
      const articles = await ArticleModel.getAll(req.query);
      res.json(articles);
    } catch (err) {
      res.status(500).json({ error: 'Erreur du serveur' });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const article = await ArticleModel.getById(req.params.id);
      if (!article) return res.status(404).json({ error: 'Article non trouvé' });
      res.json(article);
    } catch (err) {
      res.status(500).json({ error: 'Erreur du  serveur' });
    }
  },

  updateArticle: async (req, res) => {
    try {
      const updated = await ArticleModel.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ error: 'Article non trouvé' });
      res.json({ message: 'Article mis à jour' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur du serveur' });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const deleted = await ArticleModel.delete(req.params.id);
      if (!deleted) return res.status(404).json({ error: 'Article non trouvé' });
      res.json({ message: 'Article supprimé' });
    } catch (err) {
      res.status(500).json({ error: 'Erreur du serveur' });
    }
  },

  searchArticles: async (req, res) => {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Paramètre query requis' });

    try {
      const results = await ArticleModel.search(query);
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: 'Erreur du serveur' });
    }
  }
};

module.exports = ArticleController;