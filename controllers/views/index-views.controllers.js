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
    meta: "Art - weapon! Music stage.",
    pageTitle: "Art - weapon! Music stage.",
    path: "/",
    lineup,
    scripts: [""],
  });
});

// @desc    Get music view
// @route   GET /music
// @access  Public
exports.getMusicView = asyncHandler(async (req, res, next) => {
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
  res.status(200).render("pages/music", {
    meta: "Art - weapon! Music stage.",
    pageTitle: "Art - weapon! Music stage.",
    path: "/music",
    lineup,
    scripts: [""],
  });
});

// @desc    Get theatre view
// @route   GET /theatre
// @access  Public
exports.getTheatreView = asyncHandler(async (req, res, next) => {
  const lineup = ["nobody died today", "tysk. dosvid", "pla_ce", "acting workshop"];

  res.status(200).render("index", {
    meta: "Art - weapon! Theatre sstage.",
    pageTitle: "Art - weapon! Theatre sstage.",
    path: "/theatre",
    lineup,
    scripts: [""],
  });
});

// @desc    Get exhibition view
// @route   GET /exhibition
// @access  Public
exports.getExhibitionView = asyncHandler(async (req, res, next) => {
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
    meta: "Art - weapon! Theatre sstage.",
    pageTitle: "Art - weapon! Theatre sstage.",
    path: "/theatre",
    lineup,
    scripts: [""],
  });
});

// @desc    Get visits view
// @route   GET /visits
// @access  Public
exports.getVisits = asyncHandler(async (req, res, next) => {
  const visits = await Visit.find().sort({ created_at: -1 });
  visits.unshift({ count: visits.length });
  res.status(200).send(visits);
});
