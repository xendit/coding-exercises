'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/cats_idempotent', (req, res) => {
    res.send(200);
});

app.post('/cats_nonidempotent', (req, res) => {
    res.send(200);
});

module.exports = app;
