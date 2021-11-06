const db = require('../config/db');
const Schema = require('mongoose').Schema;

const Bet = db.model('Bet', {
	_match: {
		type: Schema.Types.ObjectId,
		ref: 'Match',
	},
	_user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	result: {
		homeScore: Number,
		awayScore: Number,
	},
	date: Date,
});

module.exports = Match;
