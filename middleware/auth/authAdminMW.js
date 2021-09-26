module.exports = () => {
	return (req, res, next) => {
		if (
			typeof req.session.isAdmin === 'undefined' ||
			req.session.isAdmin !== true
		) {
			return res.redirect('/');
		}
		return next();
	};
};
