import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";

import sql from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" }
);

const app = express();

let db = {
  "To Do": { _id: uuidv4(), cards: [] },
  Doing: { _id: uuidv4(), cards: [] },
  Done: { _id: uuidv4(), cards: [] },
};

const corsOptions = {
  // TODO: allow only specific origin
  //origin: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/lists", async (req, res) => {
  const result = await sql`
    select * from lists
  `;
  
  const data = { lists: result };

  res.status(200).json(data);
});

app.post("/lists/new", async (req, res) => {
  const result = await sql`
    insert into lists
      (id, name)
    values
      (${ uuidv4() }, ${ req.body.listName })
    returning id
  `;

  res.status(200).json({
    response: "List created successfully",
    id: result[0].id,
  });
});

app.delete("/lists/:id", async (req, res) => {
  await sql`
    delete from lists
    where id = ${req.params.id}
  `;

  res.status(200).json({
    response: "List deleted successfully",
  });
});

app.get("/lists/:id/cards", async (req, res) => {
  const cardIds = await sql`
    select card_id
    from list_cards
    where list_id = ${ req.params.id }
  `;

  let cardNames = []
  for (const id of cardIds) {
    const result = await sql`
      select name
      from cards
      where id = ${ id.card_id }
    `;

    cardNames.push({ name: result[0].name, id: id.card_id });
  }

  res.status(200).json({ cards: cardNames });
});

app.post("/lists/:id/cards/new", async (req, res) => {
  const result = await sql`
    insert into cards
      (id, name)
    values
      (${ uuidv4() }, ${ req.body.cardName })
    returning id
  `;

  const newId = result[0].id;
  
  await sql`
    insert into list_cards
      (list_id, card_id)
    values
      (${ req.params.id }, ${ newId })
  `;

  res.status(200).json({ response: "Card created successfully", id: newId });
});

app.delete("/lists/:listId/cards/:id", async (req, res) => {
  await sql`
    delete from list_cards
    where card_id = ${ req.params.id }
  `;

  await sql`
    delete from cards
    where id = ${ req.params.id }
  `;

  res.status(200).json({
    response: "Card deleted successfully",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`);
});
