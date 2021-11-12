const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('static')); /// for css files

app.set('view engine', 'ejs');

app.use(
	session({
		secret: 'mert nyomni, nyomni kell',
	})
);

app.use((err, req, res, next) => {
	res.end('Problem...');
	console.log(err);
});

require('./route/router')(app, express);

const matches = require('./mockDatabase/matches');

//console.log(matches[0].date);

/*var datetime = new Date();
console.log(datetime);
console.log(datetime.toDateString());
console.log(datetime.toTimeString());
*/
const init = () => {
	const db = require('./config/db');
	const User = require('./models/user');
	User.findOne({}, (err, user) => {
		/// at first start creating sample users
		if (user === null) {
			const admin = new User({
				username: 'admin',
				password: 'admin',
				type: 'Admin',
			});

			admin.save((err) => {
				//console.log(err);
			});

			const sampleUser = new User({
				username: 'user',
				password: 'user',
				type: 'User',
			});

			admin.save((err) => {
				//console.log(err);
			});

			sampleUser.save((err) => {
				//console.log(err);
			});
		}
	});
};
init();

app.listen(3000, function () {
	console.log('Hello :3000');
});
