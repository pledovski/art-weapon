const geoip = require("geoip-lite");
const fs = require("fs");

exports.log_visit = (req, res) => {
  console.log(req);
  fs.readFile("./_data/visits.json", "utf-8", (err, data) => {
    let visits = [];
    const ip = req.socket.remoteAddress;
    const location = geoip.lookup(ip);
    if (err) {
      visits.push({
        visits: 1,
        IP: ip,
        location,
        userAgent: req.headers["user-agent"],
        url: req.url,
        query: req.query,
        headers: req.headers,
      });
    } else {
      visits = JSON.parse(data);
      visits.push({
        visits: visits.length + 1,
        IP: ip,
        location,
        userAgent: req.headers["user-agent"],
        url: req.url,
        query: req.query,
        headers: req.headers,
      });
    }
    console.log(visits);

    fs.writeFile("./_data/visits.json", JSON.stringify(visits), (err) => {
      if (err) {
        // console.error(err);
        // res.send("An error occurred.");
        res.redirect("https://ra.co/events/1645227");
      } else {
        // res.send(`Number of visits: ${visits.length}`);
        res.redirect("https://ra.co/events/1645227");
      }
    });
  });
};
