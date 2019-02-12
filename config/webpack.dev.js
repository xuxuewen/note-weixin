/* eslint import/no-extraneous-dependencies: 0 */
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.base.js');
const ip = require('ip');

const port = 3003;

module.exports = () => webpackMerge(commonConfig(), {
  devtool: 'cheap-module-source-map',
  devServer: {
    port,
    host: ip.address(),
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
    publicPath: '',
    proxy: {
      '/mobile': {
        changeOrigin: true,
        target: 'https://www.no1im.com',
        pathRewrite: { '^/mobile': '' }
      },
      '/native': {
        changeOrigin: true,
        target: 'http://192.168.60.205:9110',
        pathRewrite: { '^/native': '' }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('test')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'corelib',
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ]
});
