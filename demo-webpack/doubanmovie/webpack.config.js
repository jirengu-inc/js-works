const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
  entry: {
    index: './src/index.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/')
  },
  module: {
    rules: [{
       test: /\.css$/,
       use: [
         'style-loader',
         'css-loader'
       ]
     },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader" ,"less-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  mode: 'production'
}