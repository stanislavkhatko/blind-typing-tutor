const express = require('express');
const path = require('path');

const app = express();

const publicDir = path.join(__dirname, 'public');

app.use(express.static(publicDir));

app.get('/', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const port = process.env.PORT || 8000;

app.listen(port, err => {
  if (err) throw err;
});