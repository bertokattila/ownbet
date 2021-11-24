const requireOption = require('../requireOption');
const ObjectId = require('mongoose').Types.ObjectId;
/**
 * Adds bet to the database
 */
module.exports = (repo) => {
	const Bet = requireOption(repo, 'bets');
	return (req, res, next) => {
		Bet.findOne(
			{
				_match: ObjectId(req.params.matchid),
				_user: ObjectId(res.locals.userid),
			},
			(err, bet) => {
				if (err) next(err);
				if (bet == null) {
					/// must create a new bet
					const newBet = new Bet({
						_match: ObjectId(req.params.matchid),
						_user: ObjectId(res.locals.userid),
						result: {
							homeScore: req.body.homeScore,
							awayScore: req.body.awayScore,
						},
					});
					newBet.save((error) => {
						if (error) next('Db error');
					});
				} else {
					bet.result.homeScore = req.body.homeScore;
					bet.result.awayScore = req.body.awayScore;
					bet.save((error) => {
						if (error) next('Db error');
					});
				}
			}
		);

		res.redirect('/upcoming');
	};
};
