'use strict';

const request = require('supertest');
const { expect } = require('chai');

const app = require('../src/app');

describe('app tests', () => {
    it('should get cats', (done) => {
        request(app)
            .get('/cats')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                expect(res.body).to.deep.equal([]);

                done();
            });
    });
});
