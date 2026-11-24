const express = require("express");
const connectDB = require("./db/db");
const noteModel = require("./models/note.model");
const postModel = require("./models/post.model");
const multer = require("multer");
const uploadFile = require("./services/storage.service");

const app = express();

app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

connectDB();

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

app.post("/create-post", upload.single("image"), async (req, res) => {
  console.log(req.file);

  const result = await uploadFile(req.file.buffer);
  console.log(result);
  await postModel.create({
    image: result.url,
    caption: req.body.caption,
  });
  res.status(201).json({
    message: "created post successfully",
  });
});

app.get("/posts", async (req, res) => {
  const post = await postModel.find();
  res.status(200).json({
    message: "Fetched successfully",
    post: post,
  });
});

module.exports = app;
