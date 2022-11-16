// chứa các site dùng cho cả 3 đối tượng
const express = require('express');
const router = express.Router();
const siteControllers = require('../controllers/SiteControllers')


router.use('/getServerIP', siteControllers.getServerIP);
router.use('/', siteControllers.index);

module.exports = router;