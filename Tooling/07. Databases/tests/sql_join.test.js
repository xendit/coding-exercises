'use strict';

const { expect } = require('chai');
const buildSQLiteConnection = require('../src/build_sqlite_connection');
const getJoinedCatOwners = require('../src/sql_join');

describe('join sql', () => {
    let dbConnection;

    before(async () => {
        dbConnection = await buildSQLiteConnection(':memory:');

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

        const ownerSchema = `
            CREATE TABLE IF NOT EXISTS Owners
            (
            ownerID INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            created DATETIME default CURRENT_TIMESTAMP
            )
        `;

        const catOwnersSchema = `
            CREATE TABLE IF NOT EXISTS CatOwners
            (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            catID INTEGER NOT NULL,
            ownerID INTEGER NOT NULL,
            FOREIGN KEY(catID) REFERENCES Cats(catID),
            FOREIGN KEY(ownerID) REFERENCES Owners(ownerID)
            )
        `;

        for (let schema of [catSchema, ownerSchema, catOwnersSchema]) {
            await dbConnection.run(schema);
        }

        const cats = [
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
        ];

        const catInsertQuery = `INSERT INTO Cats(name, color, age) VALUES (?, ?, ?)`;

        for (let cat of cats) {
            await dbConnection.run(catInsertQuery, [cat.name, cat.color, cat.age]);
        }

        const ownerInsertQuery = `INSERT INTO Owners(name) VALUES (?)`;

        const owners = [
            {
                name: 'Rebecca'
            },
            {
                name: 'Stella'
            },
            {
                name: 'CC'
            }
        ];

        for (let owner of owners) {
            await dbConnection.run(ownerInsertQuery, owner.name);
        }

        const catOwners = [
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
        ];

        const catOwnerInsertQuery = `INSERT INTO CatOwners(catID, ownerID) VALUES (?, ?)`;

        for (let catOwner of catOwners) {
            await dbConnection.run(catOwnerInsertQuery, [catOwner.catID, catOwner.ownerID]);
        }
    });

    after(() => {
        dbConnection.close();
    });

    it('should get joined cats and owners through cat owners', async () => {
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
