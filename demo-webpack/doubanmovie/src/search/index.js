var Helper = require('../helpers/util')


var SearchPage = {
  init: function(){
    this.$container = $('#search')
    this.$input = this.$container.find('input')
    this.$btn = this.$container.find('.button')
    this.$content = this.$container.find('.search-result')
    this.bind()
  },
  bind: function(){
    var _this = this
    this.$btn.click(function(){
      _this.getData(_this.$input.val(), function(data){
        console.log(data)
        _this.render(data)
      })
    })
  },
  getData: function(keyword, callback){
    var _this = this
    _this.$container.find('.loading').show()
    $.ajax({
      url: 'http://api.douban.com/v2/movie/search',
      data: {
        q: keyword
      },
      dataType: 'jsonp'
    }).done(function(ret){
      callback&&callback(ret)
    }).fail(function(){
      console.log('数据异常')
    }).always(function(){
      _this.$container.find('.loading').hide()
    })    
  },
  render: function(data){
    var _this = this
    data.subjects.forEach(function(item){
      _this.$content.append(Helper.createNode(item))
    })
  }
}

module.exports = SearchPage