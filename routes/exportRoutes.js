const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');

const ChickRequest = require('../models/ChickRequest');
const ChickPayment = require('../models/ChickPayment');
const FarmerModel = require('../models/User');
const FeedsModel = require('../models/FeedsModel');

// Helper function to export data to CSV
function exportToCSV(res, data, fields, filename) {
    try {
        if (!data.length) {
            return res.status(404).send('No data available for export');
        }
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
router.get('/farmers', async (req, res) => {
    try {
        const farmers = await FarmerModel.find().lean();
        exportToCSV(res, farmers, ['name', 'location', 'contact'], 'farmers.csv');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Export chick requests
router.get('/requests', async (req, res) => {
    try {
        const requests = await ChickRequest.find().lean();
        exportToCSV(res, requests, ['date', 'totalChicks', 'farmerName', 'salesRep', 'amount'], 'requests.csv');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Export payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await ChickPayment.find().populate('user').lean();
    exportToCSV(res, payments, ['dueDate', 'user.fullName', 'amount'], 'payments.csv');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Export feeds
router.get('/feeds', async (req, res) => {
    try {
        const feeds = await FeedsModel.find().lean();
        exportToCSV(res, feeds, ['feedDate', 'amountFeeds', 'feedCost', 'nextFeeds', 'farmerName'], 'feeds.csv');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Export sales/revenue report
router.get('/sales-revenue', async (req, res) => {
    try {
        const payments = await ChickPayment.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$amount' },
                    totalSales: { $sum: 1 }
                }
            }
        ]);

        const salesData = payments.length
            ? [{ totalRevenue: payments[0].totalRevenue, totalSales: payments[0].totalSales }]
            : [{ totalRevenue: 0, totalSales: 0 }];

        exportToCSV(res, salesData, ['totalRevenue', 'totalSales'], 'sales-revenue.csv');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;