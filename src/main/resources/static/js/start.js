// requestAnimationFrame polyfill by Erik Möller.
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    'use strict';

    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
            || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

var WINDOW_WIDTH = document.body.offsetWidth;
var WINDOW_HEIGHT = document.body.offsetHeight;

var size = $("html").css("font-size").slice(0,$("html").css("font-size").length-2);
var headerHeight = 999;
var canvas,context;
var num = 100;
var stars = [];
var mouseX = WINDOW_WIDTH/2;
var mouseY = WINDOW_HEIGHT/2;
var rnd;

window.onload = function(){
    canvas = document.getElementById('canvas');
    canvas.width = WINDOW_WIDTH;
    // 设置canvas的高度
    canvas.height = headerHeight;
    context = canvas.getContext('2d');
    addStar();
    requestAnimationFrame(render);
    // clearInterval(timer);
    // var timer = setInterval(render,100);
    // liuxing();
    // render();
    document.body.addEventListener('mousemove',mouseMove);
};

function liuxing(){
    var time = Math.round(Math.random()*3000+33);
    setTimeout(function(){
        rnd = Math.ceil(Math.random()*stars.length)
        liuxing();
    },time)
}

function mouseMove(e){
    //因为是整屏背景，这里不做坐标转换
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function render(){
    context.fillStyle = 'rgba(13,16,32,1)';
    context.fillRect(0,0,WINDOW_WIDTH,headerHeight);
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    for(var i =0; i<num ; i++){
        var star = stars[i];
        // 判断流星是否冲撞星星
        if(i === rnd){
            star.vx = -5;
            star.vy = 20;
            context.beginPath();
            context.strokeStyle = 'rgba(255,255,255,'+ star.alpha +')';
            context.lineWidth = star.r;
            context.moveTo(star.x,star.y);
            context.lineTo(star.x+star.vx,star.y+star.vy);
            context.stroke();
            context.closePath();
        }
        star.alpha += star.ra;
        if(star.alpha <= 0){
            star.alpha = 0;
            star.ra = -star.ra;
            star.vx = Math.random()*0.2-0.1;
            star.vy = Math.random()*0.2-0.1;
        }else if(star.alpha>1){
            star.alpha = 1;
            star.ra = -star.ra
        }
        star.x += star.vx;
        if(star.x >= WINDOW_WIDTH){
            star.x = 0;
        }else if(star.x < 0){
            star.x = WINDOW_WIDTH;
            star.vx = Math.random()*0.2-0.1;
            star.vy = Math.random()*0.2-0.1;
        }
        star.y += star.vy;
        if(star.y >= WINDOW_HEIGHT){
            star.y = 0;
            star.vy = Math.random()*0.2-0.1;
            star.vx = Math.random()*0.2-0.1;
        }else if(star.y<0){
            star.y = WINDOW_HEIGHT;
        }
        context.beginPath();
        var bg = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
        bg.addColorStop(0,'rgba(255,255,255,'+ star.alpha+')');
        bg.addColorStop(1,'rgba(65,136,224,0)');
        // 使用径向渐变
        context.fillStyle  = bg;
        context.shadowOffsetX = 0; // 阴影Y轴偏移
        context.shadowOffsetY = 0; // 阴影X轴偏移
        context.shadowBlur = 1000; // 模糊尺寸
        context.shadowColor = 'rgba(65,136,224,0.5)'; // 颜色
        // 图片加载完成后执行
        context.arc(star.x,star.y, star.r, 0, Math.PI*2, true);
        // context.boxShadow ="0 0px 40px 100px rgba(65,136,224,1)";
        context.fill();
        context.closePath();
    }
}

function addStar(){
    for(var i = 0; i<num ; i++){
        var aStar = {
            x:Math.round(Math.random()*WINDOW_WIDTH),
            y:Math.round(Math.random()*WINDOW_HEIGHT),
            r:Math.random()*10,
            ra:Math.random()*0.1,
            alpha:Math.random(),
            vx:Math.random()*0.3-0.2,
            vy:Math.random()*0.3-0.2
        }
        stars.push(aStar);
    }
}

