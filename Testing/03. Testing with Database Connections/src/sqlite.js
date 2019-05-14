'use strict';

const sqlite = require('sqlite');
const dbPromise = sqlite.open(':memory:', { Promise });

class CatModel {
    static async initialize () {
        const db = await dbPromise;

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

        return db;
    }

    static async insertCat (db, catData) {
        const insertQuery = `INSERT INTO Cats(name, color, age) VALUES (?, ?, ?)`;
        const values = [catData.name, catData.color, catData.age];

        const result = await db.run(insertQuery, values);

        return (await db.all('SELECT * FROM Cats WHERE catID = ?', result.lastID))[0];
    }

    static async getAllCats (db) {
        const selectQuery = 'SELECT * FROM Cats';

        const cats = await db.all(selectQuery);

        return cats.map(c => ({
            id: c.catID,
            name: c.name,
            color: c.color,
            age: c.age,
            human_age: c.age * 7
        }));
    }

    static async getCatById (db, catID) {
        const selectQuery = 'SELECT * FROM Cats WHERE catID = ?';

        const catResults = await db.all(selectQuery, catID);

        if (catResults.length === 0) {
            throw new Error('No cat with that id');
        }

        return catResults[0];
    }

    static async deleteCatByID (db, catID) {
        if (typeof catID !== 'string') {
            throw new Error('cat id must be a string');
        }

        const deleteQuery = 'DELETE FROM Cats WHERE catID = ?';

        await db.run(deleteQuery, catID);
    }
}

module.exports = CatModel;
