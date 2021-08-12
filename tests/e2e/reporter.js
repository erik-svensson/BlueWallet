const fs = require('fs/promises');
const path = require('path');

/**
 * Reporter producing test summary for Slack notifications
 */
class MyCustomReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  async onRunComplete(_, results) {
    const tmpDirPath = path.resolve(process.cwd(), 'artifacts', 'tmp');
    const tmpFilePath = path.resolve(tmpDirPath, 'results.json');
    const testResultsPath = path.resolve(process.cwd(), 'artifacts', 'testResult.txt');

    await fs.mkdir(tmpDirPath, { recursive: true });

    let mergedResult;

    try {
      const f = await fs.readFile(tmpFilePath, 'utf8');

      mergedResult = mergeResults(JSON.parse(f), results.testResults);
    } catch (e) {
      mergedResult = results.testResults;
    } finally {
      await fs.writeFile(tmpFilePath, JSON.stringify(mergedResult), 'utf8');
    }

    const stats = getStats(mergedResult);

    const summary = parseStatsToSummary(stats);

    await fs.writeFile(testResultsPath, summary, 'utf8');
  }
}

function mergeResults(prevRes, currRes) {
  return prevRes.map(suite => currRes.find(s => s.testFilePath === suite.testFilePath) || suite);
}

function getStats(results) {
  return results.reduce(
    (stats, suite) => {
      suite.testResults.forEach(tc => {
        stats[tc.status]++;
        if (tc.status === 'failed' && !stats.failedNames.find(name => name === tc.fullName)) {
          stats.failedNames.push(tc.fullName);
        }
      });
      return stats;
    },
    {
      passed: 0,
      failed: 0,
      pending: 0,
      failedNames: [],
    },
  );
}

function parseStatsToSummary(stats) {
  const summary = [];
  const passed = stats.failed === 0;

  summary.push(passed ? 'All tests passed!' : 'Some tests have failed!');
  summary.push('');
  summary.push(`Passed: ${stats.passed}`);
  summary.push(`Failed: ${stats.failed}`);
  summary.push(`Skipped: ${stats.pending}`);

  if (!passed) {
    summary.push(`\r\nFailed test cases:`);
    summary.push(`\t${stats.failedNames.join('\r\n\t')}`);
  }

  return summary.join('\r\n');
}

module.exports = MyCustomReporter;
