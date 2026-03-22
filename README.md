# Blog API - Backend

## Installation
```bash
npm install
npm start


Documentation

Swagger UI : http://localhost:3000/api-docs
Tester directement dans le navigateur (Postman non obligatoire)

Endpoints

POST   /api/articles
GET    /api/articles (filtres : ?category=Tech&author=Jean&date=2026-03-18)
GET    /api/articles/{id}
PUT    /api/articles/{id}
DELETE /api/articles/{id}
GET    /api/articles/search?query=javascript

Technologies
Node.js + Express + SQLite + Swagger
text**lancer `npm start` ou npm run dev

