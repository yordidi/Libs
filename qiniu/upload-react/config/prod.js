const resolve = require('path').resolve;
const webpack = require('webpack');
const webpackMerge = require('webpack-merge')
const commonConfig = require('./base')

module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    context: resolve(__dirname, '../src'),

    entry: './index.js',

    devtool: 'cheap-source-map',
    plugins: [
      new webpack.LoaderOptionsPlugin({
          minimize: true,
          debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
          beautify: false,
          mangle: {
              screw_ie8: true,
              keep_fnames: true
          },
          compress: {
              screw_ie8: true
          },
          comments: false
      })
    ],
  })
};