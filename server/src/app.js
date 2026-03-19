const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth/auth.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
