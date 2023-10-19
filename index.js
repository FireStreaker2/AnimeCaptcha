class AnimeCaptcha {
	constructor() {
		this.finished = false;
		this.selectedIndicators = [];
		this.selected = [];
		this.correctImages = [];
		this.indicators = [
			"felix_argyle",
			"hoshino_ruby",
			"hoshino_ai",
			"nishikigi_chisato",
			"konjiki_no_yami",
			"shirakami_fubuki",
			"ookami_mio",
		];
		this.validFormats = ["jpg", "jpeg", "png", "PNG", "webm", "gif", "GIF"];

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
				this.captchaBody.style.display = "none";
				this.imageContainer.innerHTML = "";
				this.selected = [];
				this.correctImages = [];
				this.selectedIndicators = [];
				return;
			}

			this.primaryIndicator =
				this.indicators[Math.floor(Math.random() * this.indicators.length)];
			this.selectedIndicators.push(this.primaryIndicator);

			this.title = this.primaryIndicator.replaceAll("_", " ");
			this.titleText.textContent = `Click all images containing ${this.title}.`;

			this.amount = Math.floor(Math.random() * 6);

			for (let i = 0; i < this.amount + 1; i++) {
				fetch(
					`https://femboyfinder.firestreaker2.gq/api/${this.primaryIndicator}`
				)
					.then((response) => response.json())
					.then((data) => {
						const extension = data.URL.slice(
							((data.URL.lastIndexOf(".") - 1) >>> 0) + 2
						);

						if (this.validFormats.includes(extension) === false) {
							i--;
						} else {
							if (i === this.amount) {
								this.exampleImage.src = data.URL;
							} else {
								this.correctImages.push(data.URL);
								this.append(data.URL, "correct");
							}
						}
					})
					.catch((error) => {
						this.captchaBody.style.display = "none";
						console.error(`[ERROR] ${error}`);
					});
			}

			this.amountRemaining = 9 - this.amount;
			this.numberOfOtherIndicators =
				Math.floor(Math.random() * this.amountRemaining) + 1;

			for (let i = 0; i < this.numberOfOtherIndicators; i++) {
				if (this.amountRemaining <= 0) {
					break;
				}

				this.incorrectAmount =
					Math.floor(Math.random() * this.amountRemaining) + 1;

				this.currentIndicator =
					this.indicators[Math.floor(Math.random() * this.indicators.length)];

				while (this.selectedIndicators.includes(this.currentIndicator)) {
					this.currentIndicator =
						this.indicators[Math.floor(Math.random() * this.indicators.length)];
				}

				this.selectedIndicators.push(this.currentIndicator);

				for (let j = 0; j < this.incorrectAmount; j++) {
					fetch(
						`https://femboyfinder.firestreaker2.gq/api/${this.currentIndicator}`
					)
						.then((response) => response.json())
						.then((data) => {
							const extension = data.URL.slice(
								((data.URL.lastIndexOf(".") - 1) >>> 0) + 2
							);

							!this.validFormats.includes(extension)
								? j--
								: this.append(data.URL, "incorrect");
						})
						.catch((error) => {
							this.captchaBody.style.display = "none";
							console.error(`[ERROR] ${error}`);
						});
				}

				this.amountRemaining -= this.incorrectAmount;
			}
		});

		this.submitButton = document.createElement("button");
		this.submitButton.style.width = "6rem";
		this.submitButton.style.height = "2rem";
		this.submitButton.style.margin = "0.5rem";
		this.submitButton.style.marginLeft = "auto";
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
			this.selectedIndicators = [];
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
		this.indicators.length < 2
			? console.error("[ERROR] Length of Indicators is less than 2")
			: container.appendChild(this.body);
	}

	setIndicators(indicators) {
		this.indicators = indicators;
	}

	isFinished() {
		return this.finished;
	}
}
