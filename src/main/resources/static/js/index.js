$(function () {
    $(window).on('load',function () {
        var $ball = $('.ball').find('div');
        $ball.addClass('animated fadeInUp');
        setTimeout(function () {
            $ball.siblings('p').addClass('animated fadeInUp');
        },100)
    })
})
// 导航监听页面的滚动
$(function () {
    var $nav = $('#nav');
    var $wraps = $('.wrap');
    var $navLis = $('#nav li');
    var navTop = $nav.position().top;
    // 点击导航执行的动画
    $navLis.each(function(idx, item){
      var me = $(this);
      me.on('click', function(){
          var i = $(this).index();
          var height = $wraps.eq(i).position().top;
          $('html, body').animate({scrollTop: height - 60},300);
      })
    });
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop() || document.body.scrollTop;
        // 页面滚动到该位置时变成固定定位
        if ( navTop <= scrollTop) {
            $nav.css({
                'position':'fixed',
                'top':0,
                'left':0
            })
        } else if (navTop >= scrollTop) {
            $nav.css({
                'position':'absolute',
                'bottom':0,
                'left':0,
                'top':'calc(100% - 60px)'
            });
            $navLis.each(function (idx, item) {
                var me = $(this);
                me.removeClass('cur');
            })
        }
        $wraps.each(function(i,item){
            var itemOfftop = $(item).position().top;
            var itemHeight = $(item).outerHeight(true);
            var itemmarginTop = $(item).css('paddingTop').slice(0, $(item).css('marginTop').length - 2) - 0;
            if(itemOfftop - 90 <= scrollTop && scrollTop < itemHeight + itemOfftop) {
                $navLis.eq(i).addClass('cur').siblings().removeClass('cur');
            }
        });
    })
});
// 我们帮您做到
$(function () {
    var $doLis = $('.wecando li');
    $doLis.each(function (idx, item) {
        var me = $(this);
        me.on('mouseenter', function() {
            if(!me.is(':animated')){
                me.css({
                    background: '#2F54EB',
                    color: '#fff'
                });
                me.find('img').fadeOut(100);
                me.find('p').stop(false, true).css({'color': '#fff'}).animate({
                    'marginTop': '-50px',
                    'fontSize':'18px',
                    'fontWeight':'400',
                    'lineHeight':'28px'
                },300);
                me.find('.hide-box').stop(false, true).css({'display': 'block'}).animate({
                    top: '25%'
                }, 300);;
                me.find('span').stop(false, true).css({'position': 'absolute'}).animate({
                    'bottom': '80px',
                    'left': '115px'
                }, 300);
            }
        });
        me.on('mouseleave', function() {
            if(!me.is(':animated')){
                me.css({'background': '#fff', 'color': '#333'});
                me.find('img').fadeIn(100).css({'display': 'inline-block'});
                me.find('p').stop(false, true).css({'color': '#333'}).animate({
                    'marginTop': '30px',
                    'fontSize':'14px',
                },300);
                me.find('.hide-box').stop(false, true).css({'display': 'none'}).animate({
                    top: '0%'
                }, 300);;
                me.find('span').stop(false, true).css({'position': 'relative'}).animate({
                    marginBottom: '-20px',
                    'bottom': '0px',
                    'left': '0px'
                }, 300);
            }
        })
    })
});
// BZU的主要功能模块
$(function () {
    var $imgLis = $('.big-img li');
    var $imgIcons = $('.img-icon li');
    var lef2 = $('.absolute-box').width();
    var $leftWidth = $('.middle').find('.left');
    $imgIcons.each(function (idx, item) {
        var me = $(this);
        me.on('click', function () {
            var i = $(this).index();
            var width = $(this).width();
            var lef1 = $(this).position().left;
            $leftWidth.css({'width': lef1 - lef2 + width/2 - 14 + 'px'});
            $($imgLis[i]).fadeIn(300).siblings().fadeOut(300)
        })
    })
});
// 右下角三个点击事件
$(function () {
   var $goback = $('#goback');
   var $erweima = $('#erweima');
    $goback.on('click',function () {
        window.scrollTo(0,0);
    });
    $erweima.on('mouseenter', function () {
        var me = $(this);
        if(!me.is(':animated')){
            $('.erweima').fadeIn(300);
        }
    });
    /*$erweima.on('mouseleave', function () {
        var me = $(this);
        if(!me.is(':animated')){
            $('.erweima').fadeOut(300);
        }
    })*/
});
