import e, { Request, Response } from "express";
import Quiz from "../models/quiz";
import { QuizInt } from "../interface";
import User from "../models/user";
import QuizSubmission from "../models/submissions";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, description, type, questions, results } = req.body;

    if (!title || !type || !Array.isArray(questions)) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (type === "tag-based" && (!results || typeof results !== "object")) {
      return res
        .status(400)
        .json({ message: "Results are required for tag-based quizzes" });
    }

    const quiz = new Quiz({ title, description, type, questions, results });
    await quiz.save();

    
    res.status(201).json({ message: "Quiz created successfully", quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

// type AnswerSubmission = {
//   answers: number[]; // index of selected option for each question in an array
// };

// {
//     "answers": [1, 0, 2] || [null, undefined, -1]
//   }

//   Each number = the index of the selected option in each question.

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = req.params.id;
    const { answers, userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers must be an array" });
    }

    const [quiz, user] = await Promise.all([
      Quiz.findById(quizId).exec(),
      User.findById(userId).exec(),
    ]).catch((error) => {
      console.error("Database query error:", error);
      throw new Error("Failed to fetch quiz or user data");
    });

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    if (!user) return res.status(404).json({ message: "User not found" });

    let result: any;
    let score = 0;
    const tagCounts: Record<string, number> = {};

    quiz.questions.forEach((question, idx) => {
      const selectedIdx = answers[idx];

      // If the user skipped this question
      if (
        typeof selectedIdx !== "number" ||
        selectedIdx < 0 ||
        selectedIdx >= question.options.length
      ) {
        return; // skip this question
      }

      const selected = question.options[selectedIdx];

      if (quiz.type === "objective" && selected.isCorrect) {
        score += 1;
      }

      if (quiz.type === "tag-based" && selected.tag) {
        tagCounts[selected.tag] = (tagCounts[selected.tag] || 0) + 1;
      }
    });

    if (quiz.type === "tag-based") {
      const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
      const topTag = sortedTags.length > 0 ? sortedTags[0][0] : "unknown";

      const template =
        quiz.results instanceof Map
          ? quiz.results.get(topTag)
          : quiz.results?.[topTag];

      result = {
        type: quiz.type,
        tag: topTag,
        template: template || "No result template available for this tag.",
      };
    } else if (quiz.type === "objective") {
      let total = (score / quiz.questions.length) * 100;
      result = {
        type: quiz.type,
        total,
      };
    } else {
      return res.status(400).json({ message: "Invalid quiz type" });
    }

    await User.findByIdAndUpdate(userId, {
      $push: {
        quizzesTaken: {
          quizId: quiz._id,
          result,
          takenAt: new Date(),
        },
      },
    });

    await QuizSubmission.create({
      userId: user._id,
      quizId: quiz._id,
      result,
    });

    res.status(200).json({
      message: "Quiz submitted successfully",
      result,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error submitting quiz", error: err });
  }
};

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId).exec();
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json({ message: "Quiz fetched successfully", quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching quiz", error: err });
  }
}

export const getAllQuizzes = async (req: Request, res: Response) => {
  try {
    const quizzes = await Quiz.find().exec();
    res.status(200).json({ message: "Quizzes fetched successfully", quizzes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching quizzes", error: err });
  }
}
