const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureFarmer } = require('../middleware/authMiddleware');

// Models
const ChickRequest = require('../models/ChickRequest'); // Fixed to match exportRoutes
const FeedsModel = require('../models/FeedsModel');   // Fixed to match exportRoutes

// GET: Sales Rep Dashboard
router.get('/farmer-dashboard', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const chickOrders = await ChickRequest.find().lean();
        const feedOrders = await FeedsModel.find().lean();

        res.render('farmerDashboard', {
            user: req.user,
            chickOrders,
            feedOrders
        });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/login');
    }
});

// POST: Approve order
router.post('/approve/:type/:id', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/salesrep/dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const order = await Model.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/salesrep/dashboard');
        }
        req.flash('success', 'Order approved successfully');
        res.redirect('/salesrep/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/salesrep/dashboard');
    }
});

// POST: Reject order
router.post('/reject/:type/:id', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/salesrep/dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const order = await Model.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/salesrep/dashboard');
        }
        req.flash('success', 'Order rejected successfully');
        res.redirect('/salesrep/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/salesrep/dashboard');
    }
});

// POST: Dispatch order
router.post('/dispatch/:type/:id', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/salesrep/dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const order = await Model.findByIdAndUpdate(id, { status: 'Dispatched' }, { new: true });
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/salesrep/dashboard');
        }
        req.flash('success', 'Order dispatched successfully');
        res.redirect('/salesrep/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/salesrep/dashboard');
    }
});

// POST: Update order
router.post('/update/:type/:id', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/salesrep/dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const updateData = { ...req.body };
        const order = await Model.findByIdAndUpdate(id, updateData, { new: true });
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/salesrep/dashboard');
        }
        req.flash('success', 'Order updated successfully');
        res.redirect('/salesrep/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/salesrep/dashboard');
    }
});

// POST: Delete order
router.post('/delete/:type/:id', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/salesrep/dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const order = await Model.findByIdAndDelete(id);
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/salesrep/dashboard');
        }
        req.flash('success', 'Order deleted successfully');
        res.redirect('/salesrep/dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/salesrep/dashboard');
    }
});

module.exports = router;