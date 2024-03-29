const loginMW = require('../middleware/auth/loginMW');
const logoutMW = require('../middleware/auth/logoutMW');
const authMW = require('../middleware/auth/authMW');
const authAdminMW = require('../middleware/auth/authAdminMW');
const authPageAccessMW = require('../middleware/auth/authPageAccessMW');

const addBetMW = require('../middleware/bet/addBetMW');
const checkBetMW = require('../middleware/bet/checkBetMW');
const getAllUserMW = require('../middleware/leaderboard/getAllUserMW');
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
const renderMW = require('../middleware/renderMW');

const MatchModel = require('../models/match');
const UserModel = require('../models/user');
const BetModel = require('../models/bet');
const sortLeaderboardMW = require('../middleware/leaderboard/sortLeaderboardMW');

module.exports = (app) => {
	const repo = {
		matches: MatchModel,
		users: UserModel,
		bets: BetModel,
	};

	/**
	 * Renders the admin page if logged in as admin
	 */
	app.get(
		'/admin',
		authMW(),
		authAdminMW(),
		authPageAccessMW(),
		getAllMatchesMW(repo),
		renderMW('admin')
	);

	/**
	 * Admin can add new match to the db
	 */
	app.post('/admin/newmatch', authAdminMW(), newMatchMW(repo));

	/**
	 * Sets the result of the match given by its id
	 */
	app.post(
		'/admin/:matchid/setresult',
		authAdminMW(),
		checkMatchStartedMW(repo),
		setMatchResultMW(repo)
	);

	/**
	 * Removes the match from the db
	 */
	app.post('/admin/:matchid/delete', authAdminMW(), deleteMatchMW(repo));

	/**
	 * Renders the list of the upcoming matches
	 */
	app.get(
		'/upcoming',
		authMW(),
		authPageAccessMW(),
		getUpcomingMatchesMW(repo),
		renderMW('upcoming')
	);

	/**
	 * Adds a new bet on the given match for the logged in user
	 */
	app.post(
		'/upcoming/:matchid/makebet',
		authMW(),
		checkMatchStartedMW(repo),
		checkBetMW(),
		addBetMW(repo)
	);

	/**
	 * Renders the matches which already have results administered
	 * Along with the matches it shows the logged in user's tip and earned points
	 */
	app.get(
		'/results',
		authMW(),
		authPageAccessMW(),
		getMatchResultsMW(repo),
		getBetsOnMatchesMW(repo),
		calculatePointsMW(),
		renderMW('results')
	);

	/**
	 * Renders the leaderboard
	 */
	app.get(
		'/leaderboard',
		authMW(),
		authPageAccessMW(),
		getAllUserMW(repo),
		getLeaderboardMW(repo),
		sortLeaderboardMW(),
		renderMW('leaderboard')
	);

	/**
	 * Handles the login request
	 */
	app.post('/login', loginMW(repo));

	/**
	 * Handles the logout request
	 */
	app.use('/logout', logoutMW());

	/**
	 * Renders the login page
	 */
	app.get('/', renderMW('index'));

	/**
	 * Called when error occurs in a middleware
	 */
	app.use((err, req, res, next) => {
		res.end('Gebasz van');
		console.log(err);
	});
};
