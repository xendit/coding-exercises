'use strict';

// const { MongoClient } = require('mongodb');

async function buildMongoConnection (mongoURL, databaseName) {
    return mongoURL + databaseName;
}

module.exports = buildMongoConnection;
