'use strict'

const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

const common = require('./webpack.common.js')

// 5 MiB
const SW_MAX_FILE_SIZE = 5 * 1024 * 1024

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          {
            loader: 'css-loader',
            options: {
              esModule: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: SW_MAX_FILE_SIZE,
      ignoreURLParametersMatching: [/^source$/]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      '...', // use defaults
      new CssMinimizerPlugin()
    ]
  }
})
