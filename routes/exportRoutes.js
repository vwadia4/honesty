const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');

const ChickRequest = require('../models/chickRequest');
const ChickPayment = require('../models/chickPayment');
const Farmer = require('../models/farmerModel');
const Feed = require('../models/feedsModel');

function exportToCSV(res, data, fields, filename) {
  try {
    const parser = new Parser({ fields });
    const csv = parser.parse(data);
    res.header('Content-Type', 'text/csv');
    res.attachment(filename);
    return res.send(csv);
  } catch (err) {
    console.error('Error exporting to CSV:', err);
    res.status(500).send('Error exporting data');
  }
}

// Export farmers
router.get('/export/farmers', async (req, res) => {
  const farmers = await Farmer.find().lean();
  exportToCSV(res, farmers, ['name', 'location', 'contact'], 'farmers.csv');
});

// Export chicks requests
router.get('/export/requests', async (req, res) => {
  const requests = await ChickRequest.find().lean();
  exportToCSV(res, requests, ['date', 'totalChicks', 'farmerName', 'salesRep', 'amount'], 'requests.csv');
});
// Export payments
router.get('/export/payments', async (req, res) => {
const payments = await ChickPayment.find().lean();
  exportToCSV(res, payments, ['dueDate', 'farmer', 'amount'], 'payments.csv');
});


// Export feeds
router.get('/export/feeds', async (req, res) => {
  const feeds = await Feed.find().lean();
  exportToCSV(res, feeds, ['feedDate', 'amountFeeds', 'feedCost', 'nextFeeds', 'farmerName'], 'feeds.csv');
});

module.exports = router;
