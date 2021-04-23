const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' 
      }
    ]
  },
  devtool: 
    // 'cheap-module-eval-source-map'
    'inline-source-map',
  devServer: {
    // contentBase: path.join(__dirname, 'public'),
    historyApiFallback: true
  },
  performance: {
    hints: false,
 },
  plugins: [
    new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "index.html"
    }),
  ]
}