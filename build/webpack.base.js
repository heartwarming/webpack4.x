const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const merge = require("webpack-merge"); // 用于合并base，dev或者base，prd的配置文件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 用于打包后自动生成index.html,自动引入bundle.js
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 默认导出的是对象，所以解构时候要加{}
module.exports = env => {
  // env 是环境变量用于区分 通过--config指向的是谁
  console.log(env)
  let isDev = env.development;
  const base = {
    entry: path.resolve(__dirname, "../src/index.js"),
    module: {
      // 转化什么文件 用什么去转，使用哪些loader
      // loader 写法 [] / {} ''
      // 打包css 还需要处理一下 样式前缀

      // 解析的css的时候 就不能渲染dom
      // css 可以并行和js 一同加载 mini-css-extract-plugin
      rules: [
        {
          test: /\.css$/,
          use: [ "style-loader", "css-loader"]
        }
      ]
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../dist")
    },
    plugins: [
      new CleanWebpackPlugin(), // 用于每次打包前清空dist文件夹
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"), // 根index.html
        filename: "index.html",
        minify: !isDev && { // 生产环境需要压缩，去掉双引号
          removeAttributeQuotes: true, // 去掉双引号
          collapseWhitespace: true // 压缩
        }
      })
    ].filter(Boolean)
  }
  // 函数要返回配置文件，没返回会采用默认配置
  if (isDev) {
    return merge(base, dev); // 循环后面的配置 定义到前面去
  } else {
    return merge(base, prod);
  }
};
