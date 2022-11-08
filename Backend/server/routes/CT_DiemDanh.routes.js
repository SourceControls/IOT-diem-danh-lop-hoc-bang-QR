const express = require('express');
const router = express.Router();
const controller = require('../controllers/CT_DiemDanhController')

router.use('/GetList', controller.getList);

router.use('/Delete', controller.delete);

router.use('/Update', controller.update)

router.use('/', controller.index);

module.exports = router;