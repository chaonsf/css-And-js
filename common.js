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
            error:options.error?options.error:$.defs.error,
            data: postdata ? postdata : {}
        };

        $.ajax(defaults).done(options.success).fail(options.error).always(options.complete);
    },
    url: '../',
    error:function () {
        $.defs.loadinghide();
        $.defs.msg("服务器错误")
    },
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
    selectOption: function(data, key, name) {
        var optionHtml = "";
        for (var i = 0; i < data.length; i++) {
            optionHtml += "<option value='" + data[i][key] + "'>" + data[i][name] + "</option>"
        }
        return optionHtml
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
            $shtml.find("#toasta").fadeOut(1000)
            $shtml.remove()
        }, 2000);
    },
    loadingshow: function() {
        var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "正在加载中";
        var $loadingToast = $('#loadingToast');
        $loadingToast.show().fadeIn(100);
        $loadingToast.find('.weui-toast__content').html(text);

    },
    loadinghide: function() {
        $('#loadingToast').fadeOut(100);
    },



}
