const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../utils/geocode.js");
const forecast = require("../utils/forecast.js");

const app = express();

const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(__filename);

// setting public dir for static files..................
const public_dir_path = path.join(__dirname, "../public");
app.use(express.static(public_dir_path));

// customizing views directory............
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// for serving dynamic content......
//  we use hbs=> handlebars.js package..
app.set("view engine", "hbs");

app.get("", (req, res) => {
	res.render("index", {
		name: "Shaik Rehan",
		page_name: "Index page",
		title: "Weather App",
	});
});

app.get("/about", (req, res) => {
	res.render("about", {
		name: "Shaik Rehan",
		page_name: "About",
		title: "About Page",
	});
});

app.get("/help", (req, res) => {
	res.render("help", {
		name: "Shaik Rehan",
		page_name: "Help",
		title: "Help Page",
	});
});

app.get("/weather", (req, res) => {
	if (!req.query.address) {
		return res.send({
			Error: "Please Provide an Address!!!",
		});
	}
	const address = req.query.address;
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({
				error,
			});
		}

		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({
					error,
				});
			}

			res.send({
				location,
				forecast: forecastData,
			});
		});
	});
});

app.get("/products", (req, res) => {
	if (!req.query.search) {
		return res.send({
			Error: "You must provide a search Term!!!",
		});
	}
	res.send({
		products: [],
	});
});

app.get("/help/*", (req, res) => {
	res.render("404", {
		name: "Shaik Rehan",
		title: "404",
		errorMessage: "Article Not Found!!!",
	});
});

// 404 requests
// * => It is used for all remaining urls..
// should be the last get statement
app.get("*", (req, res) => {
	res.render("404", {
		name: "Shaik Rehan",
		title: "404",
		errorMessage: "Page Not Found",
	});
});

// starting server...........................
app.listen(port, () => {
	console.log(`Server is at port ${port}.`);
});
