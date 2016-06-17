var webpack = require('webpack')
var HTMLWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, '/src/index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3002',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src')
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      // {
      //   test: /\.(jpe?g|svg|ico|png|gif|mp4|webm|ogv)$/,
      //   include: /assets/,
      //   exclude: /node_modules/,
      //   loader: 'file-loader?name=[hash:6].[ext]'
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      },
      {
        test: /\.scss$/,
        include: /styles/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  },
  plugins: [
    HTMLWebpackPluginConfig,
    new ExtractTextPlugin('css/style.css'),
    new webpack.HotModuleReplacementPlugin()
  ]
}
