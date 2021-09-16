const express = require("express");

const app = express();
const session = require("express-session");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("static"));

app.use(
	session({
		secret: "secret",
	})
);

app.use((err, req, res, next) => {
	res.end("Problem...");
	console.log(err);
});

//require("./route/router")(app);

app.listen(3000, function () {
	console.log("Hello :3000");
});
