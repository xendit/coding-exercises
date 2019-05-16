'use strict';

const util = require('util');
const { expect } = require('chai');

const buildMongoConnection = require('../src/build_mongo_connection');

describe('build mongo connection', () => {
    let dbConnection;

    after(() => {
        dbConnection.close();
    });

    it('should build mongo connection', async () => {
        const mongoURL = 'mongodb://localhost:27017';
        const databaseName = 'foo';

        dbConnection = await buildMongoConnection(mongoURL);

        const db = dbConnection.db(databaseName);
        const catsCollection = db.collection('cats');

        const promisifiedInsertMany = util.promisify(catsCollection.insertMany.bind(catsCollection));

        const result = await promisifiedInsertMany([
            {
                name: 'George',
                color: 'tan',
                age: 5
            }
        ]);

        expect(result.result.n).to.equal(1);
    });
});
