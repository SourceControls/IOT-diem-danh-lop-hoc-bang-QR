const express = require('express');
const router = express.Router();
const phongDaoTaoController = require('../controllers/PhongDaoTaoControllers')





router.use('/GetListGiangVien', phongDaoTaoController.getListGiangVien);

router.use('/DeleteGiangVien', phongDaoTaoController.deleteGiangVien);

router.use('/UpdateGiangVien', phongDaoTaoController.updateGiangVien)

router.use('/', phongDaoTaoController.index);

module.exports = router;