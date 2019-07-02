var WINDOW_WIDTH = document.body.offsetWidth;
var WINDOW_HEIGHT = document.body.offsetHeight;

var d_width = $(window).width();
var d_height = parseInt($(window).height());
$("body").css('height',d_height+"px");
var size_width = d_width*100/750;
var font_size = (Number(size_width)).toFixed(2)+"px";
if(d_width >= 750){
    $("html").css("font-size","100px");
}else{
    $("html").css("font-size",font_size);
}

var size = $("html").css("font-size").slice(0,$("html").css("font-size").length-2);
var headerHeight = size * 12;
var canvas,context;
var num = 50;
var stars = [];
var mouseX = WINDOW_WIDTH/2;
var mouseY = WINDOW_HEIGHT/2;
var rnd;

window.onload = function(){
    canvas = document.getElementById('canvas');
    canvas.width = WINDOW_WIDTH;
    // 璁剧疆canvas鐨勯珮搴�
    canvas.height = headerHeight;
    context = canvas.getContext('2d');
    addStar();
    // clearInterval(timer);
    // var timer = setInterval(render,50);
    // liuxing();
    render();
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
    //鍥犱负鏄暣灞忚儗鏅紝杩欓噷涓嶅仛鍧愭爣杞崲
    mouseX = e.clientX;
    mouseY = e.clientY;
}

function render(){
    context.fillStyle = 'rgba(13,16,32,1)';
    context.fillRect(0,0,WINDOW_WIDTH,headerHeight);
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
    for(var i =0; i<num ; i++){
        var star = stars[i];
        if(i == rnd){
            star.vx = -5;
            star.vy = 20;
            context.beginPath();
            context.strokeStyle = 'rgba(255,255,255,'+star.alpha+')';
            context.lineWidth = star.r;
            context.moveTo(star.x,star.y);
            context.lineTo(star.x+star.vx,star.y+star.vy);
            context.stroke();
            context.closePath();
        }
        star.alpha += star.ra;
        if(star.alpha<=0){
            star.alpha = 0;
            star.ra = -star.ra;
            star.vx = Math.random()*0.2-0.1;
            star.vy = Math.random()*0.2-0.1;
        }else if(star.alpha>1){
            star.alpha = 1;
            star.ra = -star.ra
        }
        star.x += star.vx;
        if(star.x>=WINDOW_WIDTH){
            star.x = 0;
        }else if(star.x<0){
            star.x = WINDOW_WIDTH;
            star.vx = Math.random()*0.2-0.1;
            star.vy = Math.random()*0.2-0.1;
        }
        star.y += star.vy;
        if(star.y>=WINDOW_HEIGHT){
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
        // 浣跨敤寰勫悜娓愬彉
        context.fillStyle  = bg;
        // 鍥剧墖鍔犺浇瀹屾垚鍚庢墽琛�
        context.arc(star.x,star.y, star.r, 0, Math.PI*2, true);
        // context.boxShadow ="0 0px 40px 100px rgba(65,136,224,1)";
        context.fill();
        context.closePath();
        context.shadowBlur=100;
        context.shadowColor = "blue";
        context.shadowOffsetX = 100;
        context.shadowOffsetY = 100;
    }
}

function addStar(){
    for(var i = 0; i<num ; i++){
        var aStar = {
            x:Math.round(Math.random()*WINDOW_WIDTH),
            y:Math.round(Math.random()*WINDOW_HEIGHT),
            r:Math.random()*8,
            ra:Math.random()*0.05,
            alpha:Math.random(),
            vx:Math.random()*0.2-0.1,
            vy:Math.random()*0.2-0.1
        }
        stars.push(aStar);
    }
}
