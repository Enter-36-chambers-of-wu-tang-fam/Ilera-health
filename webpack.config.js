const path = require('path');
const webpack = require('webpack');

var APP_DIR = path.resolve(`${__dirname}/client/src`);
var BUILD_DIR = path.resolve(`${__dirname}client/dist`);

var config = {
<<<<<<< 324e89bc40dfbcb2f4c08f1f20ea30c2106dad76
<<<<<<< 1b64729dd5b8cf6732c45d06555a4d28700c0d51
<<<<<<< a01fa2ea55f37ece752339cd19b44658b53a2e68
<<<<<<< b937006af912ffcfbdb07a80ec5bcd9845929327
<<<<<<< 0bfd8677f9e1ddaf66ba5796be25c8fde817ac42
  devtool: 'inline-source-map',
=======
<<<<<<< f91690055fb0636abc75ed86fe1aaed85fd0d262
>>>>>>> webpack update
  entry: `${APP_DIR}/index.js`,
=======
=======
>>>>>>> allUsersProfile
  entry: APP_DIR + '/main/index.js',
=======
  entry: `${APP_DIR}/main/index.js`,
>>>>>>> viewAllProfile
=======
  entry: APP_DIR + '/index.js',
>>>>>>> physician views
=======
  entry: `${APP_DIR}/index.js`,
>>>>>>> merge fixes
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
