import "dotenv/config";               // 1er import – très important

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";   // .js si ESM

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.use("/api/users", userRoutes);     // préfixe clair + pluriel

const PORT = process.env.PORT || 5000; // fallback obligatoire

app.listen(PORT, () => {
  console.log(`Serveur démarré → http://localhost:${PORT}`);
  console.log(`Documentation / debug : http://localhost:${PORT}/api/users`);
});