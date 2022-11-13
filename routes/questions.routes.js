const { postQuestion, getAllQuestions } = require("../controllers/questions.controller.js");
const express = require("express")
const router = express.Router();

router.post("/", postQuestion);
router.get("/", getAllQuestions);

module.exports = router;