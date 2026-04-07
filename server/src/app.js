const express = require("express");
const cors = require("cors");

const authRouter = require("./features/auth/auth.router");
const listsRouter = require("./features/lists/lists.router");
const tasksRouter = require("./features/tasks/tasks.router");
const errorHandler = require("./middleware/errorHandler");

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

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

module.exports = app;
