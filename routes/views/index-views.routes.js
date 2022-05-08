const express = require("express");
const router = express.Router();

const { getIndexView } = require("../../controllers/views/index-views.controllers");

router.route("/").get(getIndexView);

module.exports = router;
