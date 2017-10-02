const webpack = require('webpack')
const path = require('path')

var debug = process.env.NODE_ENV !== "production";

module.exports = {
  devtool: debug ? 'source-map' : false,
  entry: {
    'app': [
      'babel-polyfill',
      'react-hot-loader/patch',
      './src/index'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: debug ? [
    new webpack.NamedModulesPlugin(),
  ] : []
}
