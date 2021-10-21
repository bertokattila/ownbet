/**
 * Adds new match to the db
 */
module.exports = () => {
	return (req, res, next) => {
		if (
			typeof req.homeTeam === 'undefined' ||
			typeof req.awayTeam === 'undefined' ||
			typeof req.date === 'undefined'
		) {
			res.redirect('/error/?type=newmatcherror');
		}
		return next();
	};
};
