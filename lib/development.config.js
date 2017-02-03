const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const config = require('./common.config')
const proxy = require('./proxy')

module.exports = webpackMerge(config, {
  devtool: 'inline-source-map',
  devServer: {
    proxy: proxy,
    host: 'localhost',
    port: 3000,
    open: true,
    historyApiFallback: true,
    watchOptions: {aggregateTimeout: 300, poll: 1000}
  },  
  output: {
    path: path.resolve(process.cwd(), 'target'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id]-chunk.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {importLoaders: 1, modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' }},
          {loader: 'postcss-loader'}
        ]
      }
    ]
  },
  plugins: [
    new DefinePlugin({'process.env': {NODE_ENV: "'development'" }}),   
    new webpack.LoaderOptionsPlugin({options: {context: process.cwd(), postcss: [require('autoprefixer'), require('postcss-modules-values')]}}),    
    new HtmlWebpackPlugin({inject: true, template: path.resolve(process.cwd(), 'src/resources/index.html'), favicon: path.resolve(process.cwd(), 'src/resources/favicon.ico')})
  ]
})