const express = require('express');
const router = express.Router();
const farmer = require("../models/farmerModel");

//GET: enters the registration form
router.get('/farmerReg', (req, res) => {
    res.render("farmerRegs");
});

//POST: Save farmer data
router.post('/farmerReg', async(req, res) => {
    try {
        console.log(req.body); // Debugging: view form data
        const newFarmer = new farmer(req.body); 
        await newFarmer.save();
        res.redirect('/farmerReg'); // redirect after saving
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to register farmers.')
    }
});

// Show update form
router.get('/edit/:id', async (req, res) => {
  const farmer = await Farmer.findById(req.params.id);
  res.render('editFarmer', { farmer });
});

// Handle update
router.post('/edit/:id', async (req, res) => {
  await Farmer.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/farmers/dashboard');
});

module.exports = router;