const { postQuestion, getAllQuestions, deleteQuestion, deleteAllQuestions } = require("../controllers/questions.controller.js");
const express = require("express")
const router = express.Router();

router.post("/", postQuestion);
router.get("/", getAllQuestions);
router.delete("/", deleteAllQuestions);
router.delete("/:id", deleteQuestion);

module.exports = router;