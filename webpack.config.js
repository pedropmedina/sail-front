const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const loadEnv = env => require(`./build-utils/webpack.${env.mode}`)(env);

module.exports = (env = { mode: 'production', presets: [] }) => {
  const devMode = env.mode === 'development';

  return merge(
    {
      mode: env.mode,
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            use: { loader: 'babel-loader' },
            include: path.resolve(__dirname, 'src')
          },
          {
            test: /\.html$/,
            use: { loader: 'html-loader' }
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: devMode
                }
              },
              'css-loader'
            ]
          },
          {
            test: /\.(jpg|png|gif)$/,
            use: { loader: 'file-loader' }
          },
          {
            test: /\.svg$/,
            use: [
              { loader: '@svgr/webpack', options: { icon: true } },
              { loader: 'url-loader' }
            ]
          }
        ]
      },
      plugins: [
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
          filename: devMode ? '[name].css' : '[name].[hash].css',
          chunkFilename: devMode ? '[id].css' : '[id].[hahs].css'
        }),
        new HTMLPlugin({ template: './public/index.html' }),
        new webpack.EnvironmentPlugin({
          MAPBOX_TOKEN:
            'pk.eyJ1IjoicGVkcm9wbWVkaW5hIiwiYSI6ImNqdzQ1ZHR3dDFiOTk0MHBzNzl1MGhkdjEifQ._BtibRIagOlzgXg1tat1Yg'
        }),
        new CleanWebpackPlugin()
      ]
    },
    loadEnv(env)
  );
};
