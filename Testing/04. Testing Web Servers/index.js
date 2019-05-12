'use strict';

const app = require('./src/app');
const port = 1234;

app.listen(port, () => console.log(`application server listening on port ${port}!`));
