PAGE_LOAD = function () {
    UPDATE_MANUAL_BREADCRUMB('系统', '权限管理');
    var Royal = {
        methods: {
            init: function () {
                $("#add").on("click", Royal.events.add);
                $("#btnSearch").on("click", Royal.events.aSearch);
            }

        },
        events: {
            aSearch:function(){
                var api = $("#example").dataTable().api();
                api.ajax.reload(null, false);
            },
            edita: function () {
                var index = $(this).parent().parent();
                var api = $("#example").dataTable().api();
                var Profile_key = api.row(index).data().PROFILE_KEY;
                Royal.events.editAdd(Profile_key)
            },
            power: function () {
                var index = $(this).parent().parent();
                var api = $("#example").dataTable().api();
                var Profile_key = api.row(index).data().PROFILE_KEY;
                $(".demoQ").dialog({
                    title: ["权限菜单设置", "font-weight:bolder;font-size:20px;background:#F9FAFB"],
                    dlgWidth: 600,
                    dlgHeight: 600,
                    closed: false,
                    autofocus: false,
                    bindOpen: function (dialog) {
                        var modify_flag = true;
                        var __modal = this;
                        $.defs.request({
                            m: "SELECT",
                            SP_NAME: "SP_MENU_LIST",
                           
                        },
                         function (data) {
                             var str = data;
                             var daya = {
                                 loc: [],
                             }
                             for (var i = 0; i < data.length; i++) {
                                 if (data[i].PARENT_MENU_KEY == 0) {
                                     var row = $.extend({}, data[i]);
                                     row.sub = [];
                                     daya.loc.push(row);
                                     var menu_ky = row.MENU_KEY;
                                     for (var j = 0; j < data.length; j++) {
                                         if (data[j].PARENT_MENU_KEY == menu_ky) {
                                             if (row.sub && $.isArray(row.sub)) {
                                                 row.sub.push(data[j]);

                                             } else {
                                                 row.sub=[data[j]]
                                             }
                                         }
                                     }
                                 }
                             }
                             var Shtml = template("demoB", daya);
                             $(dialog).html(Shtml);
                             $(dialog).find(".ui.checkbox").checkbox({
                                 onChange: function () {
                                     var _this = $(this)
                                     var menu_key = _this.parent().attr("menu_key");
                                     var attrField = _this.parent().attr("field");
                                     var parent_key = _this.parent().attr("parent_key");
                                     if (parent_key == 0) {
                                         //说明是一级菜单
                                         if (_this.parent().checkbox("is checked")) {
                                             _this.parent().parent().find(".ui.list .item").find(".ui.checkbox[field=" + attrField + "]").checkbox("set checked");

                                         } else {
                                             _this.parent().parent().find(".ui.list .item").find(".ui.checkbox[field=" + attrField + "]").checkbox("set unchecked");
                                         }
                                     } else {
                                         //说明是二级菜单
                                         if (_this.parent().checkbox("is checked")) {
                                             _this.parent().parent().parent().parent().find("div.ui.checkbox[parent_key=0][field=" + attrField + "]").checkbox("set checked")
                                         }
                                         else {
                                             _this.parent().parent().parent().parent().find("div.ui.checkbox[parent_key=0][field=" + attrField + "]").checkbox("set unchecked")
                                         }

                                         var childr = _this.closest(".ui.list").find(".ui.checkbox[field=" + attrField + "]").checkbox("is checked");
                                         var Alength = $.inArray(true, childr);//判断数组childr里面是否含有true，有则返回true的位置，没有则返回-1


                                         switch (Alength) {
                                             case -1:
                                                 _this.parent().parent().parent().parent().find("div.ui.checkbox[parent_key=0][field=" + attrField + "]").checkbox("set unchecked");
                                                 break;
                                             default:
                                                 _this.parent().parent().parent().parent().find("div.ui.checkbox[parent_key=0][field=" + attrField + "]").checkbox("set checked");
                                                 break;
                                         }

                                     }
                                 }
                             })
                             //权限开关设置
                             $.defs.request({
                                 m: "SELECT",
                                 SP_NAME: "SP_PROFILE_MNU_LIST",
                                 PROFILE_KEY: Profile_key
                             },

                          function (data) {

                              for (var i = 0; i < data.length; i++) {
                                  var row = data[i];
                                  var $checkbox = $(dialog).find("div.ui.checkbox[menu_key=" + row.MENU_KEY + "][field=ENABLE]");
                                  if (row.ENABLE == "Y") //row.VISIBLE
                                  {
                                      $checkbox.checkbox("set checked");
                                  }
                                  else {
                                      $checkbox.checkbox("set unchecked");
                                  }

                                  $checkbox = $(dialog).find("div.ui.checkbox[menu_key=" + row.MENU_KEY + "][field=VISIBLE]")

                                  if (row.VISIBLE == "Y") {
                                      $checkbox.checkbox("set checked");
                                  } else {
                                      $checkbox.checkbox("set unchecked");
                                  }


                              }
                              


                          }
                         )
                         }
                        )
                    },
                    //保存数据
                    yes: function (lay, inde) {
                        $.smui_help.submit({
                            container: lay,
                            queryParams: function () {
                                return {
                                    m: "UPDATE",
                                    SP_NAME: "SP_PROFILE_MNU_LIST",
                                    PROFILE_KEY: Profile_key    //接口有问题
                                }
                            },
                            bindSuccess: function (data) {
                                layer.close(inde);
                                api.ajax.reload(null, false);
                            }
                        })

                    }
                })
            },
            achart: function () {
                var index = $(this).parent().parent();
                var api = $("#example").dataTable().api();
                var Profile_key = api.row(index).data().PROFILE_KEY;
                $(".demoE").dialog({
                    title: ["权限报表设置", "font-weight:bolder;font-size:20px;background:#F9FAFB"],
                    dlgWidth: 600,
                    dlgHeight: 600,
                    closed: false,
                    autofocus: false,
                    bindOpen: function (dialog) {
                        var modify_flag = true;
                        var __modal = this;
                        $.defs.request({
                            m: "LIST",
                            JSON_TYPE: "NOTOTAL",
                            TB_NAME: "REPORT",
                            PARENT_MENU_KEY: 0
                        },
                        function (data) {
                          //  console.log(data);
                            var chatt = {
                                chara:[]
                            }
                            for (var i = 0; i < data.length; i++) {
                                chatt.chara.push(data[i])
                            }
                            console.log(chatt)
                            var aHtml = template("demoP",chatt);
                            $(dialog).html(aHtml);
                            $(dialog).find(".ui .checkbox").checkbox({
                                onChange: function () {
                                    var _this = $(this);

                                }
                            })
                            $.defs.request({
                                m: "LIST",
                                TB_NAME: "PROFILE_REPORT",
                                JSON_TYPE: "NOTOTAL",
                                PROFILE_KEY: Profile_key
                            },
                             function (data) {
                                 console.log(data);
                                 for (var i = 0; i < data.length; i++) {
                                     var row = data[i];
                                     var $checkbox = $(dialog).find("div.ui.checkbox[field=ENABLE]");
                                     if (row.ENABLE == "Y") {
                                         $checkbox.checkbox("set checked");
                                     } else {
                                         $checkbox.checkbox("set unchecked");
                                     }
                                     $checkbox = $(dialog).find("div.ui.checkbox[field=VISIBLE]");
                                     if (row.VISIBLE == "Y") {
                                         $checkbox.checkbox("set checked");
                                     } else {
                                         $checkbox.checkbox("set unchecked");
                                     }
                                 }
                             }
                            )

                        }
                        )
                    },
                    yes: function (lay, inde) {
                        $.smui_help.submit({
                            container: lay,
                            queryParams: function () {
                                return {
                                    m: "UPDATE",
                                    JSON_TYPE: "NOTOTAL",
                                    TB_NAME: "REPORT",
                                    PARENT_MENU_KEY: 0,
                                    PROFILE_KEY: Profile_key//接口可能有问题
                                }
                            },
                            bindSuccess: function (data) {
                                layer.close(inde);
                                api.ajax.reload(null, false);
                            }
                        })
                    }
                })
            },
            add: function () {
                Royal.events.editAdd()
            },
            editAdd: function (Profile_key) {
                $(".demoF").dialog({
                    cls: "",
                    title: ["权限管理", "font-weight:bolder;font-size:20px;background:#F9FAFB"],
                    dlgWidth: 760,
                    dlgHeight: 240,
                    closed: false,
                    autofocus: true,
                    bindOpen: function (dialog) {
                        var __modal = this;
                        $.smui_help.fillData({ container: __modal, data: {} });
                        if (Profile_key) {
                            $.defs.request({
                                m: "SELECT",
                                TB_NAME: "PROFILE",
                                PROFILE_KEY: Profile_key
                            },
                            function (data) {
                                setReadOnlyEditor($(__modal).find("[field='PROFILE_KEY']"), true);
                                $.smui_help.fillData({ container: __modal, data: data[0] });
                            }
                            )
                        } else {
                            setReadOnlyEditor($(__modal).find("[field='PROFILE_KEY']"), false);
                        }

                    },
                    yes: function (lay, inde) {
                        var m = "INSERT";
                        if (Profile_key) {
                            m="UPDATE"
                        }
                        $.smui_help.submit({
                            container: lay,
                            queryParams: function () {
                                return {
                                    m:m,
                                    TB_NAME: "PROFILE",
                                    PROFILE_KEY: Profile_key
                                }
                            },
                            bindSuccess: function (data) {
                                layer.close(inde);
                                $.tools.hideLoading();
                                var api = $("#example").dataTable().api()
                                api.ajax.reload(null, false);
                            }
                        })
                    }
                })
            }
        },
        config: {
            init: function () {
                $("#example").DataTable({
                    responsive: true,
                    iDisplayLength: 5,
                    columns: [
                {
                    data: null,
                    title: "序号",
                    render: function (data, type, row, meta) {
                        var settings = meta.settings;
                        var page = settings._iDisplayStart;
                        var index = meta.row;
                        return parseInt(page) + (index + 1)
                    }
                },
                {
                    data: "PROFILE_NAME",
                    title: "权限",
                },
                {
                    data: "STATUS_KEY_DESC",
                    title: "状态"
                },
                {
                    data: null,
                    title: "操作",
                    defaultContent: "<i class='ui blue edit icon bianji'  data-content='修改' style='cursor:pointer' ></i> <i class='ui blue options icon quanxianm' data-content='权限菜单设置' style='cursor:pointer'></i><i class='ui blue line chart icon' data-content='权限报表设置' style='cursor:pointer'></i>"
                }
                    ],
                 ajax: {
                        beforeRequest: function () {
                            return {
                                m: "LIST",
                                TB_NAME: "PROFILE",
                                PROFILE_NAME: $("#txtUSER_NAME").val(),
                            }
                        }
                 },
                 preDrawCallback: function () {
                     $.tools.showLoading();
                 },
                 drawCallback: function () {
                     $.tools.hideLoading();
                     $(".bianji").on("click", Royal.events.edita);
                     $(".quanxianm").on("click", Royal.events.power);
                     $(".chart").on("click", Royal.events.achart);
                    
                     $(".bianji").popup();
                     $(".quanxianm").popup();
                     $(".chart").popup();
                 }
                })
                window.onload = function () {
                    $("#example").dataTable().api().ajax.reload(null, false);
                }
            }
        }
    }
    Royal.config.init();
    Royal.methods.init();
}

//权限管理
var d1 = {
    textField: "PROFILE_NAME",
    valueField: "PROFILE_KEY",
    autoFillFirstData: true,
    canDisplayWholeItem: true,
    fireOnInit: true,
    queryParams: function () {
        return {
            m: "LIST",
            JSON_TYPE: "NOTOTAL",
            TB_NAME: "PROFILE"
        }
    }
}
