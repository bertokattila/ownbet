/**
 * Like AuthMW, but this mw calls next even if the logged in user is not admin
 * The purpose of this mw is to help render different navbar for admin and not admin users
 */
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
