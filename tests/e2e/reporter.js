const fs = require('fs');
const path = require('path');

/**
 * Reporter producing test summary for Slack notifications
 */
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(_, results) {
    // NOTE: https://github.com/facebook/jest/issues/6924
    // const passed = results.success;
    const passed = results.numFailedTests === 0;

    const str = [];

    str.push(passed ? 'All tests passed!' : 'Some tests have failed!');
    str.push('');
    str.push(`Passed: ${results.numPassedTests}`);
    str.push(`Failed: ${results.numFailedTests}`);
    str.push(`Skipped: ${results.numPendingTests}`);

    if (!passed) {
      const failedTests = results.testResults
        .filter(suite => suite.numFailingTests > 0)
        .flatMap(suite => suite.testResults.filter(tc => tc.status === 'failed').map(tc => tc.fullName));

      str.push(`\r\nFailed test cases:`);
      str.push(`\t${failedTests.join('\r\n\t')}`);
    }

    fs.writeFileSync(path.resolve(process.cwd(), 'artifacts', 'testResult.txt'), str.join('\r\n'), 'utf8');
  }
}

module.exports = MyCustomReporter;
