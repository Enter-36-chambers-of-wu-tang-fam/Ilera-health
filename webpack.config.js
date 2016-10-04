const path = require('path');
const webpack = require('webpack');

<<<<<<< 0b11a65c185d5e25b16e09799397ed8ac70b9654
var APP_DIR = path.resolve(`${__dirname}/client/src`);
var BUILD_DIR = path.resolve(`${__dirname}/client/dist`);

var config = {
  devtool: 'inline-source-map',
  entry: `${APP_DIR}/index.js`,
=======
var APP_DIR = path.resolve(__dirname,'client/src/');
var BUILD_DIR = path.resolve(__dirname, 'client/dist');

var config = {
  entry: `${APP_DIR}/main/index.js`,
>>>>>>> viewAllProfile
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
            presets: ['react', 'es2015', 'stage-1']
        }
      }
    ]
  }

};

module.exports = config;
