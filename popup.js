! function(_win, $) {
    var popup = {
        method: {
            init: function(param) {
                var $box = popup.config.getContainer();
                if (param.buttons.length == 1) {
                    $box.find('.cancel').remove();
                    $box.find('.confrim').text(param.buttons[0].text);
                    if (param.buttons[0].click) {
                        $box.find('.confrim').on('click', param.buttons[0].click);
                    } else {
                        $box.find('.confrim').on('click', popup.event.onConfrim);
                    }
                } else {
                    $.each(param.buttons, function(i, v) {
                        $box.find('.popup_btn').eq(i).text(param.buttons[i].text);
                        if (param.buttons[i].click) {
                            $box.find('.popup_btn').eq(i).on('click', param.buttons[i].click);
                        } else {
                            $box.find('.popup_btn').eq(i).on('click', popup.event.onHide);
                        }
                    });
                }
                $('.popup_shade').on('click', popup.event.onHide);
            }
        },
        event: {
            onHide: function() {
                var boxwidth = popup.config.getWidth(),
                    $box = popup.config.getContainer();
                $('.popup_content').css('transform', 'translateX(' + boxwidth + 'px)');
                $('.popup_content').removeClass('slidrightIn').addClass('slidrightOut');
                $('.popup_shade').removeClass('animations').addClass('animations_out');
                setTimeout(function() {
                    $box.find('.cancel,.confrim').unbind();
                    $box.find('.popup_shade').unbind();
                    $('.poupup_box').remove();
                }, 500);
            },
            onShow: function() {
                $('.popup_shade').addClass('animations');
                $('.popup_content').addClass('slidrightIn');
            },
            onConfrim: function() {
                popup.event.onHide();
            }
        },
        config: {
            init: function(param) {
                $('body').append(popup.config.str());
                if (param.cls) {
                    $('.poupup_box').find('.content').addClass(param.cls);
                }
                if (param.content) {
                    $('.poupup_box').find('.popup_content .content').append(param.content);
                }
                if (param.beforeShow) {
                    param.beforeShow($('.poupup_box').find('.content').get(0));
                }
                popup.event.onShow();

            },
            str: function() {
                var box = $('<div class="poupup_box"><div class="popup_shade"></div><div class="popup_content"><div class="content"></div><div class="popup_buttons"><button class="cancel popup_btn">取消</button><button class="confrim popup_btn">确定</button></div></div></div>');
                return box
            },
            getWidth: function() {
                return $('.poupup_box').find('.popup_content').width()
            },
            getContainer: function() {
                return $('.poupup_box')
            }
        }
    }
    $.extend({
        showbox: function(param) {
            popup.config.init(param);
            popup.method.init(param);
        },
        hidebox: function() {
            popup.event.onHide();
        }
    });
}(window, $);