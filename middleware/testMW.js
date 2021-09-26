module.exports = () => {
	return (req, res, next) => {
		res.locals.valami = 'valami';
		return next();
	};
};
