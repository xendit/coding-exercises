'use strict';

class DateUtil {
    static getTomorrow() {
        const now = new Date(); const num = 1;
        now.setDate(now.getDate() + num);

        return now;
    }

    static formatDate(now) {
        const isDateEven = now.getDate() % 2 === 0;
        const isMonthEven = now.getMonth() % 2 === 0;

        if (isDateEven && isMonthEven) {
            return 'even';
        } else if (isDateEven) {
            return 'only date even';
        } else if (isMonthEven) {
            return 'only month even';
        } else {
            return 'all odd';
        }
    }
}

module.exports = DateUtil;