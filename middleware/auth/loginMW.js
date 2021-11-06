const session = require('express-session');
const requireOption = require('../requireOption');
/**
 * Handles the login request
 */
module.exports = (repo) => {
	const users = requireOption(repo, 'users');

	return (req, res, next) => {
		if (
			typeof req.body.username === 'undefined' ||
			typeof req.body.password === 'undefined'
		) {
			return next('Parameters not given');
		}

		users.findOne(
			{ username: req.body.username, password: req.body.password },
			function (err, user) {
				if (err) return next(err);
				if (user === null) {
					res.redirect('/');
					return; /// no match
				}
				req.session.loggedIn = true;
				req.session.username = req.body.username;
				req.session.isAdmin = user.type === 'Admin' ? true : false;

				if (req.session.isAdmin) res.redirect('/admin');
				else res.redirect('/upcoming');
			}
		);
	};
};
