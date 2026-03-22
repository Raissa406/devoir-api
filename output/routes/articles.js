const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/articleController');

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               author: { type: string }
 *               category: { type: string }
 *               tags: { type: array, items: { type: string } }
 *     responses:
 *       201: { description: Article créé }
 *       400: { description: Données invalides }
 */
router.post('/', ArticleController.createArticle);

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles (avec filtres optionnels)
 *     tags: [Articles]
 *     parameters:
 *       - name: category
 *         in: query
 *       - name: author
 *         in: query
 *       - name: date
 *         in: query
 *         description: format YYYY-MM-DD
 *     responses:
 *       200: { description: Liste des articles }
 */
router.get('/', ArticleController.getArticles);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Récupérer un article par ID
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200: { description: Article trouvé }
 *       404: { description: Article non trouvé }
 */
router.get('/:id', ArticleController.getArticleById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Modifier un article
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200: { description: Article mis à jour }
 *       404: { description: Article non trouvé }
 */
router.put('/:id', ArticleController.updateArticle);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Articles]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200: { description: Article supprimé }
 *       404: { description: Article non trouvé }
 */
router.delete('/:id', ArticleController.deleteArticle);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles
 *     tags: [Articles]
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *     responses:
 *       200: { description: Résultats de recherche }
 */
router.get('/search', ArticleController.searchArticles);

module.exports = router;