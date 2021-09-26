module.exports = () => {
	return (req, res, next) => {
		if (
			typeof req.session.loggedIn === 'undefined' ||
			req.session.loggedIn !== true
		) {
			return res.redirect('/');
		}
		res.locals.username = req.session.username;
		return next();
	};
};
