const requireOption = require('../requireOption');
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require('moment');
/**
 * Checks if the given match has already started or not
 * Puts the result on res.locals
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');
	return (req, res, next) => {
		if (typeof req.params.matchid === 'undefined')
			return next('parameter not given');
		matches.findById(req.params.matchid, (err, match) => {
			if (err) return next(err);
			res.locals.matchStarted = moment().isAfter(match.date);
			return next();
		});
	};
};
