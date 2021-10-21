/**
 * Checks if an admin is logged in
 * If admin is logged in calls the next mw in the chain,
 * otherwise redirects to the login page
 */
module.exports = () => {
	return (req, res, next) => {
		if (
			typeof req.session.isAdmin === 'undefined' ||
			req.session.isAdmin !== true
		) {
			return res.redirect('/');
		}
		res.locals.isAdmin = true;
		return next();
	};
};
