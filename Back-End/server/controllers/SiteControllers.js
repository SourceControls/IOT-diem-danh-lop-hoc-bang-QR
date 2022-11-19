
const path = require('path');
class SiteControllers {
  index(req, res) {
    res.send({ data: "Connected to server" });
  }
  getServerIP(req, res) {
    var ip = require("ip");
    res.send({ data: ip.address() });
  }
  classSite(req, res) {
    res.sendFile(path.join("/public/view/class/class.html"));

  }
}

module.exports = new SiteControllers;