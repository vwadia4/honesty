const express = require('express');
const router = express.Router();
const SalesRepModel = require('../models/SalesRepModel'); // Fixed model name

// GET: Display registration form
router.get('/salesRep', (req, res) => {
    res.render('salesRepReg');
});

router.post('/salesRep', async (req, res) => {
  try {
    const { fullName, repGender, repDob, repContact, repEmail, repNin, district, county, subCounty, parish, village, comment, password } = req.body;
    if (!fullName || !repGender || !repDob || !repContact || !repEmail || !repNin || !district || !county || !subCounty || !parish || !village || !password) {
      req.flash('error', 'All fields are required');
      return res.redirect('/salesRep');
    }
    const newUser = new User({
      fullName,
      gender: repGender,
      phoneNumber: repContact,
      email: repEmail,
      nin: repNin,
      recommenderName: 'N/A', // Adjust as needed
      recommenderNin: 'N/A',
      role: 'SalesRep'
    });
    const registeredUser = await User.register(newUser, password);
    const newSalesRep = new SalesRepModel({
      user: registeredUser._id,
      repGender,
      repDob,
      repContact,
      repEmail,
      repNin,
      district,
      county,
      subCounty,
      parish,
      village,
      comment
    });
    await newSalesRep.save();
    req.flash('success', 'Sales rep registered successfully');
    res.redirect('/salesRep');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to register sales rep');
    res.redirect('/salesRep');
  }
});

// GET: Show update form
router.get('/edit/:id', async (req, res) => {
    try {
        const salesRep = await SalesRepModel.findById(req.params.id).lean();
        if (!salesRep) {
            req.flash('error', 'Sales rep not found');
            return res.redirect('/salesrep/dashboard');
        }
        res.render('editSalesRep', { salesRep }); // Use dedicated edit form
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to load sales rep');
        res.redirect('/salesrep/dashboard');
    }
});

// POST: Handle update
router.post('/edit/:id', async (req, res) => {
    try {
        const { name, contact } = req.body;
        if (!name || !contact) {
            req.flash('error', 'All fields are required');
            return res.redirect(`/salesRep/edit/${req.params.id}`);
        }

        const salesRep = await SalesRepModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!salesRep) {
            req.flash('error', 'Sales rep not found');
            return res.redirect('/salesrep/dashboard');
        }
        req.flash('success', 'Sales rep updated successfully');
        res.redirect('/salesrep/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update sales rep');
        res.redirect('/salesrep/dashboard');
    }
});

module.exports = router;