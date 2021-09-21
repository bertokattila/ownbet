const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

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

app.listen(3000, function () {
	console.log('Hello :3000');
});
