const express = require("express");

const app = express();

const port = 80;

app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
