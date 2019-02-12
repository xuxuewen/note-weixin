/* eslint import/no-extraneous-dependencies: 0 */
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
/* eslint import/no-extraneous-dependencies: 0 */
const cssnano = require('cssnano');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

module.exports = () => webpackMerge(commonConfig(), {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
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
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: false,
        keep_fnames: true
      },
      compress: {
        warnings: false,
        screw_ie8: false
      },
      comments: false
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
});
