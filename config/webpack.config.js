const webpack = require('webpack');
const path = require('path');
const paths = require('./paths');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
	  app: path.resolve(paths.appSrc, 'index.js'),
	  vendor:["react","react-dom"]
	},

	output: {
	  filename: '[name].bundle.js',
	  path: path.resolve(paths.appBuild),
	},

	resolve: {
	  extensions: ['.js','.json','.jsx']
	},

	module: {
	  rules:[
	    {
		  test: /\.(js|jsx)$/,
		  include: paths.appSrc,
		  loader: require.resolve('babel-loader'),
		  options: {
		    presets: ["es2015","react"]
		  }
		},
	  ]
	},
	plugins:[
	  new CleanWebpackPlugin([paths.appBuild]),
	  new webpack.optimize.CommonsChunkPlugin({
	    names: ["common", "vendor", "runtime"],
		minChunks: 2
	  }),
	  new HtmlWebpackPlugin({
	    template: path.resolve(paths.appSrc, 'index.html')
	  })
	]
}



