const express = require('express');
const router = express.Router();
const FeedsModel = require('../models/FeedsModel'); // Fixed model name

// GET: Display feeds form
router.get('/feeds', async (req, res) => {
    try {
        const feeds = await FeedsModel.find().lean();
        res.render('feeds', { feeds });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to load feeds');
        res.redirect('/farmer/dashboard');
    }
});

// POST: Save feeds data
router.post('/feeds', async (req, res) => {
    try {
        const { feedDate, amountFeeds, feedCost, nextFeeds, farmerName } = req.body;
        if (!feedDate || !amountFeeds || !feedCost || !farmerName) {
            req.flash('error', 'All required fields must be provided');
            return res.redirect('/feeds');
        }

        const newFeeds = new FeedsModel(req.body);
        await newFeeds.save();
        req.flash('success', 'Feed request submitted successfully');
        res.redirect('/feeds');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to submit feed request');
        res.redirect('/feeds');
    }
});

// POST: Update feed request
router.post('/update/:id', async (req, res) => {
    try {
        const { feedDate, amountFeeds, feedCost, nextFeeds, farmerName } = req.body;
        if (!feedDate || !amountFeeds || !feedCost || !farmerName) {
            req.flash('error', 'All required fields must be provided');
            return res.redirect('/feeds');
        }

        const feed = await FeedsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feed) {
            req.flash('error', 'Feed request not found');
            return res.redirect('/feeds');
        }
        req.flash('success', 'Feed request updated successfully');
        res.redirect('/feeds');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update feed request');
        res.redirect('/feeds');
    }
});

// POST: Delete feed request
router.post('/delete/:id', async (req, res) => {
    try {
        const feed = await FeedsModel.findByIdAndDelete(req.params.id);
        if (!feed) {
            req.flash('error', 'Feed request not found');
            return res.redirect('/feeds');
        }
        req.flash('success', 'Feed request deleted successfully');
        res.redirect('/feeds');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to delete feed request');
        res.redirect('/feeds');
    }
});

module.exports = router;