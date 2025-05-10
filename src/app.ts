import express, { Application } from "express";
import cors from "cors";
import cron from "node-cron";
import dotenv from "dotenv";
import main from "./models/db";
import quizRouter from "./routes/quiz";
import userRouter from "./routes/user";

dotenv.config();

const app: Application = express();

app.use(cors({
    origin: ["http://localhost:3000", "https://quiz-app-t6ai.onrender.com"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/quiz", quizRouter);
app.use("/user", userRouter);

main()
    .then(() => {
        app.listen(5000, () => {
            console.log("Server started...");
        });
        console.log("DB connected...");
    })
    .catch(console.error);

// Schedule the cron job to make a request every 10 minutes to keep the API alive
// cron.schedule('*/14 * * * *', async () => {
//     try {
//         // Make a GET request to a specific endpoint (e.g., /api/keep-alive)
//         const response = await axios.get(`https://https-quiz-app-server-onrender-com.onrender.com/questions`);
//         console.log('Response:', response.data);
//     } catch (error: any) {
//         console.error('Error:', error.message);
//         console.error('Keep-alive request error:', error);
//     }
// });

export default app;
