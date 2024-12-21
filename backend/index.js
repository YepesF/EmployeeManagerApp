import express from "express";
import bodyParser from "body-parser";
import http from "http";
import router from "./src/routes/index.js";
import sequelize from "./src/config/database.js";

const app = express();
const server = http.createServer(app);
app.use(express.static("public"));
app.use(bodyParser.json());

sequelize.sync({ force: false }).then(() => {
  console.log("DB sync");
});

app.use(router);

const port = 3001;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
