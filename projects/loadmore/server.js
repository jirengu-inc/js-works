let http = require('http')
let fs = require('fs')
let url = require('url')

http.createServer((req,res)=>{
  let pathObj = url.parse(req.url, true)
  console.log(pathObj)

  if(pathObj.pathname === '/index.html') {
    let html = fs.readFileSync('./index.html', 'utf-8')
    res.write(html)
    res.end()
  }else if(pathObj.pathname  === '/loadMore') {
    let index = pathObj.query.index
    let retArray = []
    for(let i =0; i<5; i++) {
      retArray.push('内容'+ (parseInt(index)+i) )
    }
    res.setHeader('Content-Type', 'application/json; chasert=utf-8')
    setTimeout(function(){
      res.write(JSON.stringify(retArray))
      res.end()
    }, 2000)
    
  }
  
}).listen(8080)