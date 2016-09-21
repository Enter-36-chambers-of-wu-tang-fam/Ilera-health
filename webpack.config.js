const path = require('path');
const webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, 'client/src');
var BUILD_DIR = path.resolve(__dirname, 'client/dist');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
            presets: ['react', 'es2015']
        }
      }
    ]
  }
  
};

module.exports = config;