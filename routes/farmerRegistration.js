const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Fixed model name

// GET: Display registration form
router.get('/farmers-reg', (req, res) => {
    res.render('signUp'); // Use dedicated registration form
});

// POST: Save farmer data
router.post('/farmers-reg', async (req, res) => {
  console.log(req.body);
  try {
    // const { fullName, gender, phoneNumber, email, nin, recommenderName, recommenderNin, farmerDob, farmerNin } = req.body;
    // if (!fullName || !gender || !phoneNumber || !email || !nin || !recommenderName || !recommenderNin || !farmerDob || !farmerNin) {
    //   req.flash('error', 'All fields are required');
    //   return res.redirect('/farmersReg');
    // }
    const newUser = new User(req.body);
    console.log('new User created'+ newUser)
    await User.register(newUser, req.body.password);
    req.flash('success', 'Farmer registered successfully');
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'Failed to register farmer');
    res.redirect('/farmers-reg');
  }
});

// GET: Show update form
router.get('/edit/:id', async (req, res) => {
    try {
        const farmer = await FarmerModel.findById(req.params.id).lean();
        if (!farmer) {
            req.flash('error', 'Farmer not found');
            return res.redirect('/farmer/dashboard');
        }
        res.render('editFarmer', { farmer });
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to load farmer');
        res.redirect('/farmer/dashboard');
    }
});

// POST: Handle update
router.post('/edit/:id', async (req, res) => {
    try {
        const { name, location, contact } = req.body;
        if (!name || !location || !contact) {
            req.flash('error', 'All fields are required');
            return res.redirect(`/farmersReg/edit/${req.params.id}`);
        }

        const farmer = await FarmerModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!farmer) {
            req.flash('error', 'Farmer not found');
            return res.redirect('/farmer/dashboard');
        }
        req.flash('success', 'Farmer updated successfully');
        res.redirect('/farmer/dashboard');
    } catch (error) {
        console.error(error);
        req.flash('error', 'Failed to update farmer');
        res.redirect('/farmer/dashboard');
    }
});

module.exports = router;