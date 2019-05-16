'use strict';

const { expect } = require('chai');

const sqlite = require('sqlite');
const dbPromise = sqlite.open(':memory:', { Promise });
const DB = require('../src/database');

describe('idempotency in databases', () => {
    let db;

    before(async () => {
        db = await dbPromise;

        const catSchema = `
            CREATE TABLE Cats
            (
            catID INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            color TEXT NOT NULL,
            age INTEGER NOT NULL,
            created DATETIME default CURRENT_TIMESTAMP
            )
        `;

        await db.run(catSchema);
    });

    after(() => {
        db.close();
    });

    describe('non idempotent create cat', () => {
        it('should not be idempotent', async () => {
            const firstCat = await DB.createIdempotentCat({
                name: 'George',
                color: 'tan',
                age: 5
            });

            expect(firstCat).to.deep.equal({
                catID: 1,
                name: 'George',
                color: 'tan',
                age: 5,
                created: firstCat.created
            });

            const secondCat = await DB.createIdempotentCat({
                name: 'Billy',
                color: 'black',
                age: 2
            });

            expect(secondCat).to.deep.equal({
                catID: 2,
                name: 'Billy',
                color: 'black',
                age: 2,
                created: secondCat.created
            });

            const thirdCat = await DB.createIdempotentCat({
                name: 'George',
                color: 'tan',
                age: 5
            });

            // Creating the third cat should not be idempotent.

            expect(thirdCat).to.deep.equal({
                catID: 3,
                name: 'George',
                color: 'tan',
                age: 5,
                created: thirdCat.created
            });
        });
    });

    describe('idempotent create cat', () => {
        it('should be idempotent', async () => {
            const firstCat = await DB.createIdempotentCat({
                name: 'George',
                color: 'tan',
                age: 5
            });

            expect(firstCat).to.deep.equal({
                catID: 1,
                name: 'George',
                color: 'tan',
                age: 5,
                created: firstCat.created
            });

            const secondCat = await DB.createIdempotentCat({
                name: 'Billy',
                color: 'black',
                age: 2
            });

            expect(secondCat).to.deep.equal({
                catID: 2,
                name: 'Billy',
                color: 'black',
                age: 2,
                created: secondCat.created
            });

            const thirdCat = await DB.createIdempotentCat({
                name: 'George',
                color: 'tan',
                age: 5
            });

            // Creating the third cat should be idempotent.

            expect(thirdCat).to.deep.equal({
                catID: 1,
                name: 'George',
                color: 'tan',
                age: 5,
                created: firstCat.created
            });
        });
    });
});
