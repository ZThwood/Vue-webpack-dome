const path = require('path');

// 导入插件
const htmlWebpackPlugin = require('html-webpack-plugin')
//vue
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js', //入口要打包的文件
  output: { //输出文件
    filename: 'bundle.js',  //打包好的文件名称
    path: path.resolve(__dirname, 'dist') //指定打包到哪个文件夹
  },
  devServer: {
    open: true,
    port: 3000,
    // contentBase: 'dist',
    hot: true
    // host: "192.168.137.1"
  },
  plugins: [  //任何插件都放这里
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'), //指定模板页面到内存生成
      filename: 'index.html' //指定生成页面的名称
    }),
    new VueLoaderPlugin()
  ],
  module: { //这个节点用于配置所有第三方 模块加载器（loader）
    rules: [//所有第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },//配置成立.css文件的规则
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },

      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: ['url-loader?limit=97,490&name=[hash:8]-[name].[ext]'] },
      { test: /\.(ttf|woff|woff2|eot|svg)$/, use: 'url-loader' },//url-loader也可以处理字体文件
      //配置 babel
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },//js打包
      { test: /\.vue$/, use: ['vue-loader'] } //vue文件加载
    ]
  }
}
