// backend/routes/uploads.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//Upload pathway
router.post('/', upload.single('file'), (req, res) => {
  try {
    res.status(201).send({ filename: req.file.filename });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = upload;
