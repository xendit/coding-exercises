'use strict';

const async = require('async');
const fs = require('fs');

function generateReport (pathToCSVFiles, pathToJSONFiles, pathToOutputDirectory, callback) {
    if (!(pathToCSVFiles instanceof Array)) {
        return callback(new Error('path to csv files must be an array'));
    }

    if (!(pathToJSONFiles instanceof Array)) {
        return callback(new Error('path to JSON files must be an array'));
    }

    if (typeof pathToOutputDirectory !== 'string') {
        return callback(new Error('path to output directory must be a string'));
    }

    if (typeof callback !== 'function') {
        return callback(new Error('callback must be a function'));
    }

    async.auto({
        csv_files: function (next) {
            let index = 0;
            let csvFiles = [];

            async.whilst(() => index < pathToCSVFiles.length, (next) => {
                fs.readFile(pathToCSVFiles[index], (err, file) => {
                    if (err) {
                        return next(err);
                    }

                    csvFiles.push(file.toString());

                    index += 1;

                    next(null);
                });
            }, (err) => {
                if (err) {
                    return next(err);
                }

                next(null, csvFiles);
            });
        },
        json_files: function (next) {
            let index = 0;
            let jsonFiles = [];

            async.whilst(() => index < pathToJSONFiles.length, (next) => {
                fs.readFile(pathToJSONFiles[index], (err, file) => {
                    if (err) {
                        return next(err);
                    }

                    jsonFiles.push(JSON.parse(file.toString()));

                    index += 1;

                    next(null);
                });
            }, (err) => {
                if (err) {
                    return next(err);
                }

                next(null, jsonFiles);
            });
        },
        jsonified_csv_data: ['csv_files', (results, next) => {
            if (results.csv_files.length === 0) {
                return next(null);
            }

            const jsonifiedCSVData = results.csv_files.map(csvFile => {
                const csvLines = csvFile.split('\n');
                const csvHeaderLine = csvLines[0];
                const csvHeaders = csvHeaderLine.split(',');

                const jsonData = csvLines.slice(1).map(csvLine => {
                    const csvElements = csvLine.split(',');

                    const csvJSONData = {};

                    csvElements.forEach((csvElement, i) => {
                        csvJSONData[csvHeaders[i]] = csvElement;
                    });

                    return csvJSONData;
                });

                return jsonData;
            });

            return next(null, jsonifiedCSVData);
        }],
        report: ['json_files', 'jsonified_csv_data', (results, next) => {
            if (results.jsonified_csv_data === undefined) {
                return next(new Error('There is no jsonified csv data'));
            }

            const totalFilesCount = results.json_files.length + results.csv_files.length;

            let totalObjectsCount = 0;

            for (let jsonFile of results.json_files) {
                if (jsonFile instanceof Array) {
                    totalObjectsCount += jsonFile.length;
                } else {
                    totalObjectsCount += 1;
                }
            }

            for (let jsonifiedCSVData of results.jsonified_csv_data) {
                totalObjectsCount += jsonifiedCSVData.length;
            }

            const htmlReport = `<html><head></head><body><h1>Number of Files</h1><div>There are ${totalFilesCount} files!</div><h2>Number of objects/lines</h2><div>There are ${totalObjectsCount} objects!</div></body>`;

            fs.mkdir(`${pathToOutputDirectory}/output`, { recursive: true }, (err) => {
                if (err && err.code !== 'EEXIST') {
                    return next(err);
                }

                fs.writeFile(`${pathToOutputDirectory}/output/report.html`, htmlReport, next);
            });
        }],
        csv_report: ['csv_files', (results, next) => {
            let totalCSVFileCount = results.csv_files.length;
            let totalCSVFileHeaders = {};

            for (let csvFile of results.csv_files) {
                let headerElements = csvFile.split('\n')[0].split(',');

                headerElements.forEach(headerElement => {
                    totalCSVFileHeaders[headerElement] = true;
                });
            }

            const htmlReport = `<html><head></head><body><h1>Number of CSV files</h1><div>There are ${totalCSVFileCount} files!</div><h2>Number of Unique Keys</h2><div>There are ${Object.keys(totalCSVFileHeaders).length} unique keys</div><h3>List of Keys</h3><div><ul>${Object.keys(totalCSVFileHeaders).map(header => `<li>${header}</li>`).join('')}</ul></body>`;

            fs.mkdir(`${pathToOutputDirectory}/output`, { recursive: true }, (err) => {
                if (err && err.code !== 'EEXIST') {
                    return next(err);
                }

                fs.writeFile(`${pathToOutputDirectory}/output/csv_report.html`, htmlReport, next);
            });
        }]
    }, function (err, results) {
        if (err) {
            return callback(err);
        }

        callback(null, results.jsonified_csv_data);
    });
}

module.exports = generateReport;
