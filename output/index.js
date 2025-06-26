import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
const port = process.env.PORT;
app.listen(port, (err) => {
    if (err)
        throw err;
    console.log(`server running on port ${port}`);
});