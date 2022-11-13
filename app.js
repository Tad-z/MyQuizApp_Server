const express = require("express");
const app = express();
const main = require("./models/db.js");
const questionsRouter = require("./routes/questions.routes")
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/questions", questionsRouter);

main()
    .then(() => {
        return console.log("DB connected...");
    }).catch(console.error);
app.listen(4000, () => {
    console.log("Server started...");
})