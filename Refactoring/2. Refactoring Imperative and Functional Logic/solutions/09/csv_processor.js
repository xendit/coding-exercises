'use strict';

const util = require('util');
const fs = require('fs');

class CSVProcessor {
    static async combineFiles (pathsToFiles, pathToOutput, headers) {
        await CSVProcessor.controlFlow(fs, pathsToFiles, pathToOutput, headers);
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

        const files = await CSVProcessor.readFiles(fs, pathsToFiles);
        const result = CSVProcessor.buildCombinedFile(headers, files);
        const output = await CSVProcessor.writeOutput(fs, pathToOutput, result);

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

    static async writeOutput (fs, pathToOutput, result) {
        const promisifiedMkdir = util.promisify(fs.mkdir.bind(fs));
        const promisifiedWriteFile = util.promisify(fs.writeFile.bind(fs));

        try {
            await promisifiedMkdir(pathToOutput.substring(0, pathToOutput.lastIndexOf('/')), { recursive: true });
        } catch (err) {
            if (err.code !== 'EEXIST') {
                throw err;
            }
        }

        await promisifiedWriteFile(pathToOutput, result.join('\n'));
    }
}

module.exports = CSVProcessor;
