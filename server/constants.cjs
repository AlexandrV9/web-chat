const path = require("node:path");
const { getPathPage } = require("./helpers.cjs");

const PORT = 3000;

const DIST_PATH = path.join(__dirname, "../dist");

const PAGE_PATHS = {
  index: path.join(DIST_PATH, "./index.html"),
  home: getPathPage("home"),
  notFound: getPathPage("404"),
  serverError: getPathPage("500"),
  profile: getPathPage("profile"),
  signIn: getPathPage("sign-in"),
  signUp: getPathPage("sign-up"),
};

module.exports = {
  PORT,
  DIST_PATH,
  PAGE_PATHS,
};
