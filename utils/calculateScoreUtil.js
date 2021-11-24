module.exports = (betHome, betAway, matchHome, matchAway) => {
	if (
		/// perfect bet
		matchHome === betHome &&
		matchAway === betAway
	) {
		return 3;
	}
	if (
		/// 1 point bet
		(matchHome === matchAway && betHome === betAway) ||
		(matchHome > matchAway && betHome > betAway) ||
		(matchHome < matchAway && betHome < betAway)
	) {
		return 1;
	}
	return 0;
};
