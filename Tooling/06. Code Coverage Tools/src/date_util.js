'use strict';

class DateUtil {
    static getTomorrow() {
        const now = new Date();
        now.setDate(now.getDate() + 1);

        return now;
    }
}

module.exports = DateUtil;