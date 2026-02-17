const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "example",
  database: "todo_db"
});

db.connect(err => {
  if (err) console.log("DB connection error:", err);
  else console.log("Connected to MySQL");
});


// endpoint 1: get todos
app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// endpoint 2: add todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  db.query("INSERT INTO todos (task) VALUES (?)", [task], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Task added");
  });
});

// DELETE task by id
app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM todos WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Task deleted");
  });
});


app.listen(3000, "0.0.0.0", () => console.log("API running"));
