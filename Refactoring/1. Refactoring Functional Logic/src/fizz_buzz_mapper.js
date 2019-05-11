'use strict';

function fizzBuzzMapper (s, e, callback) {
    if (typeof s !== 'number' || typeof e !== 'number') {
        return callback(new Error('start and end indexes must both be numbers'));
    }

    if (s >= e) {
        return callback(new Error('start index must be less than end index'));
    }

    const results = [];

    for (let i = s; i < e; i++) {
        if (i === 0) {
            results.push(0);
        } else if (i % 3 === 0) {
            results.push('Fizz');
        } else if (i % 5 === 0) {
            results.push('Buzz');
        } else {
            results.push(i);
        }
    }

    return callback(null, results);
}

module.exports = fizzBuzzMapper;
