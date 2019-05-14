'use strict';

const { expect } = require('chai');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const CatDAO = require('../src/mongo.js');

describe('mongo test', () => {
    let mongod, catModel;

    before(() => {
        mongod = new MongoMemoryServer();
    });

    after(async () => {
        mongoose.disconnect();
        await mongod.stop();
    });

    it('should initialize', async () => {
        catModel = CatDAO.initialize(await mongod.getConnectionString());

        expect(catModel).to.be.a('function');
    });
});
