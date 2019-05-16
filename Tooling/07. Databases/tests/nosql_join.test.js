'use strict';

const util = require('util');
const { expect } = require('chai');

const buildMongoConnection = require('../src/build_mongo_connection');
const getJoinedCatOwners = require('../src/nosql_join');

describe('build mongo connection', () => {
    let dbConnection, db;

    before(async () => {
        const mongoURL = 'mongodb://localhost:27017';
        const databaseName = 'foo';

        dbConnection = await buildMongoConnection(mongoURL);

        db = dbConnection.db(databaseName);
        const catsCollection = db.collection('cats');

        const promisifiedInsertManyCats = util.promisify(catsCollection.insertMany.bind(catsCollection));

        await promisifiedInsertManyCats([
            {
                id: 1,
                name: 'George',
                color: 'tan',
                age: 5
            },
            {
                id: 2,
                name: 'Becky',
                color: 'grey',
                age: 3
            },
            {
                id: 3,
                name: 'Mr. Cuddles',
                color: 'black',
                age: 2
            }
        ]);

        const ownersCollection = db.collection('owners');

        const promisifiedInsertManyOwners = util.promisify(ownersCollection.insertMany.bind(ownersCollection));

        await promisifiedInsertManyOwners([
            {
                id: 1,
                name: 'Rebecca'
            },
            {
                id: 2,
                name: 'Stella'
            },
            {
                id: 3,
                name: 'CC'
            }
        ]);

        const catOwnersCollection = db.collection('catowners');

        const promisifiedInsertManyCatOwners = util.promisify(catOwnersCollection.insertMany.bind(catOwnersCollection));

        await promisifiedInsertManyCatOwners([
            {
                id: 1,
                catID: 1,
                ownerID: 1
            },
            {
                id: 2,
                catID: 1,
                ownerID: 2
            },
            {
                id: 3,
                catID: 2,
                ownerID: 2
            },
            {
                id: 4,
                catID: 3,
                ownerID: 1
            },
            {
                id: 5,
                catID: 2,
                ownerID: 2
            },
            {
                id: 6,
                catID: 3,
                ownerID: 3
            }
        ]);
    });

    after(async () => {
        const catsCollection = db.collection('cats');
        const ownersCollection = db.collection('owners');
        const catOwnersCollection = db.collection('catowners');

        for (let collection of [catsCollection, ownersCollection, catOwnersCollection]) {
            let deleteAll = util.promisify(collection.deleteMany.bind(collection));

            await deleteAll({});
        }

        dbConnection.close();
    });

    it('should build mongo connection', async () => {
        const joinedCatOwners = await getJoinedCatOwners(dbConnection);

        const resultToExpect = [
            {
                catID: 1,
                catName: 'George',
                catColor: 'tan',
                catAge: 5,
                ID: 1,
                ownerID: 1,
                ownerName: 'Rebecca'
            },
            {
                catID: 1,
                catName: 'George',
                catColor: 'tan',
                catAge: 5,
                ID: 2,
                ownerID: 2,
                ownerName: 'Stella'
            },
            {
                catID: 2,
                catName: 'Becky',
                catColor: 'grey',
                catAge: 3,
                ID: 3,
                ownerID: 2,
                ownerName: 'Stella'
            },
            {
                catID: 3,
                catName: 'Mr. Cuddles',
                catColor: 'black',
                catAge: 2,
                ID: 4,
                ownerID: 1,
                ownerName: 'Rebecca'
            },
            {
                catID: 2,
                catName: 'Becky',
                catColor: 'grey',
                catAge: 3,
                ID: 5,
                ownerID: 2,
                ownerName: 'Stella'
            },
            {
                catID: 3,
                catName: 'Mr. Cuddles',
                catColor: 'black',
                catAge: 2,
                ID: 6,
                ownerID: 3,
                ownerName: 'CC'
            }
        ];

        expect(joinedCatOwners).to.deep.equal(resultToExpect);
    });
});
