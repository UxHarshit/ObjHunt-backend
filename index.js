import express from "express";

const app = express();
const port = process.env.PORT || 6969;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
