// const isDev = process.env.NODE_ENV === 'development';
// const webpack = require('webpack');

// module.exports = {
//   mode: isDev ? 'development' : 'production',
//   entry: ['./src/index.js'],
//   output: {
//     path: __dirname,
//     filename: './public/bundle.js',
//   },
//   resolve: {
//     extensions: ['.js', '.jsx', '.ts', '.tsx'],
//     modules: ['client', 'node_modules'],
//   },

//   devtool: 'source-map',
//   watchOptions: {
//     ignored: /node_modules/,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//       },
//     ],
//   },
// };

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.(t|j)sx*$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    path: __dirname,
    filename: './public/bundle.js',
  },
};
