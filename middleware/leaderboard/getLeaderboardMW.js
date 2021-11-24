const requireOption = require('../requireOption');
const ObjectId = require('mongoose').Types.ObjectId;
const calculateScoreUtil = require('../../utils/calculateScoreUtil');
/**
 * Calculates the current state of the leaderboard
 * and puts it on res.locals
 */
module.exports = (repo) => {
	const bets = requireOption(repo, 'bets');
	return (req, res, next) => {
		if (typeof res.locals.users === 'undefined')
			return next('There are no users');
		const promises = [];
		res.locals.leaderboard = [];
		for (const user of res.locals.users) {
			const promise = new Promise((resolve, reject) => {
				bets
					.find({
						_user: ObjectId(user.id),
					})
					.populate('_match')
					.exec((error, userBets) => {
						if (error) next(error);
						userBets = userBets.filter((bet) => {
							/// filter out the matches without result administered
							return typeof bet._match.result.homeScore !== 'undefined';
						});

						let sumScore = 0;
						for (const bet of userBets) {
							sumScore += calculateScoreUtil(
								bet.result.homeScore,
								bet.result.awayScore,
								bet._match.result.homeScore,
								bet._match.result.awayScore
							);
						}
						res.locals.leaderboard.push({
							rank: NaN,
							name: user.username,
							score: sumScore,
						});
						resolve();
					});
			});
			promises.push(promise);
		}
		Promise.all(promises).then(() => {
			next();
		});
	};
};
