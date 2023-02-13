const mongoose = require("mongoose");

const VisitSchema = new mongoose.Schema({
  IP: {
    type: String,
    required: true,
  },
  location: {
    type: Object,
  },
  userAgent: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  query: {
    type: Object,
    required: true,
  },
  headers: {
    type: Object,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Visit", VisitSchema);
