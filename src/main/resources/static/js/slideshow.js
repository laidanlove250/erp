var $unit = $("#unit");
var $leftBtn = $("#leftBtn");
var $rightBtn = $("#rightBtn");
var $circles = $("#unit li");
// var amount = Math.floor($circles.length/4);
var amount = $circles.length;
var idx = 0;

$unit.children("li:first").clone().appendTo($unit);
$circles.eq(1).clone().appendTo($unit);
$circles.eq(2).clone().appendTo($unit);
$circles.eq(3).clone().appendTo($unit);
// 定时器
var timer = setInterval(rightAnimate, 3000);

// 鼠标进入carousel停止定时器
$unit.mouseenter(function(){
    // 停止定时器
    clearInterval(timer);
});

// 鼠标离开重新开始定时器
$unit.mouseleave(function(){
    // 设表先关
    clearInterval(timer);
    timer = setInterval(rightAnimate, 3000);
});
// 右按钮点击事件
$rightBtn.click(rightAnimate);
function rightAnimate () {
    if(!$unit.is(":animated")){
        idx ++;
        // 火车移动
        $unit.animate({"left" : -242 * idx} , 500 , function(){
            // 只有当idx = 5才瞬间移动
            if(idx > amount-1){
                idx = 0;
                // 图片瞬间移动
                $unit.css("left" , 0);
            }
        });
    }
}

// 左按钮点击事件 先验证 后拉动
$leftBtn.click(function(){
    // 防流氓
    if($unit.is(":animated")){
        return;
    }
    idx --;
    // 验证
    if(idx < 0){
        idx = amount - 1;
        // 瞬间移动到猫腻图
        $unit.css("left" , -242 * amount);
    }
    // 后拉动
    $unit.animate({"left" : -242 * idx} , 500);
    // 小圆点改变
    // $circles.eq(idx).addClass("cur").siblings().removeClass("cur");

});
