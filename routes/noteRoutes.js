const express = require("express");
const {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  getNoteDetails,
} = require("../controllers/noteController");
const router = express.Router();
const auth = require("../middleware/auth");

router.route("/").post(auth, createNote).get(auth, getNotes);

router
  .route("/:id")
  .get(auth, getNoteDetails)
  .put(auth, updateNote)
  .delete(auth, deleteNote);

module.exports = router;
