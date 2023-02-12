const express = require("express");
const router = express.Router();

const {
  getIndexView,
  theatreView,
  exhibitionView,
} = require("../../controllers/views/index-views.controllers");

router.route("/").get(getIndexView);
router.route("/theatre").get(theatreView);
router.route("/exhibition").get(exhibitionView);

module.exports = router;
