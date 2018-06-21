$.defs = {
    submit: function(opts) {
        opts = opts || {};
        var container = opts.container || 'body';
        var param = {};
        $.each($(container).find('[field]'), function(i, v) {
            var item = $(v);
            var key = item.attr('field');
            if (key == "") return;
            if (item.attr('field_op') != "fill") {
                var value = $.defs.getValue(item);
                param[key] = value;
            }
        });
        if (opts.beforeSubmit && $.isFunction(opts.beforeSubmit)) {
            param = opts.beforeSubmit(param);
            if (!param) {
                opts.success = null;
            }
        } else {
            return param
        }
        if (opts.success) {
            if (opts.url != "") {
                // $.defs.request({
                //     url: opts.url,
                //     data: param,
                //     success: opts.success,
                //     error: opts.error,
                //     complete: opts.complete
                // })
                $.defs.request(param, {
                    url: opts.url,
                    success: opts.success,
                    error: opts.error,
                    complete: opts.complete
                })
            }
        }
    },
    setup: function(opts) {
        var container = opts.container || 'body';
        var data = opts.data;
        $.each($(container).find('[field]'), function(i, v) {
            var item = $(v);
            var key = item.attr('field');
            if (key == "") return
            if (item.attr('field_op') != "out") {
                $.defs.setValue(item, data[key]);
            }
        });

    },
    getValue: function(item) {
        var param;
        var type = $.defs.getType(item);
        if (type == 'input') {
            param = $(item).val();
        } else if (type == 'select') {
            param = $(item).find('option:selected').val()
        } else {
            param = $(item).html();
        }
        return param
    },
    setValue: function(item, data) {
        var type = $.defs.getType(item);
        if (type == 'input') {
            $(item).val(data);
        } else {
            $(item).html(data);
        }
    },
    getType: function(param) {
        var type = "";
        if ($(param).is("select")) {
            type = 'select';
        } else if ($(param).is("input")) {
            type = 'input'
        }
        return type
    },
    request: function(postdata, options) {
        var defaults = {
            url: options.url ? options.url : $.defs.url + "json/request",
            type: options.type ? options.type : 'post',
            dataType: 'json',
            data: postdata ? postdata : {}
        };

        $.ajax(defaults).done(options.success).fail(options.error).always(options.complete);
    },
    url: '../',
    getUrlAllParams: function(url) {
        var url = url ? url : window.location.href;
        var _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for (var i = 0, _len = _arrS.length; i < _len; i++) {
            var pos = _arrS[i].indexOf('=');
            if (pos == -1) {
                continue;
            }
            var name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        }
        return _rs;
    },
    getNowFormatDate: function() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    detectionPhone: function(phone) {
        return /^1[3|4|5|7|8][0-9]{9}$/.test(phone);
    },
    delParamsUrl: function(url, name) {
        var baseUrl = url.split('?')[0] + '?';
        var query = url.split('?')[1];
        if (query.indexOf(name) > -1) {
            var obj = {}
            var arr = query.split("&");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].split("=");
                obj[arr[i][0]] = arr[i][1];
            };
            delete obj[name];
            var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
            return url
        } else {
            return url;
        }
    },
    subString: function(str) {
        if (typeof str == 'string') {
            var ruten = str.substring(3, 7);
            return str.replace(ruten, '****');
        }
    },
    subId: function(str) {
        return str.replace(/^(.{6})(?:\d+)(.{4})$/, "$1****$2");
    },
    headerHtml: function(content) {
        var headerHtml = "<div class=\"weui-flex\">\n" +
            "\t\t\t<div class=\"weui-flex__item\">\n" +
            "\t\t\t\t<h2>保服通OA</h2>\n" +
            "\t\t\t</div>\n" +
            "\t\t\t<div class=\"weui-flex__item\" style=\"text-align: right;\">\n" +
            "\t\t\t\t<h4 style=\"padding-top: 10px;\">" + content + "</h4>\n" +
            "\t\t\t</div>\n" +
            "\t\t</div>"
        $(".top").append(headerHtml);
    },
    weui_msga: function(content) {
        var _html = '<div id="toast">\n' +
            '        <div class="weui-mask_transparent"></div>\n' +
            '        <div class="weui-toast">\n' +
            '            <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n' +
            '            <p class="weui-toast__content">' + content + '</p>\n' +
            '        </div>\n' +
            '    </div>'
        var $shtml = $(_html);
        $(document.body).append($shtml);
        setTimeout(function() {
            $shtml.find("#toast").fadeOut(200)
            $shtml.remove()
        }, 1000);
    },
    selectOption: function(data, key, name) {
        var optionHtml = "";
        for (var i = 0; i < data.length; i++) {
            optionHtml += "<option value='" + data[i][key] + "'>" + data[i][name] + "</option>"
        }
        return optionHtml
    },
    show_alert: function(title, content) {
        var _html = '<div class="js_dialog" id="dialog_alert" style="display:none;"> <div class="weui-mask"></div> <div class="weui-dialog"> ' +
            '<div class="weui-dialog__hd"><strong class="weui-dialog__title">' + title + '</strong></div>' +
            '<div class="weui-dialog__bd">' + content + '</div> <div class="weui-dialog__ft">' +
            '<a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a> </div> </div> </div>';
        var $html = $(_html);
        $(document.body).append($html);

        $html.on("click", function() {
            var $dlg = $(this).closest(".js_dialog");
            $dlg.fadeOut(50, function() {
                $dlg.remove();
            });
        })
        $html.fadeIn(50);
    },
    /*不联动*/
    pickData: function(arr, name) {
        var data = [];
        for (var i = 0; i < arr.length; i++) {
            data.push({
                label: arr[i][name],
                value: i
            })
        }
        return data
    },
    //错误提示
    msg: function(content) {
        var _html = '<div id="toasta">\n' +
            '        <div class="weui-mask_transparent"></div>\n' +
            '        <div class="weui-toast" style="width: 110px">\n' +
            '            <i class="weui-icon-info-circle"></i>\n' +
            '            <p class="weui-toast__content">' + content + '</p>\n' +
            '        </div>\n' +
            '    </div>'
        var $shtml = $(_html);
        $(document.body).append($shtml);
        setTimeout(function() {
            $shtml.find("#toasta").fadeOut(200)
            $shtml.remove()
        }, 2000);
    },
    loadingshow: function(content) {
        var _html = '<div id="loadingToast">\n' +
            '        <div class="weui-mask_transparent"></div>\n' +
            '        <div class="weui-toast">\n' +
            '            <i class="weui-loading weui-icon_toast"></i>\n' +
            '            <p class="weui-toast__content">' + content + '</p>\n' +
            '        </div>\n' +
            '    </div>'
        var $html = $(_html);
        $(document.body).append($html);
        setTimeout(function() {
            $html.find("#loadingToast").fadeOut(200)
            $html.remove()
        }, 100);
       /* var $loadingToast = $('#loadingToast');
        $loadingToast.show().fadeIn(100);
        $loadingToast.find('.weui-toast__content').html(content);*/

    },
    loadinghide: function() {
        $("#loadingToast").hide()
    }


}