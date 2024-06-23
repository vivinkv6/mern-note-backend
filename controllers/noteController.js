const Note = require("../models/Note");

const createNote = async (req, res) => {
  const { title, description, image } = req.body;
  try {
    const note = new Note({
      user: req.user.id,
      title,
      description,
      image,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getNoteDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, image } = req.body;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note Not Found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "UnAuthorized" });
    }

    note.title = title;
    (note.description = description), (note.image = image);
    await note.save();
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note Not Found" });
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "UnAuthorized" });
    }

    await note.remove();
    res.status(200).json({ message: "Note Removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createNote, getNotes, updateNote, deleteNote,getNoteDetails };
