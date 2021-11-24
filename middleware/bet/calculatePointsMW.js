const calculateScoreUtil = require('../../utils/calculateScoreUtil');
/**
 * Calculates the points for every item in a matches and bets array
 * The array should be prepared by an other mw
 */
module.exports = () => {
	return (req, res, next) => {
		if (typeof res.locals.matches === 'undefined') return next();
		for (const match of res.locals.matches) {
			if (
				typeof match.betHome === 'undefined' ||
				typeof match.betAway === 'undefined'
			) {
				match.score = 0;
				continue;
			}
			match.score = calculateScoreUtil(
				match.betHome,
				match.betAway,
				match.result.homeScore,
				match.result.awayScore
			);
		}

		return next();
	};
};
