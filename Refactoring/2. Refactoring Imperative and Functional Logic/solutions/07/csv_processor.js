'use strict';

const util = require('util');
const fs = require('fs');

class CSVProcessor {
    static combineFiles (pathsToFiles, pathToOutput, headers, callback) {
        CSVProcessor.controlFlow(fs, pathsToFiles, pathToOutput, headers)
            .then(result => callback(null, result))
            .catch(callback);
    }

    static async controlFlow (fs, pathsToFiles, pathToOutput, headers) {
        if (!(pathsToFiles instanceof Array) || pathsToFiles.length === 0) {
            throw new Error('path to files must be a non-empty array');
        }

        if (typeof pathToOutput !== 'string' || pathToOutput.indexOf('.csv') === -1) {
            throw new Error('path to output should be a csv file');
        }

        if (!(headers instanceof Array) || headers.length === 0) {
            throw new Error('headers must be a non empty array');
        }

        for (let header of headers) {
            if (typeof header !== 'string') {
                throw new Error('all headers must be strings');
            }
        }

        const promisifiedWriteOutput = util.promisify(CSVProcessor.writeOutput);

        const files = await CSVProcessor.readFiles(fs, pathsToFiles);
        const result = CSVProcessor.buildCombinedFile(headers, files);
        const output = await promisifiedWriteOutput(fs, pathToOutput, result);

        return output;
    }

    static async readFiles (fs, pathsToFiles) {
        const promisifiedReadFile = util.promisify(fs.readFile.bind(fs));

        let files = [];

        for (let pathToFile of pathsToFiles) {
            if (pathToFile.indexOf('.csv') > -1) {
                let file = await promisifiedReadFile(pathToFile);

                files.push(file.toString());
            }
        }

        return files;
    }

    static buildCombinedFile (headers, files) {
        return files.reduce((combinedLines, file) => {
            let fileLines = file.split('\n');

            if (fileLines.length <= 1) {
                return combinedLines;
            }

            let fileHeaders = fileLines[0].split(',').map(fileHeader => fileHeader.trim());
            let headerMap = {};

            for (let header of headers) {
                headerMap[header] = fileHeaders.indexOf(header);
            }

            for (let fileLine of fileLines.slice(1)) {
                let lineElements = fileLine.split(',').map(fileElement => fileElement.trim());
                let newLine = [];

                for (let header in headerMap) {
                    if (headerMap[header] > -1) {
                        newLine.push(lineElements[headerMap[header]]);
                    } else {
                        newLine.push(undefined);
                    }
                }

                combinedLines.push(newLine.join(','));
            }

            return combinedLines;
        }, [headers.join(',')]);
    }

    static writeOutput (fs, pathToOutput, result, callback) {
        fs.mkdir(pathToOutput.substring(0, pathToOutput.lastIndexOf('/')), { recursive: true }, (err) => {
            if (err && err.code !== 'EEXIST') {
                return callback(err);
            }

            fs.writeFile(pathToOutput, result.join('\n'), callback);
        });
    }
}

module.exports = CSVProcessor;
