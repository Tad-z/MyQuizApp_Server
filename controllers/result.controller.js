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
    if (!results.length) return res.json([]);
    const count = results.length;
    res.status(200).json({
      message: "Results retrieved successfully",
      count,
      results,
    });
  } catch (err) {
    console.log(err.message);
  }
};
