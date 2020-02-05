'use strict'

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const BASE_DIR = path.join(__dirname)
const SRC_DIR = path.join(BASE_DIR, 'src')
const DST_DIR = path.join(BASE_DIR, 'dist')

module.exports = {
  mode: 'production',
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
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] }
      // css is handled separately in dev/prod
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].style.css'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      xhtml: true,
      template: path.join(SRC_DIR, 'index.ejs'),
      title: 'KA Mensa',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      }
    })
  ]
}
