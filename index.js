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
app.listen(3000, function () {
	console.log('Hello :3000');
});
