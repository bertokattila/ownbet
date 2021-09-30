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

		/// fake password check until mongodb is not implemented
		if (req.body.username === 'admin' && req.body.password == 'admin') {
			req.session.isAdmin = true;
			req.session.loggedIn = true;
			req.session.username = req.body.username;
			res.redirect('/admin');
			return;
		}
		if (req.body.username === 'user' && req.body.password == 'user') {
			req.session.isAdmin = false;
			req.session.loggedIn = true;
			req.session.username = req.body.username;
			res.redirect('/upcoming');
			return;
		}
		res.redirect('/');
	};
};
