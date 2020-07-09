const path = require('path');

// 导入插件
const htmlWebpackPlugin = require('html-webpack-plugin')
// 导入clean-webpack-plugin插件，每次打包清除dist目录的老文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 压缩css插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//允许以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件 （.vue）
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: {
    app: './src/index.js',//入口，要打包的文件
    vendors: ['jquery','vue','vuex','vue-router','axios','mint-ui'] //第三方包名称，vendors是自定义名称，分离用
  },
  output: { //输出文件
    filename: 'bundle.js',  //打包好的文件名称
    path: path.resolve(__dirname, 'dist') //指定打包到哪里
  },
  devServer: {  //npm run dev 运行配置
    open: true,
    port: 3000,
    // contentBase: 'dist',
    hot: true
  },
  plugins: [  //任何插件都放这里
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), //指定模板页面到内存生成
      filename: 'index.html', //指定生成页面的名称
      minify:{   //html 压缩选项
        removeComments: true,  //去除注释
        collapseWhitespace: true, //合并空白字符
        removeAttributeQuotes: true //移除属性节点的引号
      }
    }),
    new CleanWebpackPlugin(), 
    new ExtractTextPlugin({  //css打包，配合路由表使用
      filename: 'css/styles.css'//css打包路径
    }),
    new OptimizeCssAssetsPlugin(),
    new VueLoaderPlugin()
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
      { test: /\.css$/, use: ExtractTextPlugin.extract({//配合css抽离
        fallback: 'style-loader',
        use: ['css-loader'],
        publicPath:'../'
      })},//配置成立.css文件的规则
      { test: /\.less$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader'],
        publicPath:'../'
      })},
      { test: /\.scss$/, use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
        publicPath:'../'
      })},
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=97,490&name=[hash:8]-[name].[ext]'] },
      { test: /\.(ttf|woff|woff2|eot|svg)$/, use: 'url-loader' },//url-loader也可以处理字体文件
      //配置 babel
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.vue$/, use: ['vue-loader'] }
    ]
  }
}
