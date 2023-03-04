const multer = require('multer');
const path = require('path');

// Upload a CSV file to the server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', '/helpers/csv/archive'));
  },
  filename: (req, file, cb) => {
    cb(null, 'data.csv');
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'text/csv') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  overwrite: true
});

module.exports = {
  upload,
  storage,
  fileFilter
};