const express = require("express");
const router = express.Router();

const passport = require("passport");
const signUpModel = require("..//models/signUpModel");

router.get("/signup", (req, res) => {
  res.render("signUp");
});
router.post("/signup", async (req, res) => {
  try {
    const user = new signUpModel(req.body);
    let existingUser = await signUpModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).send("Email already Exists.");
    } else {
      await signUpModel.register(user, req.body.password, (err) => {  //create the hash & salt in DB
        if (err) {
          throw err;
        }
        res.redirect("/login");
      });
    }
  } catch (error) {
    res.status(400).send("Sorry You were unable to signup");
  }
});

//Login Route
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    req.session.user = req.user;
    if (req.user.role == 'Farmer') {
      res.send("This is the farmers dash board")
    } else if (req.user.role == 'Agent') {
      res.send("This is the Sale agent dash board")
    } else if (req.user.role == 'Broodermanager') {
      res.send("This is the Brooder Manager dash board")
    } else {
      res.send('You do not have a role in the System')
    }
  });

//logout button
router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy((error) => {
      if (error) {
        return res.status(500).send('error logging out')
      }
    })
  }
})

module.exports = router;