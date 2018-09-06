function g(tagName, props, children) {
  return {
    tagName: tagName,
    props: props,
    children: children
  }
}

/*



*/

function createElement(node) {
  if( typeof node === 'string') {
    return document.createTextNode(node)
  }
  var $el = document.createElement(node.tagName)
  node.children.map(createElement).forEach(function($child){
    $el.appendChild($child)
  })
  return $el
}

var node = {
  tagName: 'div',
  children: [
    {
      tagName: 'h1',
      children: []
    },
    {
      tagName: 'p',
      children: [
        {
          tagName: 'span',
          children: ['hi']  
        },
        'hello world'
      ]
    }
  ]
}

var $el = createElement(node)
console.log($el)


