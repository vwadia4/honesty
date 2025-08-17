// Ensure the user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect('/login');
}

// Ensure the user is a Farmer
function ensureFarmer(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'YoungFarmer') {
    return next();
  }
  res.status(403).send('Access denied. You must be a farmer.');
}

// Ensure the user is a Brood Manager
function ensureBroodManager(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'broodManager') {
    return next();
  }
  res.status(403).send('Access denied. You must be a brood manager.');
}

// Ensure the user is a Sales Representative
function ensureSalesRep(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === 'SalesRep') {
    return next();
  }
  res.status(403).send('Access denied. You must be a sales representative.');
}

module.exports = { ensureAuthenticated, ensureFarmer, ensureBroodManager, ensureSalesRep };


