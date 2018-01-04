PAGE_LOAD = function () {
    var biaoge = {
        methods: {
            init: function(){
                $("#btnSearch").on("click", biaoge.events.zengjia);
                $("#aSearch").on("click", biaoge.events.chaxun);
                $(".right #Search").on("click", biaoge.events.baocun);
                $(".right #Search").on("click", biaoge.events.heji);
                $("#shanchu").on("click", biaoge.events.shanchu);
                $("#shanchu").on("click", biaoge.events.heji);
                $(".right #quxiao").on("click", biaoge.events.quxiao);
                $("#edit").on("click", biaoge.events.edit);
                $("#btnSuccess").on("click", biaoge.events.heji);
                $("#bbb").on("click", biaoge.events.reload);
               
            }  
        },
        events: {
            reload:function(){
                $(".ui.table.smslist").smui_template("refresh", 1);
            },
            quxiao:function(){
                $(".add").hide();
                $(".right").hide();
            },
            zengjia: function () {
                $(".add").show();
                $(".right").show();
                $.smui_help.fillData({
                    container: ".table .add",  //清空add里面的数据
                    data: {
                        money:0
                    }
                })
                var x = $(".add").offset().top;
                var y = $(".add").offset().left;
                $(".content .right").css({
                    position: "absolute",
                    left: y + 1200 + "px",
                    top: x + "px",
                    zIndex: "9999"
                })
            },
            heji: function () {
                var moneyValue = 0;
                $.each($(".tablea tr"), function (index, obj) {
                    moneyValue += parseFloat($(obj).find("td[field=money]").text())
                })
                $(".heji").html(moneyValue.toFixed(2));
            },
            baocun:function(){
                $(".add").hide();
                $(".content .right").hide();
                var baocunData = $.smui_help.submit({
                            container:".table .add"
                    })
                var vendorName = $(".table .add .sale").smui_search("getSelectedItem").VENDOR_NAME;
                var value = $(".add th div[field=typ]").smui_dropdown("getSelectedItem").value;
                var submitData = {
                    project: baocunData.project,
                    typ:baocunData.typ,
                    VENDOR_NAME: vendorName,
                    text: value,
                    VENDOR_KEY: baocunData.VENDOR_KEY,
                    date:baocunData.date,
                    money:baocunData.money
                }
                if ($(".tablea tr").hasClass("edit")) {
                    $.smui_help.fillData({
                        container: ".edit",
                        data: submitData,
                    })
                    var obk = JSON.stringify(submitData);
                    $(".edit").attr({
                        "data-obj": obk
                    })
                    var stringjson = $(".edit").attr("data-obj");
                    var obj = JSON.parse(stringjson);
                    $.smui_help.fillData({
                        container: ".add",
                        data: obj
                    })
                } else {
                    aHtml = "<tr><td>" + ($(".tablea tr").length + 1) + "</td><td field='project'>" + submitData.project + "</td><td field='typ'>" + submitData.typ + "</td><td field='VENDOR_NAME'>" + submitData.VENDOR_NAME + "</td><td field='date'>" + submitData.date + "</td><td field='money'>" + submitData.money + "</td></tr>";
                    $(".tablea").append(aHtml);
                }
                $(".tablea tr").on("click", biaoge.events.tatr);
               
            },
            chaxun:function(){
                var axiangmu = $("#xiangmu").smui_text("getValue");
                var aType = $("#tiaojian").smui_dropdown("getValue");
                var moneyValue = 0;
                var tableLength = $(".table .tablea tr").length;
                if (axiangmu == "" && aType == "") {
                    $(".table .tablea tr").removeClass("hide");

                } else {
                    for (var i = 0; i < tableLength; i++) {

                        if ($(".table .tablea tr").eq(i).find("td:eq(1)").html().indexOf(axiangmu) > -1 && $(".table .tablea tr").eq(i).find("td:eq(2)").html().indexOf(aType) > -1) {
                            $(".table .tablea tr").eq(i).removeClass("hide");
                        } else {
                            $(".table .tablea tr").eq(i).addClass("hide");

                        }
                    }
                }
                var ahide = $(".tablea tr:not(.hide)");
                for (var i = 0; i < ahide.length; i++) {
                    moneyValue+= parseFloat(ahide.eq(i).find("td:last").text());
                }
                $(".heji").html(moneyValue.toFixed(2))
            },
            shanchu: function () {
                $(".table .tablea tr.choose").remove();
                for (var i = 0; i < $(".tablea tr").length; i++) {
                    $(".tablea tr").eq(i).find("td:first").html(i+1)
                }
            },
            tatr: function () {
                $(this).addClass("choose").siblings().removeClass("choose");
                $(this).addClass("edit").siblings().removeClass("edit");
            },
            edit: function () {
                var x = $(".edit").offset().top;
                var y = $(".edit").offset().left;
              
                $(".content .right").show();
                $(".add").show();
                $(".add").css({
                    position: "absolute",
                    left: y+ "px",
                    top: x + "px",
                    zIndex:"9999"
                })
                $(".content .right").css({
                    position: "absolute",
                    left: y+1200 + "px",
                    top: x + "px",
                    zIndex: "9999"
                })
                var baocunData = $.smui_help.submit({
                     container:".edit"
                  })
               
                $.smui_help.fillData({
                    container: ".add",
                    data: baocunData
                })

            },
            //revise: function () {
            //    var reviseData = $.smui_help.submit({
            //        container:".bianji"
            //    })
            //    var vendorName = $(".table .add .sale").smui_search("getSelectedItem").VENDOR_NAME;
            //    var text = $(".add th div[field=typ]").smui_dropdown("getSelectedItem").value;
            //    var aEditdata= {
            //        project:reviseData.project,
            //        typ: reviseData.typ,
            //        VENDOR_NAME: vendorName,
            //        text: text,
            //        VENDOR_KEY: reviseData.VENDOR_KEY,
            //        date: reviseData.date,
            //        money: reviseData.money
            //    }
            //    $.smui_help.fillData({
            //        container: ".edit",
            //        data: aEditdata
            //    })

            //    var obk = JSON.stringify(aEditdata);
            //    $(".edit").attr({
            //        "data-obj":obk
            //    })

            //    var stringjson = $(".edit").attr("data-obj");
            //    var obj = JSON.parse(stringjson);
            //    $.smui_help.fillData({
            //        container: ".add",
            //        data: obj
            //    })
            //    $(".fuceng").hide();
            //},
            
         

        },
        config: {
            init: function () {
                $(".ui.table.smslist").smui_template({
                    context: $("#tbTemplate").html(),
                    renderTo: "tbody",
                    action: "append",
                    clearBeforeRender: "*",
                    data: null,
                    onLoadSuccess: function () {
                        $(this).find("a[name=btnUpdate]").on("click", function () {
                            var a = $(this).closest("tr").index();
                            alert(a)
                        })
                    },
                    onEvenLoadSuccess: function ($result, settings, index) {
                       
                    },
                    pagination: {
                        url: handler_url,
                        queryParams: function () {
                            return QUERY_API_SETTING("#tblQuery", {
                                m: "LIST",
                                TB_NAME: "IVBABY_TEMPLATE",
                                TEMPLATE_TYPE_VARIABLE_KEY: 22101,
                                TEMPLATE_NAME: $("#tblQuery tr td.td_normal_width input").val()
                            });
                        },
                        pageSize:5,
                        type: "whole"
                    }
                })
            }
        }
    }
    biaoge.config.init();
    biaoge.methods.init();
     
  
  
}

var d1 = {
    data: [{ text: "A1", value: 1},
        { text: "A2", value: 2 },
         { text: "A3", value: 3},
    ],
    textField: "text",
    valueField: "text",
    canDisplayWholeItem: true,

}
var d2 = {
    data: [{ text: "A1", value: 1 },
          { text: "A2", value: 2},
          { text: "A3", value: 3 },
       ],
    textField: "text",
    valueField: "text",
    
}


var d3={
    type: "money",
    minTarget: "0",
    maxTarget: "100",
    
}
var s1 = {
    selectedTextFormat: '{VENDOR_NAME}',//显示内容
    valueField: ' VENDOR_KEY',//值内容
    searchFields: ['VENDOR_KEY'],//查询字段
    popupWidth: 480,//弹出宽度
    queryParams: function () { //后台参数
        return {
            m: "LIST",
            SP_NAME: "SP_VENDOR_LIST",
            VENDOR_NAME: "$@$QUERY"
        }
    },
    popupTableFields: [{ title: '供应商', name: 'VENDOR_NAME' }],//对应弹出框显示字段
    searchId: "VENDOR_NAME",
    searchQueryPageSize:5,
    searchQueryParams: function () {
        var t= {
            m: "LIST",
            SP_NAME: "SP_VENDOR_LIST",
            VENDOR_NAME: $(".for_search.VENDOR_NAME  .ui.input.query input").smui_text("getValue")
        }
        //console.log(t);
        return t;
    }
}