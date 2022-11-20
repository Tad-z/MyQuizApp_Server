const Question = require("../models/questions");

exports.postQuestion = async (req, res) => {
  try {
    const question = new Question({
      question: req.body.question,
      option: req.body.option, 
      answer: req.body.answer,
    });
    const q = await question.save();
    res.status(201).json(q);
  } catch (err) {
    console.log(err.message);
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().exec();
    if (!questions.length) return res.json([]);
    const count = questions.length;
    res.status(200).json({
      message: "Questions retrieved successfully",
      count,
      questions,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteAllQuestions = async (req, res) => {
  try {
    await Question.deleteMany({}).then((data) => {
      res.status(204).json({
        message: `${data.deletedCount} questions were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message:
        err.message || "Some error occurred while removing all questions.",
    });
  }
}

exports.deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await Question.findByIdAndRemove(id).then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Question with id=${id}. Maybe Diary was not found!`,
        });
      } else {
        res.status(204).json({
          message: "Question was deleted successfully!",
        });
      }
    });
  } catch (err) {
    console.log(err.message);
    res.send(err);
  }
};
