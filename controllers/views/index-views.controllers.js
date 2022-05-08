const asyncHandler = require("../../middleware/async");

// @desc    Get index view
// @route   GET /
// @access  Public
exports.getIndexView = asyncHandler(async (req, res, next) => {
  res.status(200).render("index", {
    meta: "Мистецтво - зброя! Офіційний сайт.",
    pageTitle: "Мистецтво - зброя! Офіційний сайт.",
    path: "/",
    scripts: [""],
  });
});
