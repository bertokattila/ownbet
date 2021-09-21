module.exports = () => {
	return (req, res, next) => {
		if (
			typeof req.session.loggedIn === 'undefined' ||
			req.session.loggedIn !== true
		) {
			return res.redirect('/');
		}
		return next();
	};
};
