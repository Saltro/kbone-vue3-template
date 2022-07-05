import path from 'path';
import url from 'url';
import webpack from 'webpack';
import { VueLoaderPlugin } from 'vue-loader';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MpPlugin from 'mp-webpack-plugin'; // 用于构建小程序代码的 webpack 插件
import mpConfig from './mp.config.js'; //

const isOptimize = false; // 是否压缩业务代码，开发者工具可能无法完美支持业务代码使用到的 es 特性，建议自己做代码压缩
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'production',
  entry: {
    page1: path.resolve(__dirname, 'src/page1/index.js'),
    page2: path.resolve(__dirname, 'src/page2/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/mp/common'), // 放到小程序代码目录中的 common 目录下，目录名不可修改
    filename: '[name].js', // 必需字段，不能修改
    library: 'createApp', // 必需字段，不能修改
    libraryExport: 'default', // 必需字段，不能修改
    libraryTarget: 'window', // 必需字段，不能修改
  },
  target: 'web', // 必需字段，不能修改
  optimization: {
    runtimeChunk: false, // 必需字段，不能修改
    splitChunks: {
      // 代码分隔配置，不建议修改
      chunks: 'all',
      minSize: 1000,
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: '~',
      name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: isOptimize
      ? [
          // 压缩CSS
          new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.(css|wxss)$/g,
            cssProcessorPluginOptions: {
              preset: [
                'default',
                {
                  discardComments: {
                    removeAll: true,
                  },
                  minifySelectors: false, // 因为 wxss 编译器不支持 .some>:first-child 这样格式的代码，所以暂时禁掉这个
                },
              ],
            },
            canPrint: false,
          }),
          // 压缩 js
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            parallel: true,
          }),
        ]
      : [],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    new MpPlugin(mpConfig),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.isMiniprogram': process.env.isMiniprogram, // 注入环境变量，用于业务代码判断
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].wxss',
    }),
  ],
};
