const body = document.createElement("div");
body.style.backgroundColor = "#cacaca";
body.style.width = "15rem";
body.style.height = "5rem";
body.style.display = "flex";
body.style.alignItems = "center";
body.style.justifyContent = "space-around";

const button = document.createElement("button");
button.style.width = "2rem";
button.style.height = "2rem";
body.appendChild(button);

const text = document.createElement("p");
text.textContent = "I'm not a robot";
body.appendChild(text);

const image = document.createElement("img");
image.src = "https://i1.sndcdn.com/artworks-YUSh7sS3FMSdCFOl-mOk6Pg-t500x500.jpg";
image.style.width = "3rem";
image.style.height = "3rem";
body.appendChild(image);

document.body.appendChild(body);
