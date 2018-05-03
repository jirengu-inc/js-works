var _ = require('lodash')
require('./style.css')
var logo = require('./logo.svg')
var printMe = require('./print')

function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');
  var img = document.createElement('img')
  img.src = logo
  console.log(logo)

  var btn = document.createElement('button')
  btn.innerHTML = 'click me'
  btn.onclick = printMe
  element.appendChild(btn)
  consol.log(1)

  return { element: element, logo: img };
}

var obj = component()
document.body.appendChild(obj.element);
document.body.appendChild(obj.logo);