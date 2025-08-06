const express = require('express');
const router = express.Router();
const salesRep = require('../models/salesRepModel');

//GET: enters the registration form
router.get('/salesRep', (req, res) => {
    res.render('salesRepReg');
});
//POST: Save farmer data
router.post('/salesRep', async (req, res) => {
    try {
        console.log(req.body); // Debugging: view form data
        const newSales = new salesRep(req.body); 
        await newSales.save();
        res.redirect('/salesRep'); // redirect after saving
    } catch (error) {
        console.error(error);
        res.status(400).send('Failed to register farmers.')
    }
});
module.exports = router;