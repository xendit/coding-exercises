'use strict';

// const redis = require('redis');

function buildRedisClient (host, port) {
    return host + port;
}

module.exports = buildRedisClient;
