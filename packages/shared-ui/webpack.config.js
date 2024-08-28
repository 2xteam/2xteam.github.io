const path = require('path');
const webpack = require('webpack');
const { argv } = require('yargs');

module.exports = () => {
  return {
    mode: 'development',
    watch: argv.env === "dev" ? true : false,
    entry: path.resolve(__dirname, './src', 'index.js'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'shared-ui.js',
      clean: true,
      globalObject: 'this',
      library: {
        name: 'SharedUI',
        type: 'umd',
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(tsx|ts|jsx|js)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: `Build Date: ${new Date().toLocaleString()}`,
      }),
    ],
    externals: {
      react: 'react'
    },
  };
};
