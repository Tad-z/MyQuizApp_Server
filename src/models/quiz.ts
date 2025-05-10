import { OptionInt, QuestionInt, QuizInt, typeInt } from "../interface";
import mongoose, { Model, Schema } from 'mongoose';


const optionSchema : Schema<OptionInt> = new mongoose.Schema({
  text: { type: String, required: true },
  isCorrect: { type: Boolean },   // Only for objective quizzes
  tag: { type: String },          // Only for tag-based quizzes
});

const questionSchema : Schema<QuestionInt> = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [optionSchema], required: true }
});

const quizSchema : Schema<QuizInt> = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, enum: typeInt, required: true },
  questions: { type: [questionSchema], required: true },
  results: { type: Map, of: String }, // Optional, only for tag-based quizzes
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Quiz: Model<QuizInt> = mongoose.model<QuizInt>('Quiz', quizSchema);
export default Quiz;
