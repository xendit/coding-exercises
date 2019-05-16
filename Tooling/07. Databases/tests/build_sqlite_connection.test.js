'use strict';

const { expect } = require('chai');
const buildSQLiteConnection = require('../src/build_sqlite_connection');

describe('connecting to sqlite', () => {
    it('should connect to sqlite in memory', async () => {
        const dbConnection = await buildSQLiteConnection(':memory:');

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

        await dbConnection.run(catSchema);

        const insertQuery = `INSERT INTO Cats(name, color, age) VALUES (?, ?, ?)`;

        await dbConnection.run(insertQuery, ['George', 'tan', 5]);

        const selectAllQuery = 'SELECT * FROM Cats';

        const cats = await dbConnection.all(selectAllQuery);

        expect(cats[0].created).to.be.a('string');

        const resultToExpect = [
            {
                catID: 1,
                name: 'George',
                color: 'tan',
                age: 5,
                created: cats[0].created
            }
        ];

        expect(cats).to.deep.equal(resultToExpect);

        dbConnection.close();
    });

    it('should connect to sqlite on disk', async () => {
        const dbConnection = await buildSQLiteConnection('./database.sqlite');

        const catSchema = `
            CREATE TABLE IF NOT EXISTS Cats
            (
            catID INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            color TEXT NOT NULL,
            age INTEGER NOT NULL,
            created DATETIME default CURRENT_TIMESTAMP
            )
        `;

        await dbConnection.run(catSchema);

        const insertQuery = `INSERT INTO Cats(name, color, age) VALUES (?, ?, ?)`;

        await dbConnection.run(insertQuery, ['George', 'tan', 5]);

        const selectAllQuery = 'SELECT * FROM Cats';

        const cats = await dbConnection.all(selectAllQuery);

        expect(cats[0].created).to.be.a('string');

        const resultToExpect = [
            {
                catID: 1,
                name: 'George',
                color: 'tan',
                age: 5,
                created: cats[0].created
            }
        ];

        expect(cats).to.deep.equal(resultToExpect);

        dbConnection.close();
    });
});
