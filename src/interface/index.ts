import { Schema } from "mongoose";

export type OptionInt = {
    text: string;
    isCorrect?: boolean; // Only for objective quizzes
    tag?: string; // Only for tag-based quizzes
}

export type QuestionInt = {
    question: string;
    options: OptionInt[];
}

export type QuizInt = {
    _id: Schema.Types.ObjectId;
    title: string;
    description?: string;
    type: typeInt;
    questions: QuestionInt[];
    results?: Record<string, string>; // Optional, only for tag-based quizzes
    createdAt?: Date;
    updatedAt?: Date;
}

export type QuizTakenInt = {
    quizId: Schema.Types.ObjectId;
    result: any; // could be score for objective or tag info
    takenAt: Date;
  };
  
  export type UserInt = {
    _id: Schema.Types.ObjectId;
    name: string;
    email: string;
    quizzesTaken?: QuizTakenInt[];
  };

  export type QuizSubmissionInt = {
    userId: string;
    quizId: string;
    result: any; // could be score for objective or tag info
    createdAt?: Date;
    };
  

export enum typeInt {
    OBJECTIVE = "objective",
    TAG_BASED = "tag-based",
}