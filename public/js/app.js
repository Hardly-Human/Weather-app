console.log("Client side javascript file is loaded!");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
// 	response.json().then((data) => {
// 		console.log(data);
// 	});
// });

// fetch("http://127.0.0.1:3000/weather?address=goa").then((response) => {
// 	response.json().then((data) => {
// 		if (!data.error) {
// 			console.log(data.location);
// 			console.log(data.forecast);
// 		} else {
// 			console.log(data.error);
// 		}
// 	});
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const location = search.value;
	url = "/weather?address=" + encodeURIComponent(location);

	messageOne.textContent = "Loading....";
	messageTwo.textContent = "";

	fetch(url).then((response) => {
		response.json().then((data) => {
			if (!data.error) {
				messageOne.textContent = data.location;
				messageTwo.textContent = data.forecast;
			} else {
				messageOne.textContent = data.error;
			}
		});
	});
});
