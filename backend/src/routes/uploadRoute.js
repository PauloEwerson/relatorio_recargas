const { Router } = require('express');
const controller = require('../Flow/controllers/upload');
const validateSendCsv = require('../middleware/validateUpload');

const { upload } = require('../middleware/upload');

const uploadRoute = Router();

uploadRoute.post('/',
  upload.single('file'),
  validateSendCsv.validateSendCsv,
  controller.uploadCsv,
);

module.exports = uploadRoute;