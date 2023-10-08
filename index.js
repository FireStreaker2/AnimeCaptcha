class AnimeCaptcha {
	constructor() {
		this.finished = false;
		this.selected = [];
		this.correctImages = [];

		this.body = document.createElement("div");
		this.body.style.backgroundColor = "#cacaca";
		this.body.style.width = "15rem";
		this.body.style.height = "5rem";
		this.body.style.display = "flex";
		this.body.style.alignItems = "center";
		this.body.style.justifyContent = "space-around";
		this.body.style.fontFamily = "Arial";

		this.text = document.createElement("p");
		this.text.textContent = "I'm not a robot";

		this.image = document.createElement("img");
		this.image.src =
			"https://i1.sndcdn.com/artworks-YUSh7sS3FMSdCFOl-mOk6Pg-t500x500.jpg";
		this.image.style.width = "3rem";
		this.image.style.height = "3rem";

		this.captchaBody = document.createElement("div");
		this.captchaBody.style.display = "none";
		this.captchaBody.style.width = "20rem";
		this.captchaBody.style.height = "30rem";
		this.captchaBody.style.position = "absolute";
		this.captchaBody.style.backgroundColor = "#909090";
		this.captchaBody.style.marginLeft = "11rem";
		this.captchaBody.style.flexDirection = "column";

		this.titleContainer = document.createElement("div");
		this.titleContainer.style.width = "100%";
		this.titleContainer.style.height = "20%";
		this.titleContainer.style.display = "flex";
		this.titleContainer.style.flexDirection = "row";

		this.titleText = document.createElement("p");
		this.titleText.style.marginLeft = "1rem";

		this.exampleImage = document.createElement("img");
		this.exampleImage.style.width = "5rem";
		this.exampleImage.style.height = "5rem";
		this.exampleImage.style.margin = "0.5rem";

		this.imageContainer = document.createElement("div");
		this.imageContainer.style.width = "100%";
		this.imageContainer.style.height = "80%";
		this.imageContainer.style.display = "flex";
		this.imageContainer.style.flexDirection = "row";
		this.imageContainer.style.flexWrap = "wrap";
		this.imageContainer.style.alignContent = "flex-start";
		this.imageContainer.style.justifyContent = "center";

		this.button = document.createElement("button");
		this.button.style.width = "2rem";
		this.button.style.height = "2rem";
		this.button.style.cursor = "pointer";

		this.button.addEventListener("click", () => {
			if (this.finished) {
				alert("Captcha already finished");
				return;
			}

			this.captchaBody.style.display == "none"
				? (this.captchaBody.style.display = "flex")
				: (this.captchaBody.style.display = "none");

			if (this.captchaBody.style.display == "none") {
				this.imageContainer.innerHTML = "";
				this.selected = [];
				return;
			}

			this.indicators = ["felix_argyle", "hoshino_ruby", "hoshino_ai"];

			this.primaryIndicator =
				this.indicators[Math.floor(Math.random() * this.indicators.length)];
			this.secondaryIndicator =
				this.indicators[Math.floor(Math.random() * this.indicators.length)];

			while (this.secondaryIndicator == this.primaryIndicator) {
				this.secondaryIndicator =
					this.indicators[Math.floor(Math.random() * this.indicators.length)];
			}

			this.title = this.primaryIndicator.replace("_", " ");
			this.titleText.textContent = `Click all images containing ${this.title}.`;

			this.amount = Math.floor(Math.random() * 9);

			for (let i = 0; i < this.amount + 1; i++) {
				fetch(
					`https://femboyfinder.firestreaker2.gq/api/${this.primaryIndicator}`
				)
					.then((response) => response.json())
					.then((data) => {
						if (i === this.amount) {
							this.exampleImage.src = data.URL;
						} else {
							this.correctImages.push(data.URL);
							this.append(data.URL, "correct");
						}
					})
					.catch((error) => {
						this.captchaBody.style.display = "none";
						console.error(`[ERROR] ${error}`);
					});
			}

			for (let i = 0; i < 9 - this.amount; i++) {
				fetch(
					`https://femboyfinder.firestreaker2.gq/api/${this.secondaryIndicator}`
				)
					.then((response) => response.json())
					.then((data) => {
						this.append(data.URL, "incorrect");
					})
					.catch((error) => {
						this.captchaBody.style.display = "none";
						console.error(`[ERROR] ${error}`);
					});
			}
		});

		this.submitButton = document.createElement("button");
		this.submitButton.style.width = "6rem";
		this.submitButton.style.height = "2rem";
		this.submitButton.style.position = "absolute";
		this.submitButton.style.right = "0";
		this.submitButton.style.bottom = "0";
		this.submitButton.style.margin = "0.5rem";
		this.submitButton.style.cursor = "pointer";
		this.submitButton.textContent = "Submit";

		this.submitButton.addEventListener("click", () => {
			this.correctSelectedUrls = this.selected
				.filter((item) => item.type === "correct")
				.map((item) => item.image);

			this.incorrectSelectedUrls = this.selected
				.filter((item) => item.type === "incorrect")
				.map((item) => item.image);

			if (this.incorrectSelectedUrls.length !== 0) {
				alert("Wrong");
				this.captchaBody.style.display = "none";
				this.imageContainer.innerHTML = "";
				this.selected = [];
				this.correctImages = [];
				return;
			}

			for (let i = 1; i <= this.correctSelectedUrls.length; i++) {
				this.correctImages.splice(
					this.correctImages.indexOf(this.correctSelectedUrls[i]),
					1
				);
			}

			if (this.correctImages.length === 0) {
				alert("Passed");
				this.finished = true;
				this.button.textContent = "\u2713";
			} else {
				alert("Wrong");
			}

			this.captchaBody.style.display = "none";
			this.imageContainer.innerHTML = "";
			this.selected = [];
			this.correctImages = [];
		});

		this.titleContainer.appendChild(this.titleText);
		this.titleContainer.appendChild(this.exampleImage);
		this.captchaBody.appendChild(this.titleContainer);
		this.captchaBody.appendChild(this.imageContainer);
		this.captchaBody.appendChild(this.submitButton);
		this.body.appendChild(this.button);
		this.body.appendChild(this.text);
		this.body.appendChild(this.image);
		this.body.appendChild(this.captchaBody);
	}

	append(url, type) {
		const image = document.createElement("img");
		image.style.width = "100%";
		image.style.height = "auto";
		image.src = url;

		const container = document.createElement("a");
		container.style.overflow = "hidden";
		container.style.display = "flex";
		container.style.width = "6rem";
		container.style.height = "6rem";
		container.style.margin = "0.3rem";
		container.style.cursor = "pointer";
		container.setAttribute("waifu-clicked", "false");
		container.appendChild(image);

		if (type === "correct") {
			container.addEventListener("click", () => {
				const data = { image: url, type: "correct" };

				if (container.getAttribute("waifu-clicked") === "false") {
					this.selected.push(data);
					container.setAttribute("waifu-clicked", "true");
					container.style.outline = "0.3rem solid red";
				} else {
					this.selected.splice(this.selected.indexOf(data), 1);
					container.setAttribute("waifu-clicked", "false");
					container.style.outline = "none";
				}
			});
		} else {
			container.addEventListener("click", () => {
				const data = { image: url, type: "incorrect" };

				if (container.getAttribute("waifu-clicked") === "false") {
					this.selected.push(data);
					container.setAttribute("waifu-clicked", "true");
					container.style.outline = "0.3rem solid red";
				} else {
					this.selected.splice(this.selected.indexOf(data), 1);
					container.setAttribute("waifu-clicked", "false");
					container.style.outline = "none";
				}
			});
		}

		this.imageContainer.appendChild(container);
	}

	attach(container) {
		container.appendChild(this.body);
	}

	isFinished() {
		return this.finished;
	}
}
