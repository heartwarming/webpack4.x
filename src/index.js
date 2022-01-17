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