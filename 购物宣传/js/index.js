$(function () {
    // 1.初始化fullpage组建
    $('.container').fullpage({
        // 1.1配置属性

        //1.1.1每一个section的颜色 
        sectionsColor:["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],

        //1.1.2设置每一个section内容的对其方式（默认是垂直居中）
        verticalCentered:false,

        //1.1.3指示器显示
        navigation:true,

        //2.监听进入section
        afterLoad:(link,index) =>{
            $('.section').eq(index-1).addClass('now');

            if(index == 7) {  //第七个section动画
                for (let i = 0; i < 6; i++) {
                    $('.screen7 .star img').eq(i).delay(i * 0.35 * 1000).fadeIn();
                    
                }
                
                // $('.screen7 .star img').each((i, item) => {
                //     // $(item) ==$(this)
                //     $(item).delay(i * 0.35 * 1000).fadeIn();
                // });
               
            }
        },

        //3.页面加载完成后，监听按钮点击
        afterRender:()=>{
            $('.more').on('click',()=>{
                $.fn.fullpage.moveSectionDown();
            })
        },

        //4 监听离开section
        onLeave:(index,nextIndex,direction)=>{
            if (index == 2 && nextIndex ==3 || index == 3 && nextIndex == 4 || index == 5 && nextIndex == 6) {//判断从第二页到第三页
               $('.section').eq(index-1).addClass('leaved');
                
            };

            if(index == 5 && nextIndex == 6) {
                $('.screen6 .box').addClass('start');
            };
           
        }
      
    });
      // 5.监听动画结束
      $('.screen4 .cart').on('transitionend', ()=> {
        //   jquery扩展选择器：
        //   ：last   :first :visible :hidden :checked :selected
            $('.screen4 .address').show().find("img:last").fadeIn(1000);
            $('.screen4 .text').addClass('show');
    });
     /* 第八个section动画 */
     $(".screen8").on("mousemove",(e) => {
                 $('.screen8').find('.hand8').css({
                     left: e.clientX - 300,
                     top: e.clientY -160
                 });
    });
    $('.screen8').find('.again').on("click",() =>{
        $.fn.fullpage.moveTo(1);
        $('.now,.leaved,start').removeClass('now').removeClass('leaved').removeClass('start');
        $('.content [style]').removeAttr('style');
    })

   
})