const express = require("express");
const app = express();
const cors = require("cors")
const main = require("./models/db.js");
const questionsRouter = require("./routes/questions.routes")
const resultRouter = require("./routes/results.routes")
require("dotenv").config();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/questions", questionsRouter);
app.use("/result", resultRouter);

main()
    .then(() => {
        return console.log("DB connected...");
    }).catch(console.error);
app.listen(4000, () => {
    console.log("Server started...");
})