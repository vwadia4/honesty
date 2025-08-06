const express = require('express');
const router = express.Router();
const feeds = require('../models/feedsModel');

// GET: Display feeds form 
router.get('/feeds', async (req, res) => {
  res.render('feeds');
});

//POST: Save Feeds data
router.post('/feeds', async(req, res) => {
  try {
    console.log(req.body);  //Debugging view form
    const newFeeds = new feeds(req.body);
    await newFeeds.save();
    res.redirect('/feeds'); //Redirects after saving
  } catch (error) {
      console.error(error);
      res.status(400).send('Failure to request feeds')
  }
});
module.exports = router;