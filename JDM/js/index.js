window.onload = function () {
  /* 顶部搜索 */
search()

  /* 轮播 */
banner()

  /* 秒杀倒计时 */
downTime()
}
 
let search = function () {
  let height = $('.jd_banner').offsetHeight;
  /* 监听页面滚动事件 */
  window.onscroll = function () {
    /* 获取滚动高度 的兼容处理 */
   let scrollTop = document.body.scrollTop == 0 ? document.documentElement.scrollTop :
     document.body.scrollTop;
    let opacity = 0
    if (scrollTop < height) {
      opacity = scrollTop / height * 0.85
    } else {
      opacity = 0.85
    }
    $('.jd_search_box').style.background = 'rgba(201, 21, 35, '+ opacity +')'
  }
}

let banner = function () {
  /* 获取元素 */
  let banner = $('.jd_banner')
  let width = banner.offsetWidth
  let imageBox = banner.querySelector('ul:first-child')
  let pointBox = banner.querySelector('ul:last-child')
  let points = pointBox.querySelectorAll('li')

  let addTransition = function () {
    imageBox.style.transition = 'all 0.2s'
    imageBox.style.webkitTransition = 'all 0.2s'
  }

  let removeTransition = function () {
    imageBox.style.transition = 'none'
    imageBox.style.webkitTransition = 'none'
  }

  let setTranslateX = function (translateX) {
    imageBox.style.transform = 'translateX(' + translateX + 'px)'
    imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)'
  }

  
  let index = 1
  let timer = setInterval(()=>{
    index++
    addTransition()
    setTranslateX(-index * width)
  }, 1000);

  /* 判断是否要移动到第一张 */
  imageBox.addEventListener('transitionend', ()=>{
    if (index >= 9) {
      index = 1
      /* 清除过渡 */
      removeTransition()
      /* 移动 */
      setTranslateX(-index * width)
    }
    else if (index <= 0) {
      index = 8;
      removeTransition()
      setTranslateX(-index * width)
    }
    setPoint()
  })
  
  /* 焦点移动方法 */
  let setPoint = function () {
    // 伪数组转换成真数组
    let arr = Array.from(points)
    arr.forEach((item)=>{
      item.classList.remove('now')
    })
    // for (let i = 0; i < points.length; i++) {
    //   const obj = points[i];
    //   obj.classList.remove('now')
    // }
    points[index - 1].classList.add('now');
  }

  /* 手指触摸移动事件 ---》元素随手中移动距离的改变而改变 */
  let startX = 0;
  let distanceX = 0
  let isMove = false
  imageBox.addEventListener('touchstart', (e)=>{
    // 清除定时器
    clearInterval(timer)
    // 记录触摸点的 X 坐标
    startX = e.touches[0].clientX;
  })

  imageBox.addEventListener('touchmove', (e)=>{
    // 记录滑动中的 X 坐标
    let moveX = e.touches[0].clientX
    // 计算滑动距离
    distanceX = moveX - startX;
    // 元素移动的距离 = 当前的位置 + 滑动的距离
    let translateX = -index * width + distanceX
    // 元素在跟随手指移动是不需要原来的动画过渡
    removeTransition()
    setTranslateX(translateX)
    isMove = true
  })

  imageBox.addEventListener('touchend', (e) => {
    /* 用滑动的距离是否小于 1/3 来判断是否切换图片 */
    if (isMove) {
      if (Math.abs(distanceX) < width / 3) {
        addTransition()
        setTranslateX(-index * width)
      } else {
        // 右滑动，切换上一张
        if (distanceX > 0) {
          index--
        }
        else {
          index++
        }
        addTransition()
        setTranslateX(-index * width)
      }
    }
    /* 重置参数 */
    startX = 0
    distanceX = 0
    isMove = false

    /* 开启定时器 */
    clearInterval(timer)
    timer = setInterval(() => {
      index++
      addTransition()
      setTranslateX(-index * width)
    }, 1000);
    

  })




}

let downTime = function ( ) {
  /* 倒计时为 4h */
  let time = 4 * 60 * 60
  let spans = document.querySelectorAll('.time span')
  let timer = setInterval(() => {
    time--
    let h = Math.floor(time / 3600)
    let m = Math.floor(time % 3600 / 60)
    let s = Math.floor(time % 60)
    

    spans[0].innerHTML = Math.floor(h / 10)
    spans[1].innerHTML = h % 10

    spans[3].innerHTML = Math.floor(m / 10)
    spans[4].innerHTML = m % 10

    spans[6].innerHTML = Math.floor(s /10) 
    spans[7].innerHTML = s % 10

    if (time <= 0) {
      clearInterval(timer)
    }
  }, 1000);
}

function $(ele) {
  return typeof ele === 'string' ? document.querySelector(ele) : null;
}