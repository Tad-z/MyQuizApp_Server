const Result = require("../models/result");

exports.postResult = async (req, res) => {
  try {
    const { username, result, attempts, points, status } = req.body;
    if (!username && !result) throw new Error("Data not provided");

    Result.create({ username, result, attempts, points, status }).then(
      (data) => {
        if (data) {
          res.status(200).json({
            message: "Data Saved",
            data,
          });
        } else {
          res.status(400).json({
            message: `Data was not saved`,
          });
        }
      }
    );
  } catch (err) {
    console.log(err.message);
  }
};

exports.getAllResults = async (req, res) => {
  try {
    const results = await Result.find().exec();
    const sortedResults = await Result.find().sort({ points: -1 }).exec();
    if (!sortedResults.length) return res.json([]);
    const count = sortedResults.length;
    res.status(200).json({
      message: "Results retrieved successfully",
      count,
      results: sortedResults,
    });
  } catch (err) {
    console.log(err.message);
  }
};

exports.deleteAllResults = async (req, res) => {
  try {
    await Result.deleteMany({}).then((data) => {
      res.status(204).json({
        message: `${data.deletedCount} results were deleted successfully!`,
      });
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      message:
        err.message || "Some error occurred while removing all results.",
    });
  }
}