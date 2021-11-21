const requireOption = require('../requireOption');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Saves the given result of the match into db
 * If the match already has result administered, overrides it
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');

	return (req, res, next) => {
		console.log(req.params);
		console.log(req.body);
		if (typeof req.params.matchid == 'undefined')
			return next('parameter not given');
		if (
			Number.isNaN(parseInt(req.body.homeScore, 10)) ||
			Number.isNaN(parseInt(req.body.awayScore, 10)) ||
			parseInt(req.body.awayScore, 10) < 0 ||
			parseInt(req.body.homeScore, 10) < 0
		) {
			res.redirect('/admin');
			return next('Score must be a non-negative integer');
		}
		matches.findOne({ _id: ObjectId(req.params.matchid) }, (err, match) => {
			if (err) return next(err);

			match.result = {
				homeScore: parseInt(req.body.homeScore, 10),
				awayScore: parseInt(req.body.awayScore, 10),
			};
			match.save();
		});

		res.redirect('/admin');
		return next();
	};
};
