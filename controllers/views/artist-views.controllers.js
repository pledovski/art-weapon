const asyncHandler = require("../../middleware/async");

const fs = require("fs");
const Path = require("path");

// @desc    Get artist view
// @route   GET /artists/:artistSlug
// @access  Public
exports.getArtistView = asyncHandler(async (req, res, next) => {
  const p = Path.resolve(`./_data/artists.json`);
  const data = JSON.parse(fs.readFileSync(p, "utf-8"));
  const artist = data.find((artist) => artist.slug === req.params.artistSlug);

  res.status(200).render("pages/artist", {
    meta: "Art - weapon! Music tage.",
    pageTitle: "Art - weapon! Music tage.",
    path: "/",
    artist,
    scripts: [""],
  });
});
