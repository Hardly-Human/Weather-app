const request = require("postman-request");

const forecast = (lat, long, callback) => {
	const url =
		"http://api.weatherstack.com/current?access_key=92c1bc3ef4fa37c3b51f2a61ee624808&query=" +
		lat +
		"," +
		long;
	request({ url, json: true }, (error, { body } = {}) => {
		console.log(error);
		if (error) {
			callback("Unable to connect to weather service!", undefined);
		} else if (body.error) {
			callback("Unable to find Loaction.", undefined);
		} else {
			callback(
				undefined,
				`${body.current.weather_descriptions[0]}. \
                 It is currently ${body.current.temperature} degrees out. \
                 It feels like ${body.current.feelslike} degrees out. \
                 The Humidity is ${body.current.humidity} and The Observation time is ${body.current.observation_time}.`
			);
		}
	});
};

// tests;
// forecast(17.37, 78.47, (error, data) => {
// 	console.log("Error : ", error);
// 	console.log("Data : ", data);
// });

module.exports = forecast;
