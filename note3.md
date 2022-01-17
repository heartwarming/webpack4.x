# 解析css，打包时候webpack只识别js文件，所以需要loader

// css-loader 会解析css语法  style-loader 会将解析的css 变成style标签插入到页面中
// 解析css 需要两个loader css-loader style-loader

// 预处理器 .scss node-sass sass-loader
//         .less less     less-loader 
//         .stylus stylus stylus-loader

// 图片 + icon

// js
es6-es5 有些api 不是es6语法  装饰器 类的属性

babel 转化功能 vue-cli 基于babel6来实现的
babel7

默认会调用 @babel/core会转化代码，转化的时候需要用 @babel/presets-env 转化成es5
@babel/core @babel/preset-env  babel-loader

// 解析react + vue