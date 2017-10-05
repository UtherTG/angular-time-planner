let
  path = require('path'),
  config = require('./webpack.config'),
  releaseConfig;

releaseConfig = {
  output: {
    filename: 'angular-time-planner.min.js',
    path: path.resolve(__dirname, 'release'),
    library: 'angularTimePlanner',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'source-map',
  externals: {
    'angular': 'angular'
  }
};

module.exports = Object.assign(config, releaseConfig);
