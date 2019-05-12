'use strict';

const request = require('request-promise');

async function getAverageDivCount (urls) {
    if (!(urls instanceof Array)) {
        throw new Error('urls must be an array');
    }

    for (let url of urls) {
        if (typeof url !== 'string' || (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0)) {
            throw new Error('urls must be valid strings');
        }
    }

    let responseBodies = [];

    for (let url of urls) {
        let responseBody;

        try {
            responseBody = await request(url);

            responseBodies.push(responseBody);
        } catch (err) {
            throw new Error('request could not be made');
        }
    }

    const divCounts = responseBodies.map(responseBody => {
        return (responseBody.match(/<\/div>/g) || []).length;
    });

    const divSum = divCounts.reduce((sum, divCount) => sum + divCount, 0);

    return divSum / divCounts.length;
}

module.exports = getAverageDivCount;
