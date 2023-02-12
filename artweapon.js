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

const geoip = require("geoip-lite");
const fs = require("fs");

// Load env vars
// dotenv.config({ path: "./config/config.env" });

// connectDB();

// Define routes
// View routes
const indexView = require("./routes/views/index-views.routes");
const artistView = require("./routes/views/artist-views.routes");

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
app.get("/", (req, res) => {
  fs.readFile("./_data/visits.json", "utf-8", (err, data) => {
    let visits = [];
    const ip = req.socket.remoteAddress;
    const location = geoip.lookup(ip);
    if (err) {
      visits.push({
        visits: 1,
        IP: ip,
        location,
        userAgent: req.headers["user-agent"],
        url: req.url,
        query: req.query,
        headers: req.headers,
      });
    } else {
      visits = JSON.parse(data);
      visits.push({
        visits: visits.length + 1,
        IP: ip,
        location,
        userAgent: req.headers["user-agent"],
        url: req.url,
        query: req.query,
        headers: req.headers,
      });
    }

    fs.writeFile("./_data/visits.json", JSON.stringify(visits), (err) => {
      if (err) {
        // console.error(err);
        // res.send("An error occurred.");
        res.redirect("https://ra.co/events/1645227");
      } else {
        // res.send(`Number of visits: ${visits.length}`);
        res.redirect("https://ra.co/events/1645227");
      }
    });
  });
});

// Mount routers
// app.use("/api/v1/admin", users);

app.use(indexView);
app.use(artistView);

app.use(errorController.get404);

app.use(errorHandler);

let PORT;
let IP;
if (process.env.NODE_ENV === "development") {
  PORT = 3333;
  // IP = "192.168.1.93";
  IP = "127.0.0.1";
} else {
  PORT = process.env.PORT || 3333;
  IP = "127.0.0.1";
}

app.listen(PORT, IP, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${IP}:${PORT}`);
});
