import './index.css';
import './a.scss';
import logo from './logo.jpg';

let a = require('./a-module');
console.log(a);

let img = document.createElement('img')

img.src = logo

document.body.appendChild(img)

const fn = ()=> {

}
fn()

@log
class A{
  a = 1
}

function log(target){
  console.log(target)
}