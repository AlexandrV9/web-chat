const express = require('express');
const path = require('node:path');

const { PORT, DIST_PATH } = require('./constants.cjs');

const app = express();
app.use(express.static(DIST_PATH));

app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
