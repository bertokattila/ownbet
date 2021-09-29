const matches = require('../../mockDatabase/matches');

module.exports = () => {
	return (req, res, next) => {
		res.locals.upcoming = matches.filter((match) => {
			//console.log(match.date + 'current1111111 ' + Date());
			//const currentDate = new Date(Date.parse(match.date));
			//currentDate.parse(match.date);
			//console.log(currentDate.getTime() + 'current ' + Date().getTime());
			return Date(match.date) > Date();
		});
		console.log(matches);
		//res.locals.valami = 'valami';
		return next();
	};
};
