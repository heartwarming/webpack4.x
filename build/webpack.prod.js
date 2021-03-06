const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin") // 默认导出的是对象，所以解构时候要加{}
module.exports = {
	mode: 'production',
	optimization: { // 优化项
		minimizer: [ // 可以放置压缩方案
			new OptimizeCSSAssetsPlugin(), // 用了这个 js 也得手动压缩
			new TerserWebpackPlugin()
		]
	},
	plugins: [
		new CleanWebpackPlugin(), // 用于每次打包前清空dist文件夹
	]
}