const loginMW = require('../middleware/auth/loginMW');
const authMW = require('../middleware/auth/authMW');
const path = require('path');
module.exports = (app, express) => {
	app.use(express.static('public'));
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../static', 'index.html'));
	});

	app.get('/admin', (req, res) => {
		res.send('Admin');
	});

	app.get('/upcoming', authMW(), (req, res) => {
		res.sendFile(path.join(__dirname, '../static', 'upcoming.html'));
	});
	app.get('/results', authMW(), (req, res) => {
		res.sendFile(path.join(__dirname, '../static', 'results.html'));
	});
	app.get('/leaderboard', authMW(), (req, res) => {
		res.sendFile(path.join(__dirname, '../static', 'leaderboard.html'));
	});

	app.post('/login', loginMW());
};
