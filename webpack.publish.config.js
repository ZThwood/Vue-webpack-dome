const path = require('path');

// 导入插件
const htmlWebpackPlugin = require('html-webpack-plugin')
// 导入clean-webpack-plugin插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')


module.exports = {
  entry: {
    app: './src/index.js',//入口，要打包的文件
    vendors: ['jquery'] //第三方包名称，vendors是自定义名称，分离用
  },
  output: { //输出文件
    filename: 'bundle.js',  //打包好的文件名称
    path: path.resolve(__dirname, 'dist') //指定打包到哪里
  },
  devServer: {
    open: true,
    port: 3000,
    // contentBase: 'dist',
    hot: true
  },
  plugins: [  //任何插件都放这里
    new htmlWebpackPlugin({
      template: path.join(__dirname, './dist/index.html'), //指定模板页面到内存生成
      filename: 'index.html', //指定生成页面的名称
      minify:{   //html 压缩选项
        removeComments: true,  //去除注释
        collapseWhitespace: true, //合并空白字符
        removeAttributeQuotes: true //移除属性节点的引号
      }
    }),
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'css/styles.css'
    }),
    new OptimizeCssAssetsPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          filename: 'js/vendors.js',
          chunks: "all"
        }
      }
    }
  },
  module: { //这个节点用于配置所有第三方 模块加载器（loader）
    rules: [//所有第三方模块的匹配规则
      { test: /\.css$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader'],
        publicPath:'../'
      })},//配置成立.css文件的规则
      { test: /\.less$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader'],
        publicPath:'../'
      })},
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=97,490&name=images/[hash:8]-[name].[ext]'] },
      { test: /\.(ttf|woff|woff2|eot|svg)$/, use: 'url-loader' },//url-loader也可以处理字体文件
      //配置 babel
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
