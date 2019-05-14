'use strict';

const { expect } = require('chai');
const CatModel = require('../src/sqlite.js');

describe('sqlite tests', () => {
    let db;

    it('should initialize', async () => {
        db = await CatModel.initialize();

        expect(db).to.be.an('object');
    });

    it('should insert cat', async () => {
        const cat = await CatModel.insertCat(db, { name: 'hello', color: 'orange', age: 5 });

        expect(cat.created).to.be.a('string');

        expect(cat).to.deep.equal({
            catID: 1,
            name: 'hello',
            color: 'orange',
            age: 5,
            created: cat.created
        });
    });
});
