const asyncHandler = require("../../middleware/async");
const Visit = require("../../models/Visit");

const fs = require("fs");

// @desc    Get index view
// @route   GET /
// @access  Public
exports.getIndexView = asyncHandler(async (req, res, next) => {
  const lineup = [
    [
      "warнякання",
      "OTOY",
      "TONKA",
      "Kurs Valüt",
      "Sensitive Content",
      "Stas Koroliv",
      "RUSIIICK",
      "The Lazy Jezus",
      "Koloah",
    ],
    [
      "MONOCONDA",
      "BEJENEC",
      "FIGURAT / DEE POSH",
      "SYMONENKO",
      "JANE",
      "BADWOR7H",
      "MAAT",
      "PAAT.",
      "AEROBIICA",
      "PLEDOV",
    ],
  ];
  res.status(200).render("index", {
    meta: "Art - weapon! Music tage.",
    pageTitle: "Art - weapon! Music tage.",
    path: "/",
    lineup,
    scripts: [""],
  });
});

// @desc    Get theatre view
// @route   GET /theatre
// @access  Public
exports.theatreView = asyncHandler(async (req, res, next) => {
  const lineup = ["nobody died today", "tysk. dosvid", "pla_ce", "acting workshop"];
  res.status(200).render("index", {
    meta: "Art - weapon! Theatre stage.",
    pageTitle: "Art - weapon! Theatre stage.",
    path: "/theatre",
    lineup,
    scripts: [""],
  });
});

// @desc    Get exhibition view
// @route   GET /exhibition
// @access  Public
exports.exhibitionView = asyncHandler(async (req, res, next) => {
  const lineup = [
    "Marta Syrko",
    "Art Armor",
    "Maria Matiashova",
    "Albert Lores",
    "Alex Derega",
    "Taya Kabaeva",
    "Vitalii Shupliak",
    "Yaroslav Galyk",
    "T.",
  ];
  res.status(200).render("index", {
    meta: "Art - weapon! Theatre stage.",
    pageTitle: "Art - weapon! Theatre stage.",
    path: "/theatre",
    lineup,
    scripts: [""],
  });
});

// @desc    Get visits view
// @route   GET /visits
// @access  Public
exports.getVisits = asyncHandler(async (req, res, next) => {
  const visits = await Visit.find();
  visits.unshift({ count: visits.length });
  res.status(200).send(visits);
});
