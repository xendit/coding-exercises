'use strict';

const express = require('express');
const bodyParser = require('body-parser');

function buildApp (db) {
    const app = express();

    app.use(bodyParser.json());

    app.post('/cats', (req, res) => {
        res.send(200);
    });

    return app;
}

module.exports = buildApp;
