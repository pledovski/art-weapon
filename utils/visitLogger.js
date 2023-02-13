const geoip = require("geoip-lite");

const Visit = require("../models/Visit");

exports.log_visit = async (req, res, next) => {
  let ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(req.headers["x-forwarded-for"], req.connection.remoteAddress);

  const location = geoip.lookup(ip);

  await Visit.create({
    IP: ip,
    location,
    userAgent: req.headers["user-agent"],
    url: req.originalUrl,
    query: req.query,
    headers: req.headers,
  });
};
