// 1. DEPENDENCIES
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require("moment");
const flash = require('connect-flash');
const expressSession = require("express-session")({
  secret: "raven-me",
  resave: false,
  saveUninitialized: false,
});
require('dotenv').config();

//IMPORT ROUTES

const salesRep = require('./routes/salesRepRouter');
const feeds = require('./routes/feedsRoute');
const chickRequest = require('./routes/chickRequestRoute');
const exportRoutes = require('./routes/exportRoutes'); 
const authRoutes = require('./routes/authRoutes');
const farmersReg = require('./routes/farmerRegistration');
const farmerDashboard = require('./routes/farmerDashboardRoute');
const broodManagerDashboardRoute = require('./routes/broodManagerDashboardRoute');
const salesRepDashboardRoute = require('./routes/salesRepDashboardRoute');


//Import user model(for the logins)
const User = require('./models/User')
//const signUpModel = require('./models/signUpModel'); ***

// 2. INSTANTIATIONS
const app = express();
const port = 3004;

//3: Young for Chicks Configuration Settings
app.locals.moment = moment;
mongoose.connect(process.env.DATABASE);
mongoose.connection
  .once("open", () => {
    console.log(`Secure Connection has been established for Mongoose`);
  })
  .on("error", (error) => {
    console.error(error.message);
  });
// 3. CONFIGURATION
app.use(express.static(path.join(__dirname, 'public'))); //testing
app.set('view engine', 'pug'); //setting Pug as the view engine
app.set('views', path.join(__dirname, 'views')); // specify a folder containing frontend files

// 4. MIDDLEWARE
//app.use(methodOverride('_method')) //testing
app.use(express.urlencoded({ extended: false })); //picks data from the form
app.use(express.static(path.join(__dirname, 'public')));

//Express Session Configurations
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// Configure connect-flash middleware
app.use(flash());
// Make flash messages available to all templates (optional but good practice)
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  res.locals.error = req.flash('error'); // Common for passport, etc.
  next();
});

//Passport Configurations
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 5. USE IMPORTED ROUTES
app.use('/', salesRep);
app.use('/', feeds);
app.use('/', chickRequest);
app.use('/', exportRoutes);
app.use('/', farmersReg);
app.use('/', authRoutes);
app.use('/', farmerDashboard);
app.use('/', broodManagerDashboardRoute);
app.use('/', salesRepDashboardRoute);

app.use('/export', require('./routes/exportRoutes'));


//HANDLE NON-EXISTING ROUTES
app.use((req, res) => {
  res.status(404).send('Sorry! Route not found');
});

// 6. BOOTSTRAPPING SERVER(Start the server)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
