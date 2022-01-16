const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const path = require("path");
const merge = require("webpack-merge"); // 用于合并base，dev或者base，prd的配置文件
module.exports = env => {
  // env 是环境变量用于区分 通过--config指向的是谁
  console.log(env)
  let isDev = env.development;
  const base = {
    entry: path.resolve(__dirname, "../src/index.js"),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "../dist")
    }
  }
  // 函数要返回配置文件，没返回会采用默认配置
  if (isDev) {
    return merge(base, dev); // 循环后面的配置 定义到前面去
  } else {
    return merge(base, prod);
  }
};
