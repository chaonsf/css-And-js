PAGE_LOAD = function () {
    var Sms = {
        methods: {
            init: function () {
                $("#btnSearch").on("click", Sms.events.chazhao);
                $("#add").on("click", Sms.events.add);
            }
        },
        events: {
            edit: function () {
                var index = $(this).closest("tr");
                var api = $("#example").dataTable().api();
                var Template_key = api.row(index).data().TEMPLATE_KEY;
                Sms.events.editAndadd(Template_key);
            },
            chazhao: function () {
                var api = $("#example").dataTable().api();
                api.ajax.reload(null, false);
            },
            initContextMenu: function () {
                var _contextMenu = [];
                var _subMenu = [];
                $(contextMenuData).each(function (index, row) {
                    _subMenu.push({
                        text: row.WILDCARD_TEXT,
                        uid: row.WILDCARD_TEXT,
                        func: function () {
                            Sms.events.insertVar.call(this, arguments);//#txtSMSContent
                        }
                    })
                });
               
                _contextMenu.push(_subMenu);
                $("#txtSMSContent").smartMenu(_contextMenu, {
                    name: "",
                    beforeShow: function () {
                        console.log(1);
                    },
                    afterShow: function () {
                        console.log(2)
                    }
                });
            },
            insertVar: function (args) {
                var uid = args[0];
                $(this).insertAtCursor("{" + uid + "}")
                Sms.events.totalContextLength.call(this);  //#txtSMSContent
            },
            totalContextLength: function () {
                var _len = $(this).val().length;
                $("#spnSMSContextLength").text(_len);
            },
            add: function () {
                Sms.events.editAndadd();
            },
            trash: function () {
                var index = $(this).parent().parent().parent();
                var api = $("#example").dataTable().api();
                var TEMPLATE_KEY = api.row(index).data().TEMPLATE_KEY;
                layer.confirm("您确定删除吗?", {
                    btn: ["确定", "取消"],
                    icon: 0,
                },
                function (lay, inde) {
                    $.smui_help.submit({
                        container: $("#example"),
                        queryParams: function () {
                            return {
                                m: "DELETE",
                                TB_NAME: "IVBABY_TEMPLATE",
                                TEMPLATE_KEY: TEMPLATE_KEY,
                            }
                        },
                        bindSuccess: function () {
                            layer.close(laye);
                            var  api = $("#example").dataTable().api()
                            api.ajax.reload(null, false);
                        }
                    })
                }
                )
            },
            editAndadd: function (Template_key) {
                $(".DemoA").dialog({
                    cls: "",
                    title: ["短信模板信息"],
                    dlgWidth: 700,
                    dlgHeight: 510,
                    zIndex: 500,
                    autofocus: true,
                    bindOpen: function (dialog) {
                        Sms.events.initContextMenu();
                        $("#txtSMSContent").keyup(Sms.events.totalContextLength);
                        var __modal = this;
                        $.smui_help.fillData({ container: __modal, data: {} });
                        if (Template_key) {
                            $.defs.request({
                                m: "SELECT",
                                TB_NAME: "IVBABY_TEMPLATE",
                                TEMPLATE_KEY: Template_key,
                            }, function (data) {
                                setReadOnlyEditor($(__modal).find("[field='TEMPLATE_KEY']"), true);
                                $.smui_help.fillData({ container: __modal, data: data[0] });
                                Sms.events.totalContextLength.call($("#txtSMSContent"));
                            }
                       )
                        } else {
                            setReadOnlyEditor($(__modal).find("[field='TEMPLATE_KEY']"), false);
                            Sms.events.totalContextLength.call($("#txtSMSContent"));
                        }
                    },
                    yes: function (lay, inde) {
                        var m = "INSERT";
                        if (Template_key) {
                            m="UPDATE"
                        }
                        $.smui_help.submit({
                            container: lay,
                            queryParams: function () {
                                return {
                                    m: m,
                                    TB_NAME: "IVBABY_TEMPLATE",
                                    TEMPLATE_KEY: Template_key,
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
            },
        },
        config: {
            init: function () {
                $("#example").DataTable({
                    responsive: true,
                    iDisplayLength:5,
                    columns: [
                     {
                         data: null,
                         title: "序号",
                         "targets": 0,
                         render: function (data, type, row, meta) {
                             var settings = meta.settings;
                             var page = settings._iDisplayStart;
                             var index = meta.row;
                             return parseInt(page) + (index + 1)
                         }
                     },
                     {
                         data: "TEMPLATE_NAME",
                         title:"模板名称"
                     },
                     {
                         data: "TEMPLATE_TEXT",
                         title:"模板内容"
                     },
                     {
                         data: null,
                         title: "操作",
                         defaultContent: "<div style='font-size:18px;'><i class='ui blue basic edit icon xiugai' data-content='修改' style='cursor:pointer'></i><i class='ui red basic trash icon ' data-content='删除'  style='cursor:pointer'></i></div>"
                     }
                    ],
                    ajax: {
                        beforeRequest: function () {
                            return {
                                m: "LIST",
                                TB_NAME: "IVBABY_TEMPLATE",
                                TEMPLATE_NAME: $("#temname").val(),
                                TEMPLATE_TYPE_VARIABLE_KEY:22101
                            }
                        }
                    },
                    preDrawCallback: function () {
                        $.tools.showLoading();
                    },
                    drawCallback: function () {
                        $.tools.hideLoading();
                        $(".xiugai").on("click", Sms.events.edit);
                        $(".xiugai").popup();
                        $(".trash").popup();
                        $(".trash").on("click", Sms.events.trash);
                    }
                })
            }
        }

    }
    Sms.config.init();
    Sms.methods.init();
}
var contextMenuData = [{ "WILDCARD_TEXT": "患者", "WILDCARD_WITH_FIELD": "MEMBER_NAME", "LANGUAGE_KEY": "0", "WILDCARD_KEY": "1000", "WILDCARD_TYPE": "22101" }, { "WILDCARD_TEXT": "医生", "WILDCARD_WITH_FIELD": "DOCTOR_NAME", "LANGUAGE_KEY": "0", "WILDCARD_KEY": "1001", "WILDCARD_TYPE": "22101" }, { "WILDCARD_TEXT": "预约日期", "WILDCARD_WITH_FIELD": "SCHEDULE_DAY", "LANGUAGE_KEY": "0", "WILDCARD_KEY": "1002", "WILDCARD_TYPE": "22101" }, { "WILDCARD_TEXT": "预约时间", "WILDCARD_WITH_FIELD": "SCHEDULE_TIME", "LANGUAGE_KEY": "0", "WILDCARD_KEY": "1003", "WILDCARD_TYPE": "22101" }, { "WILDCARD_TEXT": "地址", "WILDCARD_WITH_FIELD": "ADDRESS", "LANGUAGE_KEY": "0", "WILDCARD_KEY": "1004", "WILDCARD_TYPE": "22101" }, { "WILDCARD_TEXT": "电话", "WILDCARD_WITH_FIELD": "SCHEDULE_PHONE", "LANGUAGE_KEY": "0", "WILDCARD_KEY": "1005", "WILDCARD_TYPE": "22101" }];