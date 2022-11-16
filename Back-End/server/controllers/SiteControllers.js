
class SiteControllers {
  index(req, res) {
    res.send({ data: "Connected to server" });
  }
  getServerIP(req, res) {
    var ip = require("ip");
    res.send({ data: ip.address() });
  }
}

module.exports = new SiteControllers;