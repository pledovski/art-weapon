const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(err);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    if (req.originalUrl.split("/").includes("projects")) {
      return res.status(404).render("404", {
        res,
        meta: "",
        pageTitle: "Page Not Found",
        path: "/404",
        message: `Проєкта з ID ${req.params.id} не знайдено.`,
        scripts: ["nav"],
      });
    } else {
      const message = `Ресурс з id ${err.value} не знайдено`;
      error = new ErrorResponse(message, 404);
    }
  }

  // Mongoose duplicated key
  if (err.code === 11000) {
    const message = "Duplicated field value entered";
    error = new ErrorResponse(message, 400);
  }

  // Mongoo calidation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  console.log(error.message);

  res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message || "Server Error" });
};

module.exports = errorHandler;
