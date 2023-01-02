const path = require('path');
const solc = require('solc');
const fsx = require('fs-extra');
const fs = require('fs');
// Get a path to the build folder. Gets us into ethereum directory
const buildPath = path.resolve(__dirname, 'build');

//then remove everything in buildPath and everything inside of it.
fsx.removeSync(buildPath);

//
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
// read in source code from that file.
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// creates build folder if it does not exist
fsx.ensureDirSync(buildPath);

// output has 2 contracts: Campaign and Campaign Factory
// iterate over each key
for (const contract in output) {
    fsx.writeJsonSync(
        path.resolve(buildPath, `${contract.replace(':','')}.json`),
        output[contract]);
}