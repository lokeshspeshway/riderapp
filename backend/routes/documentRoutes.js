const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  uploadDocument,
  getUserDocuments,
  updateDocumentStatus,
  getAllDocuments
} = require('../controllers/documentController');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/user/:userId', getUserDocuments);
router.put('/:docId/status', updateDocumentStatus);
router.get('/all', getAllDocuments);

module.exports = router;
