/**
 * Handles the logout request
 */
module.exports = function () {
	return function (req, res, next) {
		req.session.destroy((err) => {
			res.redirect('/');
		});
	};
};
