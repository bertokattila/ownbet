const loginMW = require('../middleware/auth/loginMW');
const logoutMW = require('../middleware/auth/logoutMW');
const authMW = require('../middleware/auth/authMW');
const authAdminMW = require('../middleware/auth/authAdminMW');
const authPageAccessMW = require('../middleware/auth/authPageAccessMW');

const addBetMW = require('../middleware/bet/addBetMW');
const checkBetMW = require('../middleware/bet/addBetMW');
const getLeaderboardMW = require('../middleware/leaderboard/getLeaderboardMW');

const checkMatchStartedMW = require('../middleware/match/checkMatchStartedMW');
const deleteMatchMW = require('../middleware/match/deleteMatchMW');
const getAllMatchesMW = require('../middleware/match/getAllMatchesMW');
const getMatchResultsMW = require('../middleware/match/getMatchResultsMW');
const getUpcomingMatchesMW = require('../middleware/match/getUpcomingMatchesMW');
const newMatchMW = require('../middleware/match/newMatchMW');
const setMatchResultMW = require('../middleware/match/setMatchResultMW');
const getBetsOnMatchesMW = require('../middleware/bet/getBetsOnMatchesMW');
const calculatePointsMW = require('../middleware/bet/calculatePointsMW');

module.exports = (app, express) => {
	/**
	 * Renders the admin page if logged in as admin
	 */
	app.get(
		'/admin',
		authMW(),
		authAdminMW(),
		authPageAccessMW(),
		getAllMatchesMW(),
		(req, res) => {
			res.locals.navbarActivePage = 'admin';
			res.render('admin');
		}
	);

	/**
	 * Admin can add new match to the db
	 */
	app.post('/admin/newmatch', authAdminMW(), newMatchMW());

	/**
	 * Sets the result of the match given by its id
	 */
	app.post(
		'/admin/:matchid/setresult',
		authAdminMW(),
		checkMatchStartedMW(),
		setMatchResultMW()
	);

	/**
	 * Removes the match from the db
	 */
	app.post('/admin/:matchid/delete', authAdminMW(), deleteMatchMW());

	/**
	 * Renders the list of the upcoming matches
	 */
	app.get(
		'/upcoming',
		authMW(),
		authPageAccessMW(),
		getUpcomingMatchesMW(),
		(req, res) => {
			res.locals.navbarActivePage = 'upcoming';
			res.render('upcoming');
		}
	);

	/**
	 * Adds a new bet on the given match for the logged in user
	 */
	app.post(
		'/upcoming/:matchid/makebet',
		authMW(),
		checkMatchStartedMW(),
		checkBetMW(),
		addBetMW()
	);

	/**
	 * Renders the matches which already have results administered
	 * Along with the matches it shows the logged in user's tip and earned points
	 */
	app.get(
		'/results',
		authMW(),
		authPageAccessMW(),
		getMatchResultsMW(),
		getBetsOnMatchesMW(),
		calculatePointsMW(),
		(req, res) => {
			res.locals.navbarActivePage = 'results';
			res.render('results');
		}
	);

	/**
	 * Renders the leaderboard
	 */
	app.get(
		'/leaderboard',
		authMW(),
		authPageAccessMW(),
		getLeaderboardMW(),
		(req, res) => {
			res.locals.navbarActivePage = 'leaderboard';
			res.render('leaderboard');
		}
	);

	/**
	 * Handles the login request
	 */
	app.post('/login', loginMW());

	/**
	 * Handles the logout request
	 */
	app.use('/logout', logoutMW());

	/**
	 * Renders the login page
	 */
	app.get('/', (req, res) => {
		res.render('index');
	});
};
