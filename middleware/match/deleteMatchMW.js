const requireOption = require('../requireOption');
const ObjectId = require('mongoose').Types.ObjectId;
/**
 * Removes the given match from the database
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');
	const bets = requireOption(repo, 'bets');
	return (req, res, next) => {
		if (typeof req.params.matchid === 'undefined')
			return next('parameter not given');
		bets.deleteMany({ _match: ObjectId(req.params.matchid) }, (err) => {
			return next(err);
		});
		matches.deleteOne({ _id: ObjectId(req.params.matchid) }, (err) => {
			return next(err);
		});

		res.redirect('/admin');
		return next();
	};
};
