var Helper = {
  isToEnd: function($viewport, $content){
    return $viewport.height() + $viewport.scrollTop() +10 > $content.height()
  },

  createNode: function(movie){
    var template = `<div class="item">
  <a href="#">
  <div class="cover">
  <img src="" alt="">
      </div>
  <div class="detail">
  <h2></h2>
  <div class="extra"><span class="score"></span>分 / <span class="collect"></span>收藏</div>
  <div class="extra"><span class="year"></span> / <span class="type"></span></div>
  <div class="extra">导演: <span class="director"></span></div>
  <div class="extra">主演: <span class="actor"></span></div>
</div>
</a>
</div>`
    var $node = $(template)
    $node.find('a').attr('href', movie.alt)
    $node.find('.cover img')
    .attr('src', movie.images.medium )
    $node.find('.detail h2').text(movie.title)
    $node.find('.score').text(movie.rating.average )
    $node.find('.collect').text(movie.collect_count )
    $node.find('.year').text(movie.year)
    $node.find('.type').text(movie.genres.join(' / '))
    $node.find('.director').text(function(){
      var directorsArr = []
      movie.directors.forEach(function(item){
        directorsArr.push(item.name)
      })
      return directorsArr.join('、')
    })
    $node.find('.actor').text(function(){
      var actorArr = []
      movie.casts.forEach(function(item){
        actorArr.push(item.name)
      })
      return actorArr.join('、')
    })
    return $node
  }
}

module.exports = Helper