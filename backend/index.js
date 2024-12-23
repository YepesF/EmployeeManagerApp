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

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV !== "test") {
  server.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

export { app, server };
