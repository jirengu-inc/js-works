
let app = {

  init() {
    var _this = this
    this.getData(function(data){
      _this.renderData(data)
      _this.bindEvent()
    })
    
  },

  bindEvent() {
    $$('#app .tabs>li').forEach(function(tab, idx){
      tab.onclick = function() {
        $$('#app .tabs>li').forEach(node=>{
          node.classList.remove('active')
        })
        this.classList.add('active')
        let index = [].indexOf.call($$('#app .tabs>li'), this)
        console.log(idx)
        console.log(index)
        $$('#app .panels>li').forEach(panel=>panel.classList.remove('active'))
        $$('#app .panels>li')[index].classList.add('active')
      }
    })
  },

  renderData(data) {
    console.log(data)
    $('#app .location .city').innerText = data.results[0].currentCity
    var last_update = new Date()
    $('#app .location .time').innerText = last_update.getHours() + ':' + fixTime(last_update.getMinutes())
    data.results[0].index.forEach(function(item, index){
      console.log(item, index)
      $$('#app .tabs .title')[index].innerText = item.title
      $$('#app .panels>li')[index].innerText = item.des
    })
    let temperature = data.results[0].weather_data[0].date.match(/(-?\d+)℃/)[1]
    console.log(temperature)
    $('#app .temperature .number').innerText = temperature

    let d = new Date(data.date)
    $('#app .date').innerText = getChsDate(d)
    $('#app .weather-pic img').src = data.results[0].weather_data[0].dayPictureUrl
    $('#app .detail .more').innerText = data.results[0].weather_data[0].weather + '/' + data.results[0].pm25
    
    for(let index = 0; index < data.results[0].weather_data.length -1; index++) {
      $$('#app .future .week')[index].innerText = data.results[0].weather_data[index+1].date
      $$('#app .future .weather-pic img')[index].src = data.results[0].weather_data[index+1].dayPictureUrl
      $$('#app .future .temperature')[index].innerText = data.results[0].weather_data[index+1].temperature
    }
  },

  getData(callback) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://api.jirengu.com/getWeather.php', true)
    xhr.send()
    xhr.onload = function() {
      callback(JSON.parse(xhr.responseText))
    }
  }
}

app.init()

function $(selector) {
  return document.querySelector(selector)
}
function $$(selector) {
  return document.querySelectorAll(selector)
}
function fixTime(t) {
  if(t.toString().length == 1){
    return '0' + t
  }
  return t
}
function getChsDate(dateObj) {
  var month = dateObj.getMonth() + 1
  var date = dateObj.getDate()
  var dayDict = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
  var week = dayDict[dateObj.getDay()]
  return `${month}月${date}日${week}`
} 

