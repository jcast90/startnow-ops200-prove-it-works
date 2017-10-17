/* eslint no-param-reassign: 0 */
const { spawn } = require('child_process');
const EOL = require('os').EOL;
const localPath = require('./localPath');
const path = require('path');

/**
 * Flatten output arrays where some of the string in an array still hold new lines
 * @param {string[]} output - Array of output from stdout or stderr
 */
function outputToArray(output) {
  return output.join(EOL).replace(/\r\n/g, '\n').split('\n');
}

/**
 * Runs npm test using project directory as root
 * @param {string} pathToProject - full path to project from root
 * @param {string} pathToNpm - full path to npm executable (.cmd on win) from root
 */
function executeTests(pathToProject) {
  return new Promise((resolve) => {
    // add local bin to path if not on windows
    if (process.platform !== 'win32') {
      process.env.PATH += `${path.delimiter}/usr/local/bin`;
    }

    const npm = spawn('npm', ['run submit', '--prefix', pathToProject], { shell: true });

    const stdout = [];
    const stderr = [];

    npm.stdout.on('data', data => stdout.push(data.toString()));
    npm.stderr.on('data', data => stderr.push(data.toString()));

    npm.on('error', error => resolve({
      testPassed: false,
      stdout: outputToArray(stdout),
      stderr: outputToArray(stderr),
      error
    }));

    npm.on('close', code => resolve({
      testPassed: (code === 0),
      stdout: outputToArray(stdout),
      stderr: outputToArray(stderr),
      error: null
    }));
  });
}

function runTests(projectName) {
  const pathToProject = localPath.join(projectName);

  return executeTests(pathToProject);
}

module.exports = runTests;
