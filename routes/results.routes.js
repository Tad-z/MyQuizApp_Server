const express = require("express");
const { postResult, getAllResults } = require("../controllers/result.controller");
const router = express.Router();

router.post("/", postResult);
router.get("/", getAllResults);

module.exports = router;