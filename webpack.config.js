const path = require('path');
const webpack = require('webpack');

<<<<<<< 47c680c13e6c6969629f4681de2c64e42f6968c5
var APP_DIR = path.resolve(`${__dirname}/client/src`);
var BUILD_DIR = path.resolve(`${__dirname}client/dist`);
=======
var APP_DIR = path.resolve(__dirname,'client/src');
var BUILD_DIR = path.resolve(__dirname, 'client/dist');
>>>>>>> webpack update

var config = {
<<<<<<< 0bfd8677f9e1ddaf66ba5796be25c8fde817ac42
  devtool: 'inline-source-map',
=======
<<<<<<< f91690055fb0636abc75ed86fe1aaed85fd0d262
>>>>>>> webpack update
  entry: `${APP_DIR}/index.js`,
=======
  entry: APP_DIR + '/main/index.js',
>>>>>>> webpack update
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
