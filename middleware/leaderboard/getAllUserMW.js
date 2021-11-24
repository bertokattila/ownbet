const requireOption = require('../requireOption');
/**
 * Calculates the current state of the leaderboard
 * and puts it on res.locals
 */
module.exports = (repo) => {
	const users = requireOption(repo, 'users');
	return (req, res, next) => {
		users.find({}, (err, users) => {
			if (err) next(err);
			res.locals.users = users;
			return next();
		});
	};
};
