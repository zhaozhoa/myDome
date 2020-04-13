$(function () {
  
  /* 轮播图 */
  banner();
  /* 移动端页签 */
  initMobileTab()
  /*初始工具提示*/
  $('[data-toggle="tooltip"]').tooltip();
})

var banner = function () {
  
  var getData = function (callback) {
    /*缓存了数据*/
    if (window.data) {
      callback && callback(window.data);
    } else {
      /*1.获取轮播图数据*/
      $.ajax({
        type: 'get',
        url: 'js/data.json',
        dataType: 'json',
        data: '',
        success: function (data) {
          window.data = data;
          callback && callback(window.data);
        }
      });
    }
  }
  var render = function () {
    getData(function (data) {
      /*2.根据数据动态渲染  根据当前设备  屏幕宽度判断 */
      var isMobile = $(window).width() < 768 ? true : false;
     
      var pointHtml = template('pointTemplate', {
        list: data
      });
      //console.log(pointHtml);
      var imageHtml = template('imageTemplate', {
        list: data,
        isMobile: isMobile
      });
      $('.carousel-indicators').html(pointHtml);
      $('.carousel-inner').html(imageHtml);
    });
  }
  /*3.测试功能 页面尺寸发生改变事件*/
  $(window).on('resize', function () {
    render();
    /*通过js主动触发某个事件*/
  }).trigger('resize');
  /*4.移动端手势切换*/
  var startX = 0;
  var distanceX = 0;
  var isMove = false;
  /*originalEvent 代表js原生事件*/
  $('.wjs_banner').on('touchstart', function (e) {
    startX = e.originalEvent.touches[0].clientX;
  }).on('touchmove', function (e) {
    var moveX = e.originalEvent.touches[0].clientX;
    distanceX = moveX - startX;
    isMove = true;
  }).on('touchend', function (e) {
    /*距离足够 50px 一定要滑动过*/
    if (isMove && Math.abs(distanceX) > 50) {
      /*手势*/
      /*左滑手势*/
      if (distanceX < 0) {
        //console.log('next');
        $('.carousel').carousel('next');
      }
      /*右滑手势*/
      else {
        //console.log('prev');
        $('.carousel').carousel('prev');
      }
    }
    startX = 0;
    distanceX = 0;
    isMove = false;
  });

}

var initMobileTab = function () {  
  var $navTabs= $('.wjs_product .nav-tabs')
  var width = 0
  $navTabs.find('li').each(function (i, item) {
    var $currLi = $(this)

    var liWidth = $currLi.outerWidth(true)
    width += liWidth
  })
  $navTabs.width(width)

  new IScroll($('.nav-tabs-parent')[0],{
    scrollX: true,
    scrollY: false,
    click: true
  })
}