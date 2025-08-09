// Ensure user is authenticated
exports.ensureAuthenticated = function (req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.redirect("/login");
};

// Ensure user is a farmer
exports.ensureFarmer = function (req, res, next) {
    if (req.session.user && req.session.user.role === 'Farmer') {
        return next();
    }
    res.redirect("/login");
};

function ensureAuthenticated(req, res, next) {  //testing
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

function isBroodManager(req, res, next) {
  if (req.user && req.user.role === 'brood-manager') return next();
  res.status(403).send('Access Denied');
}

module.exports = { ensureAuthenticated, isBroodManager };
