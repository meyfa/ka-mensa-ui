const path = require('path')

const presets = ['@babel/env']
const plugins = [
  ['babel-plugin-root-import', {
    rootPathSuffix: path.join(__dirname)
  }],
  ['@babel/transform-runtime']
]

module.exports = { presets, plugins }
