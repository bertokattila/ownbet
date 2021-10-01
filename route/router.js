const path = require('path');
const loginMW = require('../middleware/auth/loginMW');
const authMW = require('../middleware/auth/authMW');
const authAdminMW = require('../middleware/auth/authAdminMW');
const getUpcomingMatchesMW = require('../middleware/match/getUpcomingMatches');
const authPageAccessMW = require('../middleware/auth/authPageAccessMW');
const logoutMW = require('../middleware/auth/logoutMW');

module.exports = (app, express) => {
	app.get('/admin', authMW(), authAdminMW(), authPageAccessMW(), (req, res) => {
		res.locals.navbarActivePage = 'admin';
		res.render('admin');
	});
	app.get('/upcoming', authMW(), authPageAccessMW(), (req, res) => {
		res.locals.navbarActivePage = 'upcoming';
		res.render('upcoming');
	});
	app.get('/results', authMW(), authPageAccessMW(), (req, res) => {
		res.locals.navbarActivePage = 'results';
		res.render('results');
	});
	app.get('/leaderboard', authMW(), authPageAccessMW(), (req, res) => {
		res.locals.navbarActivePage = 'leaderboard';
		res.render('leaderboard');
	});
	app.post('/login', loginMW());
	app.use('/logout', logoutMW());
	app.get('/', (req, res) => {
		res.render('index');
	});
};
