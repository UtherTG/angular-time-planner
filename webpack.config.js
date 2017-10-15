'use strict';

let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/angular-time-planner.js',
  externals: {angular: {root: 'angular', amd: 'angular', commonjs2: 'angular', commonjs: 'angular'}},
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            conservativeCollapse: false
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('angular-planner.css')
  ]
};
