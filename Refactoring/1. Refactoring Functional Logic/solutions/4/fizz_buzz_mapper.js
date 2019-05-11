'use strict';

async function getMappedFizzBuzz (startIndex, endIndex, callback) {
    if (typeof startIndex !== 'number' || typeof endIndex !== 'number') {
        throw new Error('start and end indexes must both be numbers');
    }

    if (startIndex >= endIndex) {
        throw new Error('start index must be less than end index');
    }

    const mappedFizzBuzz = Array.from({ length: endIndex - startIndex }, (v, k) => k + startIndex).map((currentIndex) => {
        if (currentIndex === 0) {
            return 0;
        } else if (currentIndex % 3 === 0) {
            return 'Fizz';
        } else if (currentIndex % 5 === 0) {
            return 'Buzz';
        } else {
            return currentIndex;
        }
    });

    return mappedFizzBuzz;
}

module.exports = getMappedFizzBuzz;
