const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(8080, () => console.log('🔥 Server started at http://localhost:8080'));
}

module.exports = app;
