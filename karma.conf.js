const webpackTestsConfig = require('./webpack-test.config');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
  const configuration = {
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      './**/tests/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      './**/tests/*.spec.js': ['webpack', 'sourcemap']
    },
    ngHtml2JsPreprocessor: {
      moduleName: 'templates'
    },
    webpack: webpackTestsConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    autoWatchBatchDelay: 300,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    singleRun: true,
    concurrency: Infinity
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['Chrome_travis_ci'];
  }

  config.set(configuration);
};
