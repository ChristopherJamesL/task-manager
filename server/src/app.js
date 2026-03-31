const express = require("express");
const cors = require("cors");

const authRouter = require("./features/auth/auth.router");
const listsRouter = require("./features/lists/lists.router");
const tasksRouter = require("./features/tasks/tasks.router");

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
