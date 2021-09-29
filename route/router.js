const path = require('path');
const loginMW = require('../middleware/auth/loginMW');
const authMW = require('../middleware/auth/authMW');
const testMW = require('../middleware/testMW');
const authAdminMW = require('../middleware/auth/authAdminMW');
const getUpcomingMatchesMW = require('../middleware/match/getUpcomingMatches');

module.exports = (app, express) => {
	app.get('/admin', authMW(), authAdminMW(), (req, res) => {
		res.render('admin');
	});
	app.get('/upcoming', authMW(), (req, res) => {
		res.render('upcoming');
	});
	app.get('/results', authMW(), (req, res) => {
		res.render('results');
	});
	app.get('/leaderboard', authMW(), (req, res) => {
		res.render('leaderboard');
	});
	app.post('/login', loginMW());
	app.get('/', testMW(), getUpcomingMatchesMW(), (req, res) => {
		res.render('index');
	});
};
