const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const merge = require("webpack-merge"); // 用于合并base，dev或者base，prd的配置文件
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 用于打包后自动生成index.html,自动引入bundle.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 生产环境需要抽离css(不能都放在style标签里)，但是开发环境不需要抽离
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const glob = require("glob"); // 主要功能就是查找匹配的文件
// 主要的作用删除无意义的css，只能配合 mini-css-extract-plugin
const PurgeCssWebpackPlugin = require("purgecss-webpack-plugin");
const AddCdnPlguin = require("add-asset-html-cdn-webpack-plugin"); // 通过cdn动态加载插件，避免都打包进bundle.js体积过大
const DLLReferencePlugin = require("webpack").DllReferencePlugin;
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin'); // 计算模块打包时间
// 写个循环
const smw = new SpeedMeasureWebpackPlugin();
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
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.tsx?$/,
          use: 'babel-loader'
        },
        { // 解析js文件 默认会调用@babel/core 
          test: /\.js$/,
          use: 'babel-loader'
        },
        {
          test: /\.css$/,
          use: [ // 是不是开发环境 如果是就用style-loader
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                // 给loader传递参数
                // 如果css文件引入其他文件@import
                importLoaders: 2
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          // 匹配到scss结尾的使用sass-loader 来调用node-sass处理sass文件
          test: /\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        { // 图标的转化
          test: /\.(woff|ttf|eot)$/,
          use: 'file-loader'
        },
        { // 图片的转化
          test: /\.(jpe?g|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            // 如果大于100k的图片 会使用file-loader
            options: {
              name: "image/[contentHash].[ext]", // 自定义图片存放位置 contentHash内容生成的hash
              limit: 1024
            }
          } // file-loader 默认的功能是拷贝的作用
          // 我希望当前比较小的图片可以转化成 base64 文件比以前大，好处就是不用发送http请求
        }
      ]
    },
    // optimization:{
    //     usedExports:true // 使用了哪个模块你和我说一下,只有提示作用
    // },
    output: {
      filename: "bundle.js",
      chunkFilename: "[name].min.js",
      path: path.resolve(__dirname, "../dist")
    },
    // externals:{
    //     'jquery':'$' // 不去打包代码中的jquery,但是最好是通过插件管理 AddCdnPlguin
    // },
    plugins: [
      // 在每次打包之前 先清除dist目录下的文件
      !isDev && new MiniCssExtractPlugin({ // 如果是开发模式就不要使用抽离样式的插件
        filename: 'css/main.css' //抽离后的文件名字
      }),
      new VueLoaderPlugin(),
      new PurgeCssWebpackPlugin({
        paths: glob.sync("./src/**/*", { nodir: true })
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "../public/index.html"), // 根index.html
        filename: "index.html",
        minify: !isDev && { // 生产环境需要压缩，去掉双引号
          removeAttributeQuotes: true, // 去掉双引号
          collapseWhitespace: true // 压缩
        }
      }),
      // 添加cdn的插件
      new AddCdnPlguin(true, {
        'jquery': 'https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js'
      }),
      // dll失败了，暂时没找到原因
      // new DLLReferencePlugin({
      //   manifest: path.resolve(__dirname, "dll/manifest.json")
      // }),
      // new AddAssetHtmlPlugin({
      //   filepath: path.resolve(__dirname, "./dll/react.dll.js")
      // })
    ].filter(Boolean)
  }
  // 函数要返回配置文件，没返回会采用默认配置
  if (isDev) {
    return merge(base, dev); // 循环后面的配置 定义到前面去
  } else {
    return merge(base, prod);
  }
};
