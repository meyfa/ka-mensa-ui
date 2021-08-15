'use strict'

const path = require('path')

const config = require('../')

const { IgnorePlugin, DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPreconnectPlugin = require('html-webpack-preconnect-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')

const BASE_DIR = path.join(__dirname, '../..')
const SRC_DIR = path.join(BASE_DIR, 'src')
const DST_DIR = path.join(BASE_DIR, 'dist')

module.exports = {
  context: BASE_DIR,
  entry: {
    app: [path.join(SRC_DIR, 'main.ts')]
  },
  output: {
    path: DST_DIR,
    filename: '[name].[contenthash].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource'
      }
      // css is handled separately in dev/prod
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    // Ignore all locale files of moment.js
    new IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, 'index.ejs'),
      title: 'KA Mensa',
      meta: {
        viewport: 'width=device-width, initial-scale=1'
      },
      favicon: path.join(SRC_DIR, 'assets/favicon.ico'),
      preconnect: [config.api.endpoint]
    }),
    new DefinePlugin({
      API_ENDPOINT: JSON.stringify(config.api.endpoint),
      PRIVACY_POLICY_URL: JSON.stringify(config.site.privacyPolicyUrl)
    }),
    new HtmlWebpackPreconnectPlugin(),
    new WebpackPwaManifest({
      name: 'KA Mensa',
      description: 'Mensaplan für Karlsruhe',
      scope: '/',
      start_url: '/?source=pwa',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: path.join(SRC_DIR, 'assets/icon-1024.png'),
          sizes: [128, 192, 256, 384, 512, 1024],
          purpose: 'any maskable'
        },
        {
          src: path.join(SRC_DIR, 'assets/icon-1024.png'),
          sizes: [180],
          ios: true
        }
      ],
      background_color: '#dedddc',
      theme_color: '#5f9e40',
      ios: true
    })
  ]
}
