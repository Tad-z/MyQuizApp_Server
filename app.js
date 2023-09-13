const express = require("express");
const app = express();
const cors = require("cors")
const cron = require('node-cron');
const axios = require('axios')
const main = require("./models/db.js");
const questionsRouter = require("./routes/questions.routes")
const resultRouter = require("./routes/results.routes")
require("dotenv").config();

app.use(cors({
    origin: ["http://localhost:3000", "https://quiz-app-t6ai.onrender.com"]
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/questions", questionsRouter);
app.use("/result", resultRouter);

main()
    .then(() => {
        app.listen(5000, () => {
            console.log("Server started...");
        })
        return console.log("DB connected...");
    }).catch(console.error);

// Schedule the cron job to make a request every 10 minutes to keep the API alive
cron.schedule('*/10 * * * *', async () => {
    try {
        // Make a GET request to a specific endpoint (e.g., /api/keep-alive)
        const response = await axios.get(`https://https-quiz-app-server-onrender-com.onrender.com/questions`)
        console.log('Response:', response.data);
    } catch (error) {
        console.error('Error:', error.message);
    } console.error('Keep-alive request error:', error);
});
