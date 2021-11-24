const requireOption = require('../requireOption');
/**
 * Gets matches with administered result from the database
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');
	return (req, res, next) => {
		matches.find(
			{
				result: {
					$exists: true,
				},
			},
			(err, results) => {
				if (err) next(err);
				res.locals.matches = results;
				return next();
			}
		);
	};
};
