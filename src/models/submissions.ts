import mongoose, { Model, Schema } from 'mongoose';
import { QuizSubmissionInt } from "../interface";

const quizSubmissionSchema: Schema<QuizSubmissionInt> = new mongoose.Schema({
    userId: { type: String, required: true },
    quizId: { type: String, required: true },
    result: { type: Object, required: true }, // could be score for objective or tag info
    createdAt: { type: Date, default: Date.now },
});

const QuizSubmission: Model<QuizSubmissionInt> = mongoose.model<QuizSubmissionInt>('QuizSubmission', quizSubmissionSchema);
export default QuizSubmission;