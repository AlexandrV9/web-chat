const path = require('node:path');

const PORT = 3000;
const DIST_PATH = path.join(__dirname, '../dist/index.html');
const PAGE_PATHS = {
  index: path.join(DIST_PATH, './index.html'),
};

module.exports = {
  PORT,
  DIST_PATH,
  PAGE_PATHS,
};
