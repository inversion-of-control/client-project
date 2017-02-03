const path = require('path')
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

module.exports = {
  entry: {
    'application': ['./src/main/index.js'],
    'vendors': ['inferno']
  },
  resolve: {
    extensions: ['.js','.jsx', '.css'],
    modules: ['node_modules'],
    alias: {
      component: path.resolve(process.cwd(), 'src/main/component'),
      feature: path.resolve(process.cwd(), 'src/main/feature'),
      state: path.resolve(process.cwd(), 'src/main/state'),
      theme: path.resolve(process.cwd(), 'src/main/theme')
        }
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=static/fonts/[name].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new CommonsChunkPlugin({name: ['application', 'vendors'], minChunks: Infinity})
  ]
}