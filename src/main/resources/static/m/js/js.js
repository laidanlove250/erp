    var ban_img = $(".ban_img1");
    var dots = [].slice.call($(".dots ul li"));
    var idx = 1;
    touch_val(ban_img);
    function touch_val(obj){
        var start, end, startY, endY;
        obj.on('touchstart',function(e){
            var _touch = e.originalEvent.targetTouches[0];
            start= _touch.pageX;
            startY = _touch.clientY;
        });
        obj.on('touchmove',function(e){
            // 闃绘娴忚鍣ㄥ湪touchmove鏃剁殑缈婚〉
            var _touch = e.originalEvent.targetTouches[0];
            var _x = _touch.pageX;
            endY = _touch.clientY;
            var touch_y = endY - startY;
            var touch_x = _x - start;
            // 濡傛灉瀹炲湪y杞翠笂娲诲姩灏卞彇娑堥樆姝㈤粯璁や簨浠�
            if(Math.abs(touch_x) > Math.abs(touch_y)) {
                e.preventDefault();
            }
        });
        obj.on('touchend',function(e){
            var _touch = e.originalEvent.changedTouches[0];
            end= _touch.pageX;
            var touch_length = parseInt(end)-parseInt(start);
            obj.find("a").addClass("one_second");
            if(touch_length > 20){
                // 姝ゆ椂鏄乏鍙宠疆鎾氨闃绘榛樿浜嬩欢
                var prev_val = obj.find(".rotating").prev();
                //鍒ゆ柇褰撳墠澶ф鏄惁鏈変笂涓€涓厓绱�
                if(prev_val.length !== 0){
                    //鏀瑰彉灏忓厓绱�
                    obj.find(".rotating").prev().addClass("mark");
                    obj.find(".rotating").removeClass("mark");
                    idx = obj.find(".mark").index();
                    $(dots[idx]).addClass('cur').siblings().removeClass('cur');
                    obj.find("a.mark").siblings().removeClass("rotating");
                    obj.find("a.mark").addClass("rotating");
                    //绉诲姩鐖剁骇鍏冪礌
                    obj.addClass("one_second");
                    var ban_a_width = obj.find("a").width();
                    var ban_left = parseInt(obj.css("left"));
                    var ban_right = parseInt(obj.css("right"));
                    var new_left = ban_a_width+ban_left;
                    var new_right = ban_a_width+ban_right;
                    obj.css("left",new_left+"px");
                    obj.css("right",new_right+"px");
                }
            }else if(touch_length < -20){
                e.preventDefault();
                var prev_r = obj.find(".rotating").next();
                //鍒ゆ柇褰撳墠澶ф鏄惁鏈変笂涓€涓厓绱�
                if(prev_r.length !== 0){
                    //鏀瑰彉灏忓厓绱�
                    obj.find(".rotating").next().addClass("mark");
                    obj.find(".rotating").removeClass("mark");
                    idx = obj.find(".rotating").index()+ 1;
                    $(dots[idx]).addClass('cur').siblings().removeClass('cur');
                    obj.find("a.mark").siblings().removeClass("rotating");
                    obj.find("a.mark").addClass("rotating");
                    //绉诲姩鐖剁骇鍏冪礌
                    obj.addClass("one_second");
                    var ban_r_width = obj.find("a").width();
                    var ban_r_left = parseInt(obj.css("left"));
                    var ban_r_right = parseInt(obj.css("right"));
                    var new_l = -ban_r_width+ban_r_left;
                    var new_r = -ban_r_width+ban_r_right;
                    obj.css("left",new_l+"px");
                    obj.css("right",new_r+"px");
                }
            }
        });
    }
