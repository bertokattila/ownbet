const requireOption = require('../requireOption');
/**
 * Removes the given match from the database
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');
	return (req, res, next) => {
		if (typeof req.params.matchid === 'undefined')
			return next('parameter not given');
		matches.deleteOne({ id: req.params.matchid }, (err) => {
			return next(err);
		});
		res.redirect('/admin');
		return next();
	};
};
