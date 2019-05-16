'use strict';

const util = require('util');
const { expect } = require('chai');
const buildRedisConnection = require('../src/build_redis_connection');

describe('build redis connection', () => {
    let redisConnection;

    after(() => {
        redisConnection.quit();
    });

    it('should build redis connection', async () => {
        redisConnection = buildRedisConnection('localhost', 6379);

        const promisifiedSet = util.promisify(redisConnection.set.bind(redisConnection));

        const result = await promisifiedSet('foo', 'bar');

        expect(result).to.equal('OK');
    });
});
