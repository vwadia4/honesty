const express = require('express');
const router = express.Router();

const { ensureAuthenticated, isBroodManager } = require('../middleware/authmiddleware'); //test

const Farmer = require('../models/farmerModel');
const ChickRequest = require('../models/chickRequest');
const FeedRequest = require('../models/feedsModel');
const ChickPayment = require('../models/paymentModel');

router.get('/brood/dashboard', ensureAuthenticated, isBroodManager, (req, res) => { //testing
  // render dashboard
});

router.get('/', async (req, res) => {
  try {
    const totalChicks = await ChickRequest.aggregate([
      { $match: {} },
      { $group: { _id: null, total: { $sum: "$totalChicks" } } }
    ]);

    const totalFeeds = await FeedRequest.aggregate([
      { $match: {} },
      { $group: { _id: null, total: { $sum: "$amountFeeds" } } }
    ]);

    const totalRequests = await ChickRequest.countDocuments();
    const totalFarmers = await Farmer.countDocuments();

    const pendingChickRequests = await ChickRequest.find({ status: 'pending' }).populate('farmer');
    const pendingFeedRequests = await FeedRequest.find({ status: 'pending' }).populate('farmer');
    const pendingChickPayments = await ChickPayment.find().populate('farmer');

    res.render('dashboard', {
      totalChicks: totalChicks[0]?.total || 0,
      totalFeeds: totalFeeds[0]?.total || 0,
      totalRequests,
      totalFarmers,
      pendingChickRequests,
      pendingFeedRequests,
      pendingChickPayments
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//DASHBOARD ROUTE FOR SALES REPRESENTATIVE

const ChicksOrder = require('../models/chicksOrder');
const FeedsOrder = require('../models/feedsOrder');

router.get('/dashboard', async (req, res) => {
    try {
        const chicks = await ChicksOrder.find().lean();
        const feeds = await FeedsOrder.find().lean();

        const combined = [
            ...chicks.map(o => ({ ...o, type: 'Chicks' })),
            ...feeds.map(o => ({ ...o, type: 'Feeds' }))
        ];

        res.render('salesRepDashboard', { orders: combined });
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// Show update form (Brood Mgr)
router.get('/edit/:id', async (req, res) => {
  const broodManager = await isBroodManager.findById(req.params.id);
  res.render('editFarmer', { broodManager });
});

// Handle update
router.post('/edit/:id', async (req, res) => {
  await BroodManager.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/broodManager/dashboard');
});

module.exports = router;
