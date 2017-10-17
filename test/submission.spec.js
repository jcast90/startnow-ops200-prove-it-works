const expect = require('chai').expect;
const runTests = require('./lib/runTests');

describe('startnow-ops200-prove-it-works student tests', function testception() {
  this.timeout(30000);

  let output = [];

  before(() => runTests('startnow-ops200-prove-it-works').then(({ stdout }) => output = stdout));

  it('should contain at least 8 passing e2e tests', () => {
    const suiteTitleIndex = output.findIndex(line => line.toLowerCase().includes('end to end'));
    const resultIndex = output.slice(suiteTitleIndex).findIndex(line => line.includes('8 passing')) + suiteTitleIndex;

    expect(parseInt(output[resultIndex].trim().split(' ')[0])).to.be.gte(8);
  });

  it('should contain at least 12 passing unit tests', () => {
    const suiteTitleIndex = output.findIndex(line => line.toLowerCase().includes('calculator') || line.toLowerCase().includes('mortgage'));
    const resultIndex = output.slice(suiteTitleIndex).findIndex(line => line.includes('12 passing')) + suiteTitleIndex;

    expect(parseInt(output[resultIndex].trim().split(' ')[0])).to.be.gte(12);
  });
});
