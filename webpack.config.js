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
    filename: '[name].js',
    publicPath: "http://localhost:8080/dist/"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ]
  },
  plugins: debug ? [
    new webpack.NamedModulesPlugin(),
  ] : [
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false, minimize: true, compress: { warnings: false } }),
      new webpack.EnvironmentPlugin(['NODE_ENV'])
    ]
}
