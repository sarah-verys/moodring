var webpack = require('webpack');
var weFeelAPI = require('./weFeelAPI');
var webpackConfig = require('../webpack.config');
var WebpackDevServer = require('webpack-dev-server');

var compiler = webpack(webpackConfig);
new WebpackDevServer(compiler, {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  proxy: {
    '/weFeel': 'http://localhost:7676'
  },
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  },
  quiet: false,
  noInfo: false,
  historyApiFallback: true
})
  .listen(3002, 'localhost', function(err) {
    if (err) {
      return console.log(err);
    }
    return console.log('Dev server listening on localhost:3002');
  });
