const express = require("express");
const { postResult, getAllResults, deleteAllResults } = require("../controllers/result.controller");
const router = express.Router();

router.post("/", postResult);
router.get("/", getAllResults);
router.delete("/", deleteAllResults);

module.exports = router;