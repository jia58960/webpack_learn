const webpack = require('webpack')
const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "styles/[name].css",
  disable: process.env.NODE_ENV === "development"
});
module.exports = {
  entry: {
    index: './assets/scripts/index',
    vendor: ['vue']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/, // 文件名的正则验证
      include: [path.resolve(__dirname, 'assets')],  // 包含的目录
      loader: "babel-loader"
    }, {
      test: /\.less$/,
      use: extractLess.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }]
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    extractLess,
    new HtmlWebpackPlugin({
      title: 'Just a webpack demo',
      template: 'index.html',
      filename: 'index.html',
      inject: true,
      path: '/static',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "runtime"],
      minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: true
    })]
  }