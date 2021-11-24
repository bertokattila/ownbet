const requireOption = require('../requireOption');
const ObjectId = require('mongoose').Types.ObjectId;
/**
 * Gets the loggged in users's bets for every match in a given array of matches
 * The given match array should be prepared by an other mw
 */
module.exports = (repo) => {
	const bets = requireOption(repo, 'bets');
	return (req, res, next) => {
		if (typeof res.locals.matches !== 'undefined') {
			const promises = [];
			for (const match of res.locals.matches) {
				const promise = new Promise((resolve, reject) => {
					bets.findOne(
						{
							_match: ObjectId(match.id),
							_user: ObjectId(res.locals.userid),
						},
						(err, bet) => {
							if (err) next(error);
							if (bet != null) {
								match.betHome = bet.result.homeScore;
								match.betAway = bet.result.awayScore;
							}
							resolve();
						}
					);
				});
				promises.push(promise);
			}
			Promise.all(promises).then(() => {
				return next();
			});
		}
	};
};
