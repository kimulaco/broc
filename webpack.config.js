const path = require('path')

const entryies = [
  {
    target: 'node',
    entry: './src/broc.ts',
    output: {
      library: 'broc',
      libraryTarget: 'commonjs2',
      filename: 'broc.js',
      path: path.join(__dirname, 'dist')
    }
  },
  {
    target: 'node',
    entry: './src/broc-cli.ts',
    output: {
      library: 'broc-cli',
      libraryTarget: 'commonjs2',
      filename: 'broc-cli.js',
      path: path.join(__dirname, 'dist')
    }
  }
]

const commonConfig = {
  mode: 'production',
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
    extensions: ['.ts', '.js', '.node']
  }
}

module.exports = entryies.map((config) => {
  return Object.assign(commonConfig, config)
})
