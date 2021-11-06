const requireOption = require('../requireOption');
/**
 * Gets all matches from the database
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');
	return (req, res, next) => {
		matches.find({}, (err, arr) => {
			if (err) return next(err);
			res.locals.matches = arr;
			return next();
		});
	};
};
