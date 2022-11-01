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
