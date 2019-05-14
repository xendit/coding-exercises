'use strict';

class DateLogic {
    static v1 (now, days) {
        if (!(now instanceof Date)) {
            throw new Error('now must be a date');
        }

        if (typeof days !== 'number') {
            throw new Error('number of days must be a number');
        }

        const later = new Date(now);
        later.setDate(later.getDate() + days);

        return later;
    }

    static v2 (days) {
        if (typeof days !== 'number') {
            throw new Error('number of days must be a number');
        }

        const now = new Date();

        now.setDate(now.getDate() + days);

        return now;
    }
}

module.exports = DateLogic;
