const path = require("node:path");

const getPathPage = (name) =>
  path.join(__dirname, `../dist/pages/${name}/index.html`);

module.exports = {
  getPathPage,
};
