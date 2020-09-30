const { resolve } = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');


module.exports = {
  entry: {
    index: resolve(__dirname, 'src/index.ts')
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.umd.js',
    libraryTarget: 'umd'
  },
  // 配置 loader
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ 'sass-loader'],
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'ts-loader'
        },
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ],
        include: resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 将素材文件拷贝到指定文件夹
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, 'src/style'),
          to: resolve(__dirname, 'lib/style')
        },
        {
          from: resolve(__dirname, 'src/assets'),
          to: resolve(__dirname, 'lib/assets')
        }
      ]
    }),
    new ProgressBarPlugin(),
  ],
  resolve: {
    extensions: ['.ts','.tsx', '.js', '.json']
  },
  externals:{
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  }
};
