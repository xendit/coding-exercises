'use strict';

const sqlite = require('sqlite');
const dbPromise = sqlite.open(':memory:', { Promise });

const buildApp = require('./src/app');
const port = 1234;

(async () => {
    const db = await dbPromise;

    const app = await buildApp(db);

    app.listen(port, () => console.log(`vulnerable server listening on port ${port}!`));
})();
