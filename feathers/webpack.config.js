const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',

  entry: {
    frontend: path.resolve(__dirname, 'src', 'resources', 'frontend.js')
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: 'public/',
    filename: '[name].min.js'
  }
};
