const body = document.createElement("div");
body.style.backgroundColor = "#cacaca";
body.style.width = "15rem";
body.style.height = "5rem";
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "space-around";
body.style.fontFamily = "Arial";

// remove this (development purposes)
body.style.position = "absolute";
body.style.left = "50%";
body.style.top = "50%";

const text = document.createElement("p");
text.textContent = "I'm not a robot";

const image = document.createElement("img");
image.src = "https://i1.sndcdn.com/artworks-YUSh7sS3FMSdCFOl-mOk6Pg-t500x500.jpg";
image.style.width = "3rem";
image.style.height = "3rem";

const captchaBody = document.createElement("div");
captchaBody.style.display = "none";
captchaBody.style.width = "20rem";
captchaBody.style.height = "30rem";
captchaBody.style.position = "absolute";
captchaBody.style.backgroundColor = "#909090";
captchaBody.style.marginLeft = "11rem";
captchaBody.style.flexDirection = "column";

const titleContainer = document.createElement("div");
titleContainer.style.width = "100%";
titleContainer.style.height = "30%";
titleContainer.style.display = "flex";
titleContainer.style.flexDirection = "row";

const title = document.createElement("p");

const imageContainer = document.createElement("div");
imageContainer.style.width = "100%";
imageContainer.style.height = "70%";
imageContainer.style.display = "flex";
imageContainer.style.flexDirection = "row";
imageContainer.style.flexWrap = "wrap";

const button = document.createElement("button");
button.style.width = "2rem";
button.style.height = "2rem";

button.addEventListener("click", () => {
	captchaBody.style.display == "none"
		? (captchaBody.style.display = "flex")
		: (captchaBody.style.display = "none");

	if (captchaBody.style.display == "none") {
		return;
	}

	const indicators = ["felix_argyle", "hololive"];
	let images = [];

	const indicator = indicators[Math.floor(Math.random() * indicators.length)];

	for (let i = 0; i < 9; i++) {
		fetch(`https://femboyfinder.firestreaker2.gq/api/${indicator}`)
			.then((response) => response.json())
			.then((data) => {
				images.push(data.URL);
				console.log(data.URL);

				const image = document.createElement("img");
				image.style.width = "100%";
				image.style.height = "auto";
				image.src = data.URL;

				const container = document.createElement("a");
				container.style.overflow = "hidden";
				container.style.display = "flex";
				container.style.width = "6rem";
				container.style.height = "6rem";
				container.appendChild(image);

				imageContainer.appendChild(container);
			})
			.catch((error) => {
				captchaBody.style.display = "none";
				console.error(`[ERROR] ${error}`);
			});
	}
});

titleContainer.appendChild(title);
captchaBody.appendChild(titleContainer);
captchaBody.appendChild(imageContainer);
body.appendChild(button);
body.appendChild(text);
body.appendChild(image);
body.appendChild(captchaBody);

document.body.appendChild(body);
