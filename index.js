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
image.src =
	"https://i1.sndcdn.com/artworks-YUSh7sS3FMSdCFOl-mOk6Pg-t500x500.jpg";
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

const titleText = document.createElement("p");

const imageContainer = document.createElement("div");
imageContainer.style.width = "100%";
imageContainer.style.height = "70%";
imageContainer.style.display = "flex";
imageContainer.style.flexDirection = "row";
imageContainer.style.flexWrap = "wrap";

const button = document.createElement("button");
button.style.width = "2rem";
button.style.height = "2rem";

const append = (url) => {
	const image = document.createElement("img");
	image.style.width = "100%";
	image.style.height = "auto";
	image.src = url;

	const container = document.createElement("a");
	container.style.overflow = "hidden";
	container.style.display = "flex";
	container.style.width = "6rem";
	container.style.height = "6rem";
	container.appendChild(image);

	imageContainer.appendChild(container);
};

button.addEventListener("click", () => {
	captchaBody.style.display == "none"
		? (captchaBody.style.display = "flex")
		: (captchaBody.style.display = "none");

	if (captchaBody.style.display == "none") {
		imageContainer.innerHTML = "";
		return;
	}

	const indicators = ["felix_argyle", "hoshino_ruby", "hoshino_ai"];
	let images = [];

	const primaryIndicator =
		indicators[Math.floor(Math.random() * indicators.length)];
	let secondaryIndicator =
		indicators[Math.floor(Math.random() * indicators.length)];

	while (secondaryIndicator == primaryIndicator) {
		secondaryIndicator =
			indicators[Math.floor(Math.random() * indicators.length)];
	}

	title = primaryIndicator.replace("_", " ");
	titleText.textContent = `Click all images containing ${title}.`;

	const amount = Math.floor(Math.random() * 9);

	for (let i = 0; i < amount; i++) {
		fetch(`https://femboyfinder.firestreaker2.gq/api/${primaryIndicator}`)
			.then((response) => response.json())
			.then((data) => {
				images.push(data.URL);
				append(data.URL);
			})
			.catch((error) => {
				captchaBody.style.display = "none";
				console.error(`[ERROR] ${error}`);
			});
	}

	for (let i = 0; i < 9 - amount; i++) {
		fetch(`https://femboyfinder.firestreaker2.gq/api/${secondaryIndicator}`)
			.then((response) => response.json())
			.then((data) => {
				images.push(data.URL);
				append(data.URL);
			})
			.catch((error) => {
				captchaBody.style.display = "none";
				console.error(`[ERROR] ${error}`);
			});
	}
});

titleContainer.appendChild(titleText);
captchaBody.appendChild(titleContainer);
captchaBody.appendChild(imageContainer);
body.appendChild(button);
body.appendChild(text);
body.appendChild(image);
body.appendChild(captchaBody);

document.body.appendChild(body);
