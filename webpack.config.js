var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

var config = {
  entry: ['webpack-dev-server/client?http://localhost:8080', path.resolve(__dirname, 'app/main.js')],
  devtool: 'eval-source-map',
  output: {
    path: path.resolve(__dirname, "build"),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.js$/,
      loader: 'babel?optional=es7.decorators',
      exclude: node_modules
    }]
  }
};

module.exports = config;
