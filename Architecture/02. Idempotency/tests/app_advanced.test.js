'use strict';

const request = require('supertest');
const { expect } = require('chai');

const sqlite = require('sqlite');
const dbPromise = sqlite.open(':memory:', { Promise });
const buildApp = require('../src/app_advanced');

async function postAsync (app, url, data) {
    return new Promise((resolve, reject) => {
        request(app)
            .post(url)
            .send(data)
            .end((err, res) => {
                if (err) {
                    return reject(err);
                }

                resolve(res.body);
            });
    });
}

describe('web server advanced idempotency', () => {
    let db, app;

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

        const ownerSchema = `
            CREATE Table Owners
            (
            ownerID INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            created DATETIME default CURRENT_TIMESTAMP
            )
        `;

        await db.run(catSchema);
        await db.run(ownerSchema);
    });

    before(() => {
        app = buildApp(db);
    });

    after(() => {
        db.close();
    });

    describe('normal case', () => {
        it('should create owner and cat in an idempotent way', async () => {
            const result = await postAsync(app, '/cats', {
                cat_name: 'George',
                cat_color: 'grey',
                cat_age: 5,
                owner_name: 'Henry',
                owner_age: 3
            });

            expect(result).to.deep.equal({
                catID: 1,
                ownerID: 1,
                catName: 'George',
                catColor: 'grey',
                catAge: 5,
                ownerName: 'Henry',
                ownerAge: 3
            });

            const secondResult = await postAsync(app, '/cats', {
                cat_name: 'George',
                cat_color: 'grey',
                cat_age: 5,
                owner_name: 'Henry',
                owner_age: 3
            });

            expect(secondResult).to.deep.equal({
                catID: 1,
                ownerID: 1,
                catName: 'George',
                catColor: 'grey',
                catAge: 5,
                ownerName: 'Henry',
                ownerAge: 3
            });

            const thirdResult = await postAsync(app, '/cats', {
                cat_name: 'Bugs',
                cat_color: 'black',
                cat_age: 2,
                owner_name: 'Henry',
                owner_age: 3
            });

            expect(thirdResult).to.deep.equal({
                catID: 2,
                ownerID: 1,
                catName: 'Bugs',
                catColor: 'black',
                catAge: 2,
                ownerName: 'Henry',
                ownerAge: 3
            });

            const fourthResult = await postAsync(app, '/cats', {
                cat_name: 'Bugs',
                cat_color: 'black',
                cat_age: 2,
                owner_name: 'Jorge',
                owner_age: 3
            });

            expect(fourthResult).to.deep.equal({
                catID: 3,
                ownerID: 2,
                catName: 'Bugs',
                catColor: 'black',
                catAge: 2,
                ownerName: 'Jorge',
                ownerAge: 3
            });
        });
    });

    describe('there is a broken process after owner is created', async () => {
        before(async () => {
            // Simulating a break in process in which only the owner is created

            const ownerInsertQuery = 'INSERT INTO Owners(name, age) VALUES (?, ?)';

            await db.run(ownerInsertQuery, ['John', 5]);
        });

        it('should create cat but not owner', async () => {
            const result = await postAsync(app, '/cats', {
                cat_name: 'George',
                cat_color: 'grey',
                cat_age: 5,
                owner_name: 'John',
                owner_age: 5
            });

            expect(result).to.deep.equal({
                catID: 4,
                ownerID: 3,
                catName: 'George',
                catColor: 'grey',
                catAge: 5,
                ownerName: 'John',
                ownerAge: 5
            });
        });
    });
});
