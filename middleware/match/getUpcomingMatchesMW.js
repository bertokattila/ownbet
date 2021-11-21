const requireOption = require('../requireOption');
const moment = require('moment');

/**
 * Gets the upcoming matches from the db and them it on res.locals
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');
	return (req, res, next) => {
		matches.find(
			{
				date: {
					$gte: moment().toDate(),
				},
			},
			(err, arr) => {
				if (err) return next(err);
				res.locals.matches = arr;
				return next();
			}
		);
	};
};
