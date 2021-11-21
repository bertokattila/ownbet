const requireOption = require('../requireOption');
const moment = require('moment');
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Gets the upcoming matches from the db and them it on res.locals
 */
module.exports = (repo) => {
	const matches = requireOption(repo, 'matches');
	const bets = requireOption(repo, 'bets');
	return (req, res, next) => {
		matches.find(
			{
				date: {
					$gte: moment().toDate(),
				},
			},
			(err, arr) => {
				if (err) return next(err);
				arr2 = arr.map((match) => {
					bets.findOne(
						{
							// TODO
							_match: ObjectId(match.id),
							_user: ObjectId(res.locals.userid),
						},
						(error, bet) => {
							if (err) next(error);
							if (bet != null) {
								match.betHome = bet.result.homeScore;
								match.betAway = bet.result.awayScore;
							}
						}
					);
					console.log(match);
					return match;
				});
				res.locals.matches = arr2;
				console.log(arr2);
				return next();
			}
		);
	};
};
