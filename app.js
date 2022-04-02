const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();

const port = 80;

let db = {
  "To Do": { _id: uuidv4(), cards: [] },
  Doing: { _id: uuidv4(), cards: [] },
  Done: { _id: uuidv4(), cards: [] },
};

app.use(bodyParser.json());

app.get("/lists", (req, res) => {
  const data = { listNames: Object.keys(db) };
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
    cardNames: Object.values(db).find(
      (element) => element._id === req.params.id
    ).cards,
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

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
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
