
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan"
import users from "./routes/userRoutes";
import "dotenv/config";


const app = express();
app.use("/enpoint",users)

app.use(bodyParser.json());
app.use(morgan("dev"))
const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`server running on port ${port}`);
});

