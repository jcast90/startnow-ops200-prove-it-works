const os = require('os');
const fs = require('fs');
const path = require('path');

/**
 * Name of the app root directory
 */
const dirName = 'oca';

/**
 * Returns the path to the root app directory
 * @returns {string}
 */
function root() {
  const home = os.homedir();
  const originRoot = path.join(home, dirName);
  return originRoot;
}

/**
 * Like native join but is appended to app root path
 * @param {string} args - one or more strings
 */
function join(...args) {
  return path.join(root(), ...args);
}

function ensureDirExists(pathToDir) {
  return fs.mkdir(pathToDir, (err) => {
    if (err && err.code === 'EEXIST') return console.log(`${pathToDir} exists`);
    if (err) return console.log(`Error creating ${pathToDir}`);
    return console.log(`${pathToDir} created`);
  });
}

ensureDirExists(root());
ensureDirExists(join('.config'));

module.exports = {
  root,
  join,
  dirName
};
