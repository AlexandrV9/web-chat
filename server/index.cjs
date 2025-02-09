const express = require('express');

const { PORT, PAGE_PATHS, DIST_PATH } = require('./constants.cjs');

const app = express();

app.use(express.static(DIST_PATH));

app.get('/', (req, res) => {
  res.sendFile(PAGE_PATHS['index']);
});

app.use((req, res) => {
  res.status(404).sendFile(PAGE_PATHS['notFound']);
});

app.use((err, req, res, next) => {
  res.status(500).sendFile(PAGE_PATHS['serverError']);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
