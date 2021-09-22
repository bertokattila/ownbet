const session = require('express-session');

/**
 * Handles the login request
 */
module.exports = () => {
	return (req, res, next) => {
		console.log(req.body);
		if (
			typeof req.body.username === 'undefined' ||
			typeof req.body.password === 'undefined'
		) {
			res.send('error');
			return next();
		}

		if (req.body.username === 'admin' && req.body.password == 'admin') {
			req.session.authorized = true;
			req.session.username = req.body.username;
			res.redirect('/admin');
		}
		if (req.body.username === 'user' && req.body.password == 'user') {
			req.session.loggedIn = true;
			req.session.username = req.body.username;
			res.redirect('/upcoming');
		}
	};
};
