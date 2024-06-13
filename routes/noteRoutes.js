const express = require("express");
const {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} = require("../controllers/noteController");
const router = express.Router();
const auth = require("../middleware/auth");

router.route("/")
.post(auth, createNote)
.get(auth, getNotes)

router.route('/:id')
.put(auth,updateNote)
.delete(auth,deleteNote)

module.exports=router
