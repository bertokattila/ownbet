const requireOption = require('../requireOption');

/**
 * Saves the given result of the match into db
 * If the match already has result administered, overrides it
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');

	return (req, res, next) => {
		if (typeof req.params.matchid == 'undefined')
			return next('parameter not given');
		matches.findOne({ id: req.params.matchid }, (err, match) => {
			if (err) return next(err);
			console.log(match);
			match.result = {
				homeScore: req.body.homeScore,
				awayScore: req.body.awayScore,
			};
			match.save();
		});

		res.redirect('/admin');
		return next();
	};
};
