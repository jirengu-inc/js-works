var Helper = require('../helpers/util')


var Top250Page = {

  init: function(){
    this.$container = $('#top250')
    this.$content = this.$container.find('.container')
    this.index = 0
    this.isFinish = false
    this.isLoading = false

    this.bind()
    this.start()
  },
  bind: function(){
    var _this = this
    this.$container.scroll(function(){
      if(!_this.isFinish && Helper.isToEnd(_this.$container, _this.$content)){
        _this.start()
      }
    })       
  },
  start: function(){
    var _this = this
    this.getData(function(data){
      _this.render(data)
    })
  },

  getData: function(callback){
    var _this = this
    if(_this.isLoading) return;
    _this.isLoading = true
    _this.$container.find('.loading').show()
    $.ajax({
      url: 'http://api.douban.com/v2/movie/top250',
      data: {
        start: _this.index||0
      },
      dataType: 'jsonp'
    }).done(function(ret){
      console.log(ret)
      _this.index += 20
      if(_this.index >= ret.total){
        _this.isFinish = true
      }
      callback&&callback(ret)
    }).fail(function(){
      console.log('数据异常')
    }).always(function(){
      _this.isLoading = false
      _this.$container.find('.loading').hide()
    })       
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(movie){
      _this.$content.append(Helper.createNode(movie))
    })
  }
}

module.exports = Top250Page