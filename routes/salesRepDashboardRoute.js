const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureSalesRep } = require('../middleware/authMiddleware');

// Models
const ChickOrder = require('../models/ChickRequest');
const FeedOrder = require('../models/FeedsModel');

// GET: Sales Rep Dashboard
router.get('/sales-dashboard', ensureAuthenticated, ensureSalesRep, async (req, res) => {
    try {
        const chickOrders = await ChickOrder.find().lean();
        const feedOrders = await FeedOrder.find().lean();

        res.render('salesRepDashboard', {
            user: req.user,
            chickOrders,
            feedOrders
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST: Approve order
router.post('/approve/:type/:id', ensureAuthenticated, ensureSalesRep, async (req, res) => {
    try {
        const { type, id } = req.params;
        const Model = type === 'chick' ? ChickOrder : FeedOrder;

        await Model.findByIdAndUpdate(id, { status: 'Approved' });
        res.redirect('/salesrep/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST: Reject order
router.post('/reject/:type/:id', ensureAuthenticated, ensureSalesRep, async (req, res) => {
    try {
        const { type, id } = req.params;
        const Model = type === 'chick' ? ChickOrder : FeedOrder;

        await Model.findByIdAndUpdate(id, { status: 'Rejected' });
        res.redirect('/salesrep/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// POST: Dispatch order
router.post('/dispatch/:type/:id', ensureAuthenticated, ensureSalesRep, async (req, res) => {
    try {
        const { type, id } = req.params;
        const Model = type === 'chick' ? ChickOrder : FeedOrder;

        await Model.findByIdAndUpdate(id, { status: 'Dispatched' });
        res.redirect('/salesrep/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
