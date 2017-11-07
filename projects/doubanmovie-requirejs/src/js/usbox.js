define(['jquery', 'helper'], function($, Helper){
    var UsBoxPage = {
      init: function(){
        this.$container = $('#beimei')
        this.$content = this.$container.find('.container')
        this.start()
      },

      start: function(){
        var _this = this
        this.getData(function(data){
          _this.render(data)
        })
      },

      getData: function(callback){
        var _this = this
        _this.$container.find('.loading').show()
        $.ajax({
          url: 'http://api.douban.com/v2/movie/us_box',
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
          _this.$content.append(Helper.createNode(item.subject))
        })
      }
    }
    return UsBoxPage
})