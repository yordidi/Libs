const resolve = require('path').resolve;
const webpack = require('webpack');
const webpackMerge = require('webpack-merge')
const commonConfig = require('./base')

module.exports = function(env) {
  return webpackMerge(commonConfig(env), {
    context: resolve(__dirname, '../src'),

    entry: {"index":[
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://0.0.0.0:8090',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      './index.js'
      // the entry point of our app
    ]},
    output: {
      publicPath: '/'
      // necessary for HMR to know where to load the hot update chunks
    },

    devtool: 'inline-source-map',

    devServer: {
      host: "0.0.0.0",
      hot: true,
      // enable HMR on the server

      contentBase: resolve(__dirname, '../'),
      // match the output path

      publicPath: '/',
      // match the output `publicPath`
      historyApiFallback: true,
      "proxy": {
        "/api": {
            target: "http://gank.io",
            changeOrigin: true
          },
        "/uptoken": {
          target: "http://127.0.0.1:3000",
          changeOrigin: true
        }
      },
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      // enable HMR globally

      new webpack.NamedModulesPlugin(),
      // prints more readable module names in the browser console on HMR updates

    ],
  })
};