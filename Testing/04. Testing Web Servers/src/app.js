'use strict';

const express = require('express');
var bodyParser = require('body-parser');

const app = express();

let currentCatId = 0;
let cats = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<html><head></head><body><div>Hello<div>World</div></div></body>');
});

app.get('/cats', (req, res) => {
    res.send(cats);
});

app.get('/cats/:cat_id', (req, res) => {
    let cat = cats.filter(cat => cat.id === req.params.cat_id)[0];

    if (cat === undefined) {
        return res.status(400).send({ error_code: 'CAT_NOT_FOUND' });
    }

    res.send(cat);
});

app.post('/cats', (req, res) => {
    let newCat = {
        id: currentCatId,
        name: req.body.name,
        color: req.body.color
    };

    cats.push(newCat);

    currentCatId += 1;

    res.send(newCat);
});

module.exports = app;
