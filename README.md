![AnimeCaptcha](https://socialify.git.ci/FireStreaker2/AnimeCaptcha/image?description=1&forks=1&issues=1&logo=https%3A%2F%2Fstatic1.cbrimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2023%2F07%2Fruby-hoshino-is-shocked-with-a-sparkly-background.jpg&name=1&owner=1&pulls=1&stargazers=1&theme=Dark)

# About
AnimeCaptcha was designed to be a simple captcha system, just using anime waifus. It was meant to replace modern captcha systems like [hCaptcha](https://www.hcaptcha.com/) and [reCaptcha](https://www.google.com/recaptcha/about/). It utilizes the [FemboyFinder API](https://femboyfinder.firestreaker2.gq/) in order to retrieve images, and then display them.

# Usage
## Setup
To get started, include this script link in your ``<body>`` tag.
```html
<script src="https://cdn.jsdelivr.net/gh/FireStreaker2/AnimeCaptcha@latest/animecaptcha.min.js"></script>
```

After, make sure to initialize it and attach it to an element.
```js
const captcha = new AnimeCaptcha();
captcha.attach(document.getElementById("anime-captcha"));
```

## Functions
| Method         | Accepts      | Usage                               |
| -------------- | ------------ | ----------------------------------- |
| finished       | boolean      | check/set status of captcha         |
| indicators     | array        | check/set indicators                |
| validFormats   | array        | check/set valid formats for images  |
| attach         | HTML element | attach captcha to an HTML element   |

## Example
```html
<script src="https://cdn.jsdelivr.net/gh/FireStreaker2/AnimeCaptcha@latest/animecaptcha.min.js">
  // initialize captcha
  const captcha = new AnimeCaptcha();

  // set specific indicators
  captcha.indicators = [
    "hoshino_ai",
    "hoshino_ruby",
    "kurokawa_akane",
    "memcho",
  ];

  // attach to element
  captcha.attach(document.getElementById("anime-captcha"));

  // submit logic
  const form = document.getElementById("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    captcha.finished === true
      ? alert(input.value.trim())
      : alert("Please finish the captcha");
  });
</script>
```

A full demo can be found [here](https://animecaptcha.firestreaker2.gq/).

# License
[MIT](https://github.com/FireStreaker2/AnimeCaptcha/blob/main/LICENSE)