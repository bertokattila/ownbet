const requireOption = require('../requireOption');
const ObjectId = require('mongoose').Types.ObjectId;
const calculateScoreUtil = require('../../utils/calculateScoreUtil');
/**
 * Calculates the current state of the leaderboard
 * and puts it on res.locals
 */
module.exports = () => {
	return (req, res, next) => {
		res.locals.leaderboard.sort((a, b) => {
			if (b.score > a.score) {
				return 1;
			}
			return -1;
		});
		let rankCounter = 1;
		res.locals.leaderboard[0].rank = rankCounter;
		for (let i = 1; i < res.locals.leaderboard.length; i++) {
			if (res.locals.leaderboard[i].score < res.locals.leaderboard[i - 1].score)
				rankCounter++;
			res.locals.leaderboard[i].rank = rankCounter;
		}
		return next();
	};
};
