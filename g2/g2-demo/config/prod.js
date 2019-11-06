const {resolve} = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    context: resolve(__dirname, '../src'),
    entry: {
      index: './index.js',
      reactDOM: 'react-dom',
      react: 'react'
    },
    output: {
      filename: '[name].[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //resolve-url-loader may be chained before sass-loader if necessary
            use: [ 'css-loader', 
                 'sass-loader', 
                 'postcss-loader'
                ]
          })
        }
      ]
    },
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
      }),
      new ExtractTextPlugin("styles.css"),
      new webpack.optimize.CommonsChunkPlugin({
          names: ['reactDOM', 'react'], // Specify the common bundle's name.
          filename: '[name].js'
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: resolve(__dirname, "../views/index.html"),
        chunks:  ['index', 'react', 'reactDOM']
      })
    ],
  })
};