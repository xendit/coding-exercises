'use strict';

const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

async function postAsync (url, data) {
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

describe('web server idempotency tests', () => {
    describe('non idempotent', () => {
        it('should create cats', async () => {
            const result = await postAsync('/cats_nonidempotent', {
                name: 'George',
                color: 'tan',
                age: 1
            });

            expect(result).to.deep.equal({
                id: 1,
                name: 'George',
                color: 'tan',
                age: 1
            });

            const secondResult = await postAsync('/cats_nonidempotent', {
                name: 'Mr. Cuddles',
                color: 'grey',
                age: 5
            });

            expect(secondResult).to.deep.equal({
                id: 2,
                name: 'Mr. Cuddles',
                color: 'grey',
                age: 5
            });

            const thirdResult = await postAsync('/cats_nonidempotent', {
                name: 'George',
                color: 'tan',
                age: 1
            });

            expect(thirdResult).to.deep.equal({
                id: 3,
                name: 'George',
                color: 'tan',
                age: 1
            });
        });
    });

    describe('idempotent', () => {
        it('should create cats', async () => {
            const result = await postAsync('/cats_idempotent', {
                name: 'George',
                color: 'tan',
                age: 1
            });

            expect(result).to.deep.equal({
                id: 1,
                name: 'George',
                color: 'tan',
                age: 1
            });

            const secondResult = await postAsync('/cats_idempotent', {
                name: 'Mr. Cuddles',
                color: 'grey',
                age: 5
            });

            expect(secondResult).to.deep.equal({
                id: 2,
                name: 'Mr. Cuddles',
                color: 'grey',
                age: 5
            });

            const thirdResult = await postAsync('/cats_idempotent', {
                name: 'George',
                color: 'tan',
                age: 1
            });

            expect(thirdResult).to.deep.equal({
                id: 1,
                name: 'George',
                color: 'tan',
                age: 1
            });
        });
    });
});
