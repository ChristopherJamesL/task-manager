const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth/auth.router");
const listsRouter = require("./routes/lists/lists.router");
const tasksRouter = require("./routes/tasks/tasks.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/lists", listsRouter);
app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
