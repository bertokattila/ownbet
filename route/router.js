module.exports = (app) => {
	app.get("/", (req, res) => {
		res.send("Hello");
	});
	app.get("/admin", (req, res) => {
		res.send("Admin");
	});
	app.get("/upcoming", (req, res) => {
		res.send("Upcoming");
	});
};
