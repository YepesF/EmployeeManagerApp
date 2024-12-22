import express from "express";
import bodyParser from "body-parser";
import http from "http";
import cors from "cors";
import router from "./src/routes/index.js";

const app = express();
const server = http.createServer(app);
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
