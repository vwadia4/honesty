const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureBroodManager } = require('../middleware/authMiddleware');

// Models (Ensure correct model names based on your files)
const ChickRequest = require('../models/ChickRequest'); // Fixed to match exportRoutes
const FeedsModel = require('../models/FeedsModel');   // Fixed to match exportRoutes

// GET: Brood Manager Dashboard
router.get('/manager-dashboard', ensureAuthenticated, ensureBroodManager, async (req, res) => {
    try {
        const chickOrders = await ChickRequest.find().lean();
        const feedOrders = await FeedsModel.find().lean();

        res.render('broodManagerDashboard', {
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
router.post('/approve/:type/:id', ensureAuthenticated, ensureBroodManager, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/manager-dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const order = await Model.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/manager-dashboard');
        }
        req.flash('success', 'Order approved successfully');
        res.redirect('/manager-dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/manager-dashboard');
    }
});

// POST: Reject order
router.post('/reject/:type/:id', ensureAuthenticated, ensureBroodManager, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/manager-dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const order = await Model.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/manager-dashboard');
        }
        req.flash('success', 'Order rejected successfully');
        res.redirect('broodmanager-dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/manager-dashboard');
    }
});

// POST: Delete order
router.post('/delete/:type/:id', ensureAuthenticated, ensureBroodManager, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/manager-dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const order = await Model.findByIdAndDelete(id);
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/manager-dashboard');
        }
        req.flash('success', 'Order deleted successfully');
        res.redirect('/manager-dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/manager-dashboard');
    }
});

// POST: Update order
router.post('/update/:type/:id', ensureAuthenticated, ensureBroodManager, async (req, res) => {
    try {
        const { type, id } = req.params;
        if (!['chick', 'feed'].includes(type)) {
            req.flash('error', 'Invalid order type');
            return res.redirect('/manager-dashboard');
        }
        const Model = type === 'chick' ? ChickRequest : FeedsModel;

        const updateData = { ...req.body };
        const order = await Model.findByIdAndUpdate(id, updateData, { new: true });
        if (!order) {
            req.flash('error', 'Order not found');
            return res.redirect('/manager-dashboard');
        }
        req.flash('success', 'Order updated successfully');
        res.redirect('/bmanager-dashboard');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Server Error');
        res.redirect('/manager-dashboard');
    }
});

module.exports = router;