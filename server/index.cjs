const express = require('express');

const { PORT, PAGE_PATHS, DIST_PATH } = require('./constants.cjs');

const app = express();

app.use(express.static(DIST_PATH));

app.get('/', (req, res) => {
  res.sendFile(PAGE_PATHS['index']);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
