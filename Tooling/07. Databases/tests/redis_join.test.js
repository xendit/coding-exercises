'use strict';

const util = require('util');
const { expect } = require('chai');
const buildRedisConnection = require('../src/build_redis_connection');
const getJoinedCatOwners = require('../src/redis_join');

describe('join redis', () => {
    let redisConnection;

    before(async () => {
        redisConnection = buildRedisConnection('localhost', 6379);

        const promisifiedSet = util.promisify(redisConnection.set.bind(redisConnection));

        await promisifiedSet('cats', JSON.stringify([
            {
                name: 'George',
                color: 'tan',
                age: 5
            },
            {
                name: 'Becky',
                color: 'grey',
                age: 3
            },
            {
                name: 'Mr. Cuddles',
                color: 'black',
                age: 2
            }
        ]));

        await promisifiedSet('owners', JSON.stringify([
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
        ]));

        await promisifiedSet('catowners', JSON.stringify([
            {
                catID: 1,
                ownerID: 1
            },
            {
                catID: 1,
                ownerID: 2
            },
            {
                catID: 2,
                ownerID: 2
            },
            {
                catID: 3,
                ownerID: 1
            },
            {
                catID: 2,
                ownerID: 2
            },
            {
                catID: 3,
                ownerID: 3
            }
        ]));
    });

    after(() => {
        redisConnection.quit();
    });

    it('should get joined cats and owners through cat owners', async () => {
        const joinedCatOwners = await getJoinedCatOwners(redisConnection);

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
