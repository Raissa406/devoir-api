require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const articleRoutes = require('./routes/articles');

const app = express();

app.use(express.json());          
app.use(express.urlencoded({ extended: true }));
app.use(cors());                  


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API - Gestion simple d’articles',
      version: '1.0.0',
      description: 'API REST pour créer, lire, modifier et supprimer des articles de blog',
      contact: {
        name: 'Raissa',
        
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Serveur de développement local',
      },
     
    ],
    tags: [
      {
        name: 'Articles',
        description: 'Opérations CRUD sur les articles du blog',
      },
    ],
  },

  apis: ['./routes/*.js'], 
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);


app.use('/api/articles', articleRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  explorer: true,                    
  customCss: '.swagger-ui .topbar { background-color: #1a1a2e }', 
  customSiteTitle: 'Blog API Docs',
}));


app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenue sur l’API Blog !',
    documentation: '/api-docs',
    status: 'API fonctionnelle',
  });
});



app.use((req, res) => {
  res.status(404).json({
    error: 'Route non trouvée',
    documentation: '/api-docs',
  });
});


app.use((err, req, res, next) => {
  console.error('Erreur serveur :', err);
  res.status(500).json({
    error: 'Erreur interne du serveur',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n┌──────────────────────────────────────────────┐`);
  console.log(`│   Blog API démarrée avec succès              │`);
  console.log(`│   Port → http://localhost:${PORT}             │`);
  console.log(`│   Documentation → http://localhost:${PORT}/api-docs │`);
  console.log(`└──────────────────────────────────────────────┘\n`);
});