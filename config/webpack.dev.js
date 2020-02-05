'use strict'

const merge = require('webpack-merge')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['vue-style-loader', 'css-loader'] }
    ]
  }
})
