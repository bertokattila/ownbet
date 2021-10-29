const leaderboard = require('../../mockDatabase/leaderboard');
/**
 * Calculates the current state of the leaderboard
 * and puts it on res.locals
 */
module.exports = () => {
	return (req, res, next) => {
		res.locals.leaderboard = leaderboard;
		return next();
	};
};
