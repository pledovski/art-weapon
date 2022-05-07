const NodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER_GOOGLE,
  httpAdaptor: "https",
  apiKey: process.env.GEOCODER_GOOGLE_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
