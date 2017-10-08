let
  config = require('./webpack.config'),
  testsConfig;

testsConfig = {
  devtool: 'cheap-module-inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|\.spec\.js$)/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: ['null-loader']
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
  plugins: []
};

module.exports = Object.assign({}, config, testsConfig);
