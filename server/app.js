const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

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

app.get("/lists", (req, res) => {
  const data = { lists: [] };
  for (let key in db) {
    data.lists.push({ _id: db[key]._id, name: key });
  }
  res.status(200).json(data);
});

app.post("/lists/new", (req, res) => {
  const newId = uuidv4();
  db[`${req.body.listName}`] = { _id: newId, cards: [] };
  res.status(200).json({
    response: "List created successfully",
    _id: newId,
  });
});

app.delete("/lists/:id", (req, res) => {
  for (let key in db) {
    if (db[key]._id === req.params.id) {
      delete db[key];
    }
  }
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
