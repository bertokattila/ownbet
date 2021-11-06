const moment = require('moment');
/**
 * Sets the navbar's state and
 * renders the given view
 */
module.exports = (view) => {
	return function (req, res) {
		res.locals.navbarActivePage = view;
		res.render(view, { moment: moment });
	};
};
