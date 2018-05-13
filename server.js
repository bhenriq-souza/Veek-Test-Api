const express = require('express');
const app = express();
const port = process.env.PORT || 4200;
const connection = require('./config/database/index');

app.listen(port);
console.log(`Server listening on ${port} port...`);