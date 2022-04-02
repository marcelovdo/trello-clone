const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();

const port = 80;

let db = {
  "To Do": { _id: uuidv4(), cards: ["Task 1", "Task 2"] },
  Doing: { _id: uuidv4(), cards: [] },
  Done: { _id: uuidv4(), cards: [] },
};

app.use(bodyParser.json());

app.get("/lists", (req, res) => {
  const data = { listNames: Object.keys(db) };
  res.status(200).json(data);
});

app.post("/lists/new", (req, res) => {
  db[`${req.body.listName}`] = { _id: uuidv4(), cards: [] };
  res.status(200).json({ response: "List created successfully" });
});

app.get("/lists/:id/cards", (req, res) => {
  const data = {
    cardNames: Object.values(db).find(
      (element) => element._id === req.params.id
    ).cards,
  };
  res.status(200).json(data);
});

app.post("/lists/:id/cards/new", (req, res) => {});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
