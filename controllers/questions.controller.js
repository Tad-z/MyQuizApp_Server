const Question = require("../models/questions");

exports.postQuestion = async (req, res) => {
    try {
      const question = new Question({
        question: req.body.question,
        option1: req.body.option1,
        option2: req.body.option2,
        option3: req.body.option3,
        answer: req.body.answer,
      });
      const q = await question.save()
      res.status(200).json(q)
    } catch (err) {
      console.log(err.message);
    }
  }

  exports.getAllQuestions = async (req, res) => {
    try {
      const questions = await Question.find().exec();
      if (!questions.length) return res.json([]);
      const count = questions.length
      res.status(200).json({
        message: "Questions retrieved successfully",
        count,
        questions,
      });
  
    } catch (err) {
      console.log(err.message);
    }
  };
  