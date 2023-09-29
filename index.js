const body = document.createElement("div");
body.style.backgroundColor = "#cacaca";
body.style.width = "15rem";
body.style.height = "5rem";
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "space-around";
body.style.fontFamily = "Arial";

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

const button = document.createElement("button");
button.style.width = "2rem";
button.style.height = "2rem";

button.addEventListener("click", () => {
  captchaBody.style.display == "none" ? captchaBody.style.display = "flex" : captchaBody.style.display = "none";
});


titleContainer.appendChild(title);
captchaBody.appendChild(titleContainer);
captchaBody.appendChild(imageContainer);
body.appendChild(button);
body.appendChild(text);
body.appendChild(image);
body.appendChild(captchaBody);

document.body.appendChild(body);
