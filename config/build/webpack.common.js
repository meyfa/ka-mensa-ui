'use strict'

const path = require('path')

const config = require('../')

const { DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const BASE_DIR = path.join(__dirname, '../..')
const SRC_DIR = path.join(BASE_DIR, 'src')
const DST_DIR = path.join(BASE_DIR, 'dist')

module.exports = {
  context: BASE_DIR,
  entry: {
    app: [path.join(SRC_DIR, 'main.js')]
  },
  output: {
    path: DST_DIR,
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: 'vue-loader' },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
          // options: { esModule: true }, // not yet supported
        }
      },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      // css is handled separately in dev/prod
      {
        test: /\.(png|svg|jpg)$/,
        use: {
          loader: 'file-loader',
          options: { esModule: false } // needs html-loader support
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: { esModule: true }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      hash: true,
      xhtml: true,
      template: path.join(SRC_DIR, 'index.ejs'),
      title: 'KA Mensa',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      }
    }),
    new DefinePlugin({
      API_ENDPOINT: JSON.stringify(config.api.endpoint)
    })
  ]
}
