const express = require("express");
const router = express.Router();

const {
  getIndexView,
  getMusicView,
  getTheatreView,
  getExhibitionView,
  getVisits,
} = require("../../controllers/views/index-views.controllers");

router.route("/").get(getIndexView);
router.route("/music").get(getMusicView);
router.route("/theatre").get(getTheatreView);
router.route("/exhibition").get(getExhibitionView);
router.route("/visits").get(getVisits);

module.exports = router;
