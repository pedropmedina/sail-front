/* eslint-disable no-console */
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = env => {
  console.log({ mode: env.mode });
  return {
    devtool: 'cheap-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, '..', 'build'),
      historyApiFallback: true,
      port: 3000,
      hot: true,
      overlay: true
    },
    plugins: [new BundleAnalyzerPlugin({ analyzerPort: 8888 })]
  };
};
