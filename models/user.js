const db = require('../config/db');

const User = db.model('User', {
	username: String,
	password: String,
	type: {
		type: String,
		enum: ['Admin', 'User'],
	},
});

module.exports = User;
