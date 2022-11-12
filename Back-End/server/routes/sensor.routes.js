const express = require('express');
const router = express.Router();
const controller = require('../controllers/SensorController')

router.use('/', controller.insertSensorData);

module.exports = router;