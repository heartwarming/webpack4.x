import './index.css';
import './a.scss';
import logo from './logo.jpg';
import $ from 'jquery'; // 这个文件应该是cdn加载进来的
console.log($); 
let a = require('./a-module');
console.log(a);

let img = document.createElement('img')

img.src = logo

document.body.appendChild(img)

// const fn = ()=> {

// }
// fn()

// @log
// class A{
//   a = 1
// }

// function log(target){
//   console.log(target)
// }

// [1,2,3].includes(1);

// import React from 'react';
// import ReactDOM from 'react-dom';
// // ts 校验类型
// interface IProps{
//     num:number
// }
// let initState = {count:0};
// type State = Readonly<typeof initState>
// class Counter extends React.Component<IProps,State>{
//     state:State = initState;
//     handleClick = ()=>{
//         this.setState({count:this.state.count+1})
//     }
//     render(){
//         return <div>
//             {this.state.count}
//             <button onClick={this.handleClick}>点击</button>
//         </div>
//     }
// }

// ReactDOM.render(<Counter num={1}/>,document.getElementById('root'));

// 使用ts有俩中方式
// ts-loader typescript库
// babel7 @babel/preset-typescript


import Vue from 'vue';
import App from './App.vue'
let vm = new Vue({
  el: "#root",
  render: h => h(App)
});


// tree-shaking 默认只支持 es6语法的 d 静态导入
// 只在生产环境下使用
import {minus} from './calc';
// // 如果引入的变量没有使用就删除
import test from './test';// 副作用的代码 可能开发时 是无意义的

// import  './style.css'; // 如果引入css 文件需要增加他不是副作用 否则会被tree-shaking掉
console.log(minus(2,1))