module.exports = () => {
	return (req, res, next) => {
		if (
			typeof req.session.isAdmin === 'undefined' ||
			req.session.isAdmin !== true
		) {
			res.locals.isAdmin = false;
			return next();
		}
		res.locals.isAdmin = true;
		return next();
	};
};
