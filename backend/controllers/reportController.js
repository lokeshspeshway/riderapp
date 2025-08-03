const { Ride, Transaction, User } = require('../models');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.exportRidesCSV = async (req, res) => {
  const rides = await Ride.findAll();
  const fields = ['id', 'riderId', 'driverId', 'pickupLocation', 'dropLocation', 'fare', 'status'];
  const parser = new Parser({ fields });
  const csv = parser.parse(rides.map(r => r.toJSON()));

  res.header('Content-Type', 'text/csv');
  res.attachment('rides_report.csv');
  return res.send(csv);
};

exports.exportTransactionsCSV = async (req, res) => {
  const tx = await Transaction.findAll();
  const fields = ['id', 'userId', 'rideId', 'totalFare', 'status', 'tax', 'surge'];
  const parser = new Parser({ fields });
  const csv = parser.parse(tx.map(t => t.toJSON()));

  res.header('Content-Type', 'text/csv');
  res.attachment('transactions_report.csv');
  return res.send(csv);
};

exports.exportUserPDF = async (req, res) => {
  const users = await User.findAll();

  const doc = new PDFDocument();
  const filename = `user_summary_${Date.now()}.pdf`;
  const filePath = path.join(__dirname, `../uploads/${filename}`);

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text('User Summary Report', { align: 'center' }).moveDown();

  users.forEach((u, i) => {
    doc.fontSize(12).text(`${i + 1}. ID: ${u.id} | Phone: ${u.phone} | Role: ${u.role}`);
  });

  doc.end();

  doc.on('finish', () => {
    res.download(filePath, filename, () => {
      fs.unlinkSync(filePath); // cleanup after download
    });
  });
};
