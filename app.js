const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const errorHandler = require("./middleware/error");
const fileupload = require("express-fileupload");
const errorController = require("./controllers/error");
const connectDB = require("./config/db.js");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

// Load env vars
dotenv.config({ path: "./config/config.env" });

connectDB();

// Define routes
// View routes
const indexView = require("./routes/views/index-views.routes");

// API routes
// const projects = require("./routes/api/projects");

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File uploading
app.use(fileupload());

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 10000,
  })
);

// Prevent http param pollution
app.use(hpp());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  express.static(path.join(__dirname, "public"), {
    // maxAge: process.env.NODE_ENV == "production" ? 7 * 24 * 60 * 60 * 1000 : 0,
  })
);

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
// app.use("/api/v1/admin", users);

app.use(indexView);

app.use(errorController.get404);

app.use(errorHandler);

let PORT;
let IP;
if (process.env.NODE_ENV === "development") {
  PORT = 5000;
  // IP = "192.168.1.93";
  IP = "127.0.0.1";
} else {
  PORT = process.env.PORT || 6000;
  IP = "127.0.0.1";
}

app.listen(PORT, IP, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${IP}:${PORT}`);
});
