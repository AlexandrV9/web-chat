const path = require('node:path');

const PORT = 3000;
const DIST_PATH = path.join(__dirname, '../dist');

module.exports = {
  PORT,
  DIST_PATH,
};
