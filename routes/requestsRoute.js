const express = require('express');
const router = express.Router();
const Request = require('..//models/requestsModel');

// GET: Form page
router.get('/request', (req, res) => {
  res.render('requests'); // render your Pug view
});

// POST: Save form submission
router.post('/request', async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.redirect('/request');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error saving chick request');
  }
});

module.exports = router;
