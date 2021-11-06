const requireOption = require('../requireOption');

/**
 * Adds new match to the db
 */
module.exports = (repo) => {
	const MatchModel = requireOption(repo, 'matches');
	return (req, res, next) => {
		if (
			typeof req.body.homeTeam === 'undefined' ||
			typeof req.body.awayTeam === 'undefined' ||
			typeof req.body.date === 'undefined'
		) {
			return next('parameters not provided');
		}
		const match = new MatchModel({
			homeTeam: req.body.homeTeam,
			awayTeam: req.body.awayTeam,
			date: req.body.date,
		});
		match.save((err) => {
			return next(err);
		});
		res.redirect('/admin');
		return next();
	};
};
