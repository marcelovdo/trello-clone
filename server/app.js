import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import { getLists, createList, deleteList, getCards, createCard, deleteCard } from "./controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

const app = express();

const corsOptions = {
  // TODO: allow only specific origin
  //origin: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/lists", getLists);

app.post("/lists/new", createList);

app.delete("/lists/:id", deleteList);

app.get("/lists/:id/cards", getCards);

app.post("/lists/:id/cards/new", createCard);

app.delete("/lists/:listId/cards/:id", deleteCard);

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`);
});

