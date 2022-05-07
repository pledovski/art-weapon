const e = require("express");
const Project = require("../models/Project");
const Property = require("../models/Property");

const advancedResults = (model, populate, options) => async (req, res, next) => {
  let query;

  const reqQuery = { ...req.query };
  const removeFields = [
    "select",
    "sort",
    "page",
    "limit",
    "projects",
    "subway",
    "parking",
    "school",
    "terrace",
    "nursery",
    "/", // Refactoring
  ];

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  query = JSON.parse(queryStr);

  let results = [];

  const request = async (query) => {
    if (options) {
      Object.assign(query, options);
    }
    query = model.find(query);

    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const length = await model.countDocuments(query);

    query = query.skip(startIndex).limit(limit);

    if (populate) {
      query = query.populate(populate);
    }
    const properties = {};
    properties.data = await query;

    const pagination = {};

    if (endIndex < length) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    properties.pagination = pagination;
    properties.length = length;

    return properties;
  };

  if (model == Property) {
    if (!query.status) {
      query["status.value"] = "available";
    } else {
      query["status.value"] = query.status;
    }
    query.propertyType = "property";

    let projectFilters = ["subway", "parking", "school", "terrace", "nursery"];
    let filter = {};

    for (let [key, value] of Object.entries(req.query)) {
      if (projectFilters.includes(key)) {
        filter[key] = Boolean(value);
      }
    }
    // Advanced result for multiple projects
    if (req.query.projects) {
      for (let project of req.query.projects.split(",")) {
        filter.type = "Living";
        filter._id = project;
        let result = await Project.findOne(filter)
          .populate({ path: "imgList", options: { sort: { position: 1 } } })
          .populate({
            path: "locality.subwayStation",
          })
          .sort({ position: 1 });
        if (result) {
          result = result.toObject();
          query.project = result._id;
          result.properties = await request(query);
          results.push(result);
        }
      }
      // Default result for properties page (all projects)
    } else {
      filter.type = "Living";
      let projects = await Project.find(filter)
        .populate({ path: "imgList", options: { sort: { position: 1 } } })
        .populate({
          path: "locality.subwayStation",
        })
        .sort({ position: 1 });
      for (let result of projects) {
        result = result.toObject();
        query.project = result._id;
        result.properties = await request(query);
        results.push(result);
      }
    }
  } else {
    results = await model.find(query);
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    data: results,
  };

  next();
};

module.exports = advancedResults;
