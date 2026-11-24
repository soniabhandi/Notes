const express = require("express");
const connectDB = require("./db/db");
const noteModel = require("./models/note.model");

const app = express();

app.use(express.json());

connectDB();

// const notes = [];

// app.post("/notes", (req, res) => {
//   console.log(req.body);
//   notes.push(req.body);
//   res.status(200).json({ message: "Posted note successfully" });
// });

// app.get("/notes", (req, res) => {
//   res.status(200).json({ message: "fetched notes successfully", notes: notes });
// });

app.post("/notes", async (req, res) => {
  const data = req.body;
  await noteModel.create({
    title: data.title,
    description: data.description,
  });

  res.status(201).json({
    message: "Note updated in DB",
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(201).json({
    message: "Fetched all notes",
    notes: notes,
  });
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const notes = await noteModel.findOneAndDelete({
    _id: id,
  });

  res.status(200).json({
    messgage: "Deleted successfully",
  });
});

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;

  await noteModel.findOneAndUpdate(
    {
      _id: id,
    },
    {
      description: description,
    },
  );

  res.status(200).json({
    message: "Updated the note successfully",
  });
});

module.exports = app;
