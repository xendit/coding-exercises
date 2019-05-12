'use strict';

const express = require('express');
const app = express();
const port = 1234;

app.get('*', (req, res) => res.send('<html><head></head><body><div>Hello<div>World</div></div></body>'));

app.listen(port, () => console.log(`Mock server listening on port ${port}!`));
