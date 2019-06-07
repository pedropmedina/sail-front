/* eslint-disable no-console */
const TerserJsPlugin = require('terser-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = env => {
  console.log({ mode: env.mode });
  return {
    devtool: 'hidden-source-map',
    optimization: {
      minimizer: [new TerserJsPlugin({}), new OptimizeCssPlugin({})]
    }
  };
};
