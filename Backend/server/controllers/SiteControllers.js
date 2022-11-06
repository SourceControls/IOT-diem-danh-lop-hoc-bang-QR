class SiteControllers {
  index(req, res) {
    res.send({ data: "Connected to server" });
  }
}

module.exports = new SiteControllers;