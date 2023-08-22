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


const seedDb = async () => {
  // check if data already exists
  await sql`delete from lists`;
  await sql`drop table lists`;
  await sql`
    create table lists (
      id uuid primary key,
      name text
    ) 
  `;

  const listList = ["To Do", "Doing", "Done"];
  
  for (const name of listList) {
    const lists = await sql`
      insert into lists
        (id, name)
      values
        (${ uuidv4() }, ${ name })
      returning name
    `;
  }  
};

seedDb();

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

app.get("/lists/:id/cards", (req, res) => {
  const data = {
    cards: Object.values(db).find((element) => element._id === req.params.id)
      .cards,
  };
  res.status(200).json(data);
});

app.post("/lists/:id/cards/new", (req, res) => {
  const newId = uuidv4();
  const targetList = Object.values(db).find(
    (element) => element._id === req.params.id
  );
  targetList.cards.push({ _id: newId, name: req.body.cardName });
  res.status(200).json({ response: "Card created successfully", _id: newId });
});

app.delete("/lists/:listId/cards/:id", (req, res) => {
  const targetList = Object.values(db).find(
    (element) => element._id === req.params.listId
  );
  for (let i = 0; i < targetList.cards.length; i++) {
    if (targetList.cards[i]._id === req.params.id) {
      targetList.cards.splice(i, 1);
    }
  }
  res.status(200).json({
    response: "Card deleted successfully",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Serving on port ${process.env.PORT}`);
});
