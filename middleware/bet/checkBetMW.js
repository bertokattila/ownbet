/**
 * Checks whether the given bets parameters are valid
 * and if match has not yet started calls next
 */
module.exports = () => {
	return (req, res, next) => {
		if (typeof res.locals.matchStarted === 'undefined') {
			res.redirect('/upcoming');
			return next('Match has not been checked');
		}
		if (
			typeof req.body.homeScore === 'undefined' ||
			typeof req.body.awayScore === 'undefined' ||
			res.locals.matchStarted ||
			Number.isNaN(parseInt(req.body.homeScore, 10)) ||
			Number.isNaN(parseInt(req.body.awayScore, 10)) ||
			parseInt(req.body.awayScore, 10) < 0 ||
			parseInt(req.body.homeScore, 10) < 0
		) {
			res.redirect('/upcoming');
			return next('Invalid parameters');
		}
		return next();
	};
};
