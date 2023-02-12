const express = require("express");
const router = express.Router();

const {
  getIndexView,
  theatreView,
  exhibitionView,
  getVisits,
} = require("../../controllers/views/index-views.controllers");

router.route("/").get(getIndexView);
router.route("/theatre").get(theatreView);
router.route("/exhibition").get(exhibitionView);
router.route("/visits").get(getVisits);

module.exports = router;
