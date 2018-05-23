const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const usersRoutes = require('./src/routes/users');

const port = process.env.PORT || 4200;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRoutes);

app.listen(port);
console.log(`Server listening on ${port} port...`);