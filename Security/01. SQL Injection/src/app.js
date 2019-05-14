'use strict';

const express = require('express');

async function buildApp (db) {
    const app = express();

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

    const insertQuery = `INSERT INTO Cats(name, color, age) VALUES (?, ?, ?)`;
    const catValues = [
        {
            name: 'George',
            color: 'tan',
            age: 5
        },
        {
            name: 'Mittens',
            color: 'black',
            age: 2
        },
        {
            name: 'Paws',
            color: 'grey',
            age: 1
        },
        {
            name: 'Mr. Snuggles',
            color: 'striped',
            age: 6
        }
    ];

    for (let catValue of catValues) {
        await db.run(insertQuery, [catValue.name, catValue.color, catValue.age]);
    }

    app.get('/cats/:cat_id', async (req, res) => {
        const selectQuery = `SELECT * FROM Cats WHERE catID = '${req.params.cat_id}'`;

        const cats = await db.all(selectQuery);

        res.send(cats);
    });

    return app;
}

module.exports = buildApp;
