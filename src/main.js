import "./app/style.css";

import Handlebars from "handlebars";

Handlebars.registerPartial("input", "./partials/input/input.tmpl.html");

document.querySelector("#app").innerHTML = `
  <div>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;
