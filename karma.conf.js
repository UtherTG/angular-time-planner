let webpackTestsConfig = require('./webpack-test.config');

module.exports = function(config) {
  config.set({
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
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
};
