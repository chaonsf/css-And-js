

! function (_win, fun) {
    var index = 0;
    $.extend({
        showbox: function(param) {
            index++;
            param.index = index;
            var _this = fun(param, $);
            _this.render();
            $.extend({
                hidebox: function () {
                    _this.hide();
                    return _this
                }
            })
            return _this
        }
    });
}(window, function (config, $) {
    var obj = function (config) {
        this.config = {
            width: '70%',
            height: '60%',
            cls: '',
            content: '',
            dir: 'right',
            beforeShow: null,
            load: null
            // buttons: [{
            //     text: '关闭',
            //     type: 'closed'
            // }]
        }
        this.config = $.extend(this.config, config);

        this.config.dir == 'right'? this.config.height = '100%' : '';
        

        this.show = function () {  
            var o = this,
                c = o.config;

            var $box = popup.getContainer();
            var dirClass = c.dir == 'up' ? 'slidUpIn' : 'slidrightIn',
                con = {
                [c.dir == 'up' ? 'height' : 'width']: c.dir == 'up' ? c.height ? c.height : '45%' : c.width ? c.width : '70%'
            }
            c.dir  == 'up' ? (con.width = '100%',con.bottom = 0) : '';

            $box.find('.popup_shade').addClass('animations');
            $box.find('.popup_content').css(con).addClass(dirClass);
            setTimeout(function () {  
                $box.find('.popup_shade').removeClass('animations');
                $box.find('.popup_content').removeClass(dirClass);
            }, 300)
        };

        this.hide = function () {  
            var o = this,
                c = o.config;
            
            var boxwidth = c.dir == 'up' ? popup.getHeight() : popup.getWidth();
            var $box = popup.getContainer(),
                dirClass = c.dir == 'up' ? 'slidUpOut' : 'slidrightOut';
            $box.find('.popup_content').css('transform', 'translate'+ c.dir == 'up'? 'Y':'X' +'(' + boxwidth + 'px)').addClass(dirClass);
            $box.find('.popup_shade').addClass('animations_out');
            if (c.beforehide) {
                c.beforehide($box.find('.content').get(0));
            }
            setTimeout(function() {
                $box.remove();
            }, 500);
        };
        this.setIndex=function(num){
             let $box= popup.getContainer();
             $box.css({
                 zIndex:num
             })
        }
        this.bindEvent = function () {  
            var o = this,
                c = o.config;
            
            if (!c.buttons) {
                return
            }
            var ele = '<div class="popup_buttons"><button class="cancel popup_btn">取消</button><button class="confrim popup_btn">确定</button></div>';

            var $box = popup.getContainer();

            $box.find('.popup_content').append(ele);

            if (c.buttons.length == 1) {
                var cls = c.buttons[0].type == 'closed'? '.cancel': '.confrim';
                if (c.buttons[0].type && c.buttons[0].type == 'closed') {
                    $box.find('.confrim').remove();
                    $box.find(cls).text(c.buttons[0].text);
                } else {
                    $box.find('.cancel').remove();
                    $box.find(cls).text(c.buttons[0].text);
                }
                
                if (c.buttons[0].click) {
                    
                    $box.find(cls).on('click', c.buttons[0].click);
                } else {
                    $box.find(cls).on('click', function () { o.hide() });
                }
            } else {
                $.each(c.buttons, function(i, v) {
                    $box.find('.popup_btn').eq(i).text(c.buttons[i].text);
                    if (c.buttons[i].click) {
                        $box.find('.popup_btn').eq(i).on('click', c.buttons[i].click);
                    } else {
                        $box.find('.popup_btn').eq(i).on('click', function () { o.hide() });
                    }
                });
            }
        }
    };


    var popup = {
        str: function () {  
            var box = $('<div class="poupup_box"><div class="popup_shade"></div><div class="popup_content"><div class="content"></div></div></div>');
            return box
        },
        getWidth: function() {
            return $('.poupup_box').find('.popup_content').width()
        },
        getHeight: function () {  
            return $('.poupup_box').find('.popup_content').height()
        },
        getContainer: function() {
            
            return $('.poupup_box.index'+ config.index);
        }
    }

    obj.prototype.render = function () {
        var o = this,
            c = o.config;

        var $con = popup.str();
        if (c.cls) {
            $con.find('.content').addClass(c.cls);
        }
        if (c.content) {
            $con.find('.popup_content .content').append(c.content);
        }
        if (c.beforeShow) {
            c.beforeShow($con.find('.content').get(0));
        }
        $con.addClass('index'+ c.index);
        $('body').append($con);
        var $box = popup.getContainer();
        o.show();
        o.bindEvent();
        if (c.load) {
            c.load($box.find('.content').get(0));
        }
        $box.find('.popup_shade').on('click', function () {
            o.hide();
        });
    };
    return new obj(config, $);
})
