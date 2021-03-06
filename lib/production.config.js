const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const common = require('./common.config')

module.exports = webpackMerge(common, {
  bail: true,
  devtool: 'source-map',
  output: {
    path: path.resolve(process.cwd(), 'target'),
    filename: '[name]-[hash].min.js',
    sourceMapFilename: '[name]-[hash].map',
    chunkFilename: '[id]-[chunkhash].js'
  },
  module: {
  // TODO: use webpack old syntax to compatible with ExtractTextPlugin
  // https://github.com/webpack/extract-text-webpack-plugin/issues/275
    rules: [
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader?modules&localIdentName=[name]__[local]&minimize&sourceMap&importLoaders=2', 'postcss-loader']
      })
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(process.cwd(), 'src/resources/index.html'),
      favicon: path.resolve(process.cwd(), 'src/resources/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new CleanWebpackPlugin(['target'], {root: path.resolve(process.cwd()), exclude: '.gitignore'}),
    new DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new UglifyJsPlugin({compressor: {screw_ie8: true, warnings: false}, mangle: {screw_ie8: true}, output: {comments: false, screw_ie8: true}, sourceMap: true}),
    new webpack.LoaderOptionsPlugin({ options: { context: process.cwd(), postcss: [ require('autoprefixer'), require('postcss-modules-values')]}})
  ]
})