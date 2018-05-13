const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 4200;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);
console.log(`Server listening on ${port} port...`);