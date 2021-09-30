const path = require('path');
const loginMW = require('../middleware/auth/loginMW');
const authMW = require('../middleware/auth/authMW');
const authAdminMW = require('../middleware/auth/authAdminMW');
const getUpcomingMatchesMW = require('../middleware/match/getUpcomingMatches');

module.exports = (app, express) => {
	app.get('/admin', authMW(), authAdminMW(), (req, res) => {
		res.locals.navbarActivePage = 'admin';
		res.render('admin');
	});
	app.get('/upcoming', authMW(), authAdminMW(), (req, res) => {
		res.locals.navbarActivePage = 'upcoming';
		res.render('upcoming');
	});
	app.get('/results', authMW(), authAdminMW(), (req, res) => {
		res.locals.navbarActivePage = 'results';
		res.render('results');
	});
	app.get('/leaderboard', authMW(), authAdminMW(), (req, res) => {
		res.locals.navbarActivePage = 'leaderboard';
		res.render('leaderboard');
	});
	app.post('/login', loginMW());
	app.get('/', (req, res) => {
		res.render('index');
	});
};
