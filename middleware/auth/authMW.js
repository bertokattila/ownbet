/**
 * Checks if user is logged in
 * Regardless of its type (can be admin or not)
 * If user is logged in calls the next mw in the chain,
 * otherwise redirects to the login page
 */
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
