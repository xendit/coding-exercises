'use strict';

const express = require('express');
const app = express();
const port = 1234;

app.get('/cats', (req, res) => res.send('<html><head></head><body><h1><span>Meow<span></h1><h2>meow</h2><ul><li>1</li><li>2</li></ul></body></html>'));
app.get('/dogs', (req, res) => res.send('<html><head></head><body><div>Woof<div>woof</div></div></body></html>'));

app.listen(port, () => console.log(`Mock server listening on port ${port}!`));
