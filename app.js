const express = require("express");

const app = express();

const port = 80;

let db = {
  "To Do": [],
  Doing: [],
  Done: [],
};

app.get("/lists", (req, res) => {});

app.post("/lists/new", (req, res) => {});

app.get("/lists/:id/cards", (req, res) => {});

app.post("/lists/:id/cards/new", (req, res) => {});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
