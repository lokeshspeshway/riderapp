const { Document } = require('../models');

exports.uploadDocument = async (req, res) => {
  const { userId, type } = req.body;
  const filePath = req.file.filename;

  const document = await Document.create({ userId, type, filePath });
  res.json({ message: 'Document uploaded', document });
};

exports.getUserDocuments = async (req, res) => {
  const { userId } = req.params;
  const docs = await Document.findAll({ where: { userId } });
  res.json(docs);
};

exports.updateDocumentStatus = async (req, res) => {
  const { docId } = req.params;
  const { status } = req.body;

  const doc = await Document.findByPk(docId);
  if (!doc) return res.status(404).json({ error: 'Not found' });

  doc.status = status;
  await doc.save();

  res.json({ message: 'Status updated', doc });
};

exports.getAllDocuments = async (req, res) => {
  const docs = await Document.findAll();
  res.json(docs);
};
