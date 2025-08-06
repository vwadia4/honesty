const express = require('express');
const router = express.Router();
const ChickRequest = require('../models/farmerModel');
const Farmer = require('../models/farmerModel');
const Feed = require('../models/feedsModel');
const Payment = require('../models/chickPayment');

const { Parserarser } = require('json2csv');
const Request = require('../models/requestsModel');
//const Payment = require('../models/chickPayment');

router.get('/dashboard', async (req, res) => {
  try {
    const totalChicks = await ChickRequest.aggregate([{ $group: { _id: null, total: { $sum: "$quantity" } } }]);
    const totalFarmers = await Farmer.countDocuments();
    const totalRequests = await ChickRequest.countDocuments();
    const totalFeeds = await Feed.countDocuments();

    const pendingRequests = await ChickRequest.find({ status: 'pending' }).populate('farmer salesRep');
    const pendingPayments = await Payment.find({ status: 'due' }).populate('farmer');

    // Prepare stats
    const stats = [
      {
        label: 'Chicks',
        count: totalChicks[0]?.total || 0,
        exportLink: '/export/chicks'
      },
      {
        label: 'Farmers',
        count: totalFarmers,
        exportLink: '/export/farmers'
      },
      {
        label: 'Requests',
        count: totalRequests,
        exportLink: '/export/requests'
      },
      {
        label: 'Feeds',
        count: totalFeeds,
        exportLink: '/export/feeds'
      }
    ];

    res.render('dashboard', {
      totalChicks: totalChicks[0]?.total || 0,
      totalFarmers,
      totalRequests,
      totalFeeds,
      pendingRequests,
      pendingPayments
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
  
});