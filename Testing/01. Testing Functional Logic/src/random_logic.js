'use strict';

class RandomLogic {
    static v1 (multiplier) {
        if (typeof multiplier !== 'number') {
            throw new Error('multiplier must be a number');
        }

        const random = Math.random();

        return random * multiplier;
    }

    static v2 (random, multiplier) {
        if (typeof random !== 'number') {
            throw new Error('random must be a number');
        }

        if (typeof multiplier !== 'number') {
            throw new Error('multiplier must be a number');
        }

        return random * multiplier;
    }

    static v3 (getRandom, multiplier) {
        if (typeof random !== 'function') {
            throw new Error('getRandom must be a function');
        }

        if (typeof multiplier !== 'number') {
            throw new Error('multiplier must be a number');
        }

        return getRandom() * multiplier;
    }

    static v4 (Math, multiplier) {
        if (typeof Math !== 'object' || typeof Math.random !== 'function') {
            throw new Error('Math must have a random function');
        }

        if (typeof multiplier !== 'number') {
            throw new Error('multiplier must be a number');
        }

        const random = Math.random();

        return random * multiplier;
    }
}

module.exports = RandomLogic;