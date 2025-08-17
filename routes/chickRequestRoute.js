const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureFarmer, ensureBroodManager } = require('../middleware/authMiddleware');
const ChickRequest = require('../models/ChickRequest');

// GET: Display request form and status
router.get('/request', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const pendingRequests = await ChickRequest.countDocuments({ status: 'Pending' });
        const approvedRequests = await ChickRequest.countDocuments({ status: 'Approved' });
        const dispatchedRequests = await ChickRequest.countDocuments({ status: 'Dispatched' });
        const requests = await ChickRequest.find({ user: req.user._id }).lean();

        const isStarter = requests.length === 0;
        res.render('chicksRequest', {
            isStarter,
            pendingRequests,
            approvedRequests,
            dispatchedRequests,
            requests,
            user: req.user
        });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to load requests');
        res.redirect('/');
    }
});

// POST: Save new request
router.post('/request', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const { farmerName, age, farmerType, quantity, category, chicksType, unitPrice } = req.body;
        if (!farmerName || !quantity || !unitPrice || !chicksType) {
            req.flash('error', 'All required fields must be provided');
            return res.redirect('/request');
        }

        const totalPrice = quantity * unitPrice;
        const requestDate = new Date();
        const userId = req.user._id;

        const newRequest = new RequestsModel({
            farmerName,
            age,
            farmerType,
            quantity,
            category,
            chicksType,
            unitPrice,
            totalPrice,
            requestDate,
            user: userId,
            status: 'Pending'
        });

        await newRequest.save();
        req.flash('success', 'Request submitted successfully');
        res.redirect('/farmer/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to submit request');
        res.redirect('/request');
    }
});

// POST: Approve request (for BroodManager)
router.post('/approve/:id', ensureAuthenticated, ensureBroodManager, async (req, res) => {
    try {
        const request = await RequestsModel.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
        if (!request) {
            req.flash('error', 'Request not found');
            return res.redirect('/broodmanager/dashboard');
        }
        req.flash('success', 'Request approved successfully');
        res.redirect('/broodmanager/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to approve request');
        res.redirect('/broodmanager/dashboard');
    }
});

// POST: Update request
router.post('/update/:id', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const { quantity, unitPrice, chicksType } = req.body;
        if (!quantity || !unitPrice || !chicksType) {
            req.flash('error', 'All required fields must be provided');
            return res.redirect('/farmer/dashboard');
        }

        const totalPrice = quantity * unitPrice;
        const request = await RequestsModel.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { quantity, unitPrice, chicksType, totalPrice },
            { new: true }
        );

        if (!request) {
            req.flash('error', 'Request not found or unauthorized');
            return res.redirect('/farmer/dashboard');
        }
        req.flash('success', 'Request updated successfully');
        res.redirect('/farmer/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update request');
        res.redirect('/farmer/dashboard');
    }
});

// POST: Delete request
router.post('/delete/:id', ensureAuthenticated, ensureFarmer, async (req, res) => {
    try {
        const request = await RequestsModel.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!request) {
            req.flash('error', 'Request not found or unauthorized');
            return res.redirect('/farmer/dashboard');
        }
        req.flash('success', 'Request deleted successfully');
        res.redirect('/farmer/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to delete request');
        res.redirect('/farmer/dashboard');
    }
});

module.exports = router;