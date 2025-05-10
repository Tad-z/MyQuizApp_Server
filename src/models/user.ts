import { QuizTakenInt, UserInt  } from "../interface";
import mongoose, { Model, Schema } from 'mongoose';

const quizTakenSchema: Schema<QuizTakenInt> = new mongoose.Schema({
    quizId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
    result: { type: Object, required: true }, // could be score for objective or tag info
    takenAt: { type: Date, default: Date.now },
});

const userSchema: Schema<UserInt> = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    quizzesTaken: { type: [quizTakenSchema], default: [] },
});

const User: Model<UserInt> = mongoose.model<UserInt>('User', userSchema);
export default User;