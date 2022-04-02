const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 80;

let db = {
  "To Do": { _id: "0", cards: ["Task 1", "Task 2"] },
  Doing: { _id: "1", cards: [] },
  Done: { _id: "2", cards: [] },
};

app.use(bodyParser.json());

app.get("/lists", (req, res) => {
  const data = { listNames: Object.keys(db) };
  res.status(200).json(data);
});

app.post("/lists/new", (req, res) => {
  db[`${req.body.listName}`] = { _id: "3", cards: [] };
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
