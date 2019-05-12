'use strict';

function buildPaddedBinaryIPV4Address (ipAddress) {
    if (typeof ipAddress !== 'string') {
        throw new Error('ip address should be a string');
    }

    const ipAddressOctets = ipAddress.split('.').map(octet => Number(octet));

    if (ipAddressOctets.length !== 4) {
        throw new Error('ip address should have 4 octets');
    }

    for (let ipAddressOctet of ipAddressOctets) {
        if (ipAddressOctet < 0 || ipAddressOctet > 255) {
            throw new Error('ip address octet should be a number between 0 and 255');
        }
    }

    return ipAddressOctets.map(octet => {
        let binaryOctet = octet.toString(2);

        let paddingLength = 8 - binaryOctet.length;

        return Array.from({ length: paddingLength }, () => '0').join('') + binaryOctet;
    }).join('.');
}

module.exports = buildPaddedBinaryIPV4Address;
