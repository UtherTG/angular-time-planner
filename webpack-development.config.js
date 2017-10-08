let
  path = require('path'),
  config = require('./webpack.config'),
  devConfig;

devConfig = {
  output: {
    filename: 'angular-time-planner.js',
    path: path.resolve(__dirname, 'release'),
    library: 'angularTimePlanner',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    poll: true
  }
};

module.exports = Object.assign(config, devConfig);
