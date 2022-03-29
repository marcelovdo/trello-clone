const express = require("express");

const app = express();

const port = 80;

app.get("/", (req, res) => {
  console.log("Getting front page");
});

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
