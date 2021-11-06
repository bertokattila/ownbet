const db = require('../config/db');

const Match = db.model('Match', {
	homeTeam: String,
	awayTeam: String,
	result: {
		homeScore: Number,
		awayScore: Number,
	},
	date: Date,
});

module.exports = Match;
