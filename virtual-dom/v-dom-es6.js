/**
 * @author ruoyu
 * @description 虚拟 DOM Demo
 * @todo 暂时不考虑复杂情况
 */

class VNode {
  constructor(tag, children, text) {
    this.tag = tag
    this.text = text
    this.children = children
  }

  render() {
    if(this.tag === '#text') {
      return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag)
    this.children.forEach(vChild => {
      el.appendChild(vChild.render())
    })
    return el
  }
}

function v(tag, children, text) {
  if(typeof children === 'string') {
    text = children
    children = []
  }
  return new VNode(tag, children, text)
}



function vNode(tag, children, text) {
  this.tag = tag
  this.text = text
  this.children = children
}

vNode.prototype.render = function() {
  if(this.tag === '#text') {
    return document.createTextNode(this.text)
  }
  let el = document.createElement(this.tag)
  this.children.forEach(vChild => {
    el.appendChild(vChild.render())
  })
  return el  
}

// var node = new vNode('#text', [], 'hello')
// node.render()


/*

let nodesData = {
  tag: 'div',
  children: [
    {
      tag: 'p',
      children: [
        {
          tag: 'span',
          children: [
            {
              tag: '#text',
              text: 'xiedaimala.com'
            }
          ]
        }
      ]
    },
    {
      tag: 'span',
        children: [
          {
            tag: '#text',
            text: 'jirengu.com'
          }
        ]
    }
  ]
}

 */

/*

let vNode1 = v('div', [
      v('p', [
        v('span', [ v('#text', 'xiedaimala.com') ] )
        ]
      ),
      v('span', [
        v('#text',  'jirengu.com')
        ])
    ]
  )
console.log(vNode1)

const root = document.querySelector('#root')
root.appendChild(vNode1.render())

 
let vNode2 = v('div', [
      v('p', [
        v('span', [ v('#text', 'xiedaimala.com') ] )
        ]
      ),
      v('span', [
        v('#text',  'jirengu.com')
        ]),
      v('span', [
        v('#text',  'ruoyu')
        ])
    ]
  )

document.querySelector('#btn').onclick = function(){
  root.innerHTML = ''
  root.appendChild(vNode2.render())
}
*/


 


function patchElement(parent, newVNode, oldVNode, index = 0) {
  if(!oldVNode) {
    parent.appendChild(newVNode.render())
  } else if(!newVNode) {
    parent.removeChild(parent.childNodes[index])
  } else if(newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) {
    parent.replaceChild(newVNode.render(), parent.childNodes[index])
  }  else {
    for(let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
      patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)
    }
  }
}


/*
let vNodes1 = v('div', [
      v('p', [
        v('span', [ v('#text', 'xiedaimala.com') ] )
        ]
      ),
      v('span', [
        v('#text',  'jirengu.com')
        ])
    ]
  )

let vNodes2 = v('div', [
      v('p', [
        v('span', [ 
          v('#text', 'xiedaimala.com') 
          ] )
        ]
      ),
      v('span', [
        v('#text',  'jirengu.coms'),
        v('#text',  'ruoyu')
        ])
    ]
  )
  */
 
let vNode1 = v('div',[v('#text','hello')])
let vNode2 = v('div',[v('#text','world')])

const root = document.querySelector('#root')
patchElement(root, vNode1)
patchElement(root, vNode2, vNode1)




 




