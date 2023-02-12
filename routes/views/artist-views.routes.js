const express = require("express");
const router = express.Router();

const { getArtistView } = require("../../controllers/views/artist-views.controllers");

router.route("/artists/:artistSlug").get(getArtistView);

module.exports = router;
