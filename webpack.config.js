const path = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/broc.ts',
  output: {
    library: 'broc',
    libraryTarget: 'commonjs2',
    filename: 'broc.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'eslint-loader'],
        exclude: /(node_modules|dist|test)/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  }
}
