PAGE_LOAD = function () {
    UPDATE_MANUAL_BREADCRUMB('系统', '用户管理');
    var userMange = {
        methods: {
            init: function () {
                $("#add").on("click", userMange.events.add);
                $("#btnSearch").on("click", userMange.events.aSearch);
            }
        },
        events: {
            onxiugai: function () {
                var index = $(this).parent().parent().parent();
                var api = $("#example").dataTable().api();
                var User_key = api.row(index).data().USER_KEY;
                userMange.events.editAdd(User_key)
                console.log(1);
            },
            add: function () {
                userMange.events.editAdd()
            },
            editAdd: function (User_key) {
                $(".demo").dialog({
                    cls: "",
                    title: ["用户"],
                    dlgWidth: 950,
                    dlgHeight: 600,
                    closed: false,
                    autofocus: true,
                    bindOpen: function (dialog) {
                        var __modal = this;
                        $.smui_help.fillData({ container: __modal, data: {} });
                        if (User_key) {
                            $.defs.request({
                                m: "SELECT",
                                TB_NAME: "USER",
                                USER_KEY: User_key
                            },
                            function (data) {
                                setReadOnlyEditor($(__modal).find("[field='USER_LOGIN']"), true);
                                $.smui_help.fillData({ container: __modal, data: data[0] });
                            }
                            )
                        } else {
                            setReadOnlyEditor($(__modal).find("[field='USER_LOGIN']"),false);
                        }

                    },
                    yes: function (lay, inde) {
                        var m = "INSERT";
                        if (User_key) {
                            m = "UPDATE";
                        }
                        $.smui_help.submit({
                            container: lay,
                            queryParams: function () {
                                return {
                                    m: m,
                                    TB_NAME: "USER",
                                    USER_KEY: User_key
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
            delete: function () {
                const tr = $(this).parent().parent().parent();
                const userKey = $("#example").dataTable().api().row(tr).data().USER_KEY;
                layer.confirm("您确定停用吗？", {
                    btn: ["确定", "取消"],
                    icon: 0,
                }, function (laye, index) {

                    $.smui_help.submit({
                        container: $("#example"),
                        queryParams: function () {
                            return {
                                m: "DELETE",
                                TB_NAME: "USER",
                                USER_KEY: userKey
                            }

                        },
                        bindSuccess: function () {
                            layer.close(laye);
                            const api = $("#example").dataTable().api()
                            api.ajax.reload(null, false);
                        }
                    })
                    //提交数据
                })
            },
            aSearch: function () {
                var api = $("#example").dataTable().api();
                api.ajax.reload(null, false);
            }
        },
        config: {
            init: function () {
                $("#example").dataTable({
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
                   data: "USER_LOGIN",
                   title: "登录名"
               },
               {
                   data: "USER_NAME",
                   title: '昵称'
               },
               {
                   data: "EMAIL",
                   title: '邮箱'
               },
               {
                   data: "CELL_PHONE",
                   title: '电话'
               },
               {
                   data: "PROFILE_NAME",
                   title: '权限'
               },
               {
                   data: "HOSPITAL_NAME",
                   title: "诊所"
               },
               {
                   data: "DOCTOR_NAME",
                   title: '医生'
               },
               {
                   data: "STATUS_NAME",
                   title: "状态"
               },
               {
                   data: null,
                   title: '操作',
                   defaultContent: "<div style='font-size:18px;'><i class='ui blue basic edit icon xiugai' data-content='修改' style='cursor:pointer'></i><i class='ui blue basic ban icon ' data-content='停用'  style='cursor:pointer'></i></div>"

               }

                    ],
                    ajax: {
                        beforeRequest: function () {
                            return {
                                m: "LIST",
                                TB_NAME: "USER",
                                 USER_NAME: $("#txtUSER_NAME").val(),
                                PROFILE_KEY: $("#quanxian").smui_dropdown("getValue"),
                            }
                        }
                    },
                    preDrawCallback: function () {
                        $.tools.showLoading();
                    },
                    drawCallback: function () {
                        $.tools.hideLoading();
                        $(".xiugai").on("click", userMange.events.onxiugai);
                        $(".ban").on("click", userMange.events.delete);
                        $(".xiugai").popup();
                        $(".ban").popup();
                    }
                })
                window.onload = function () {
                    $("#example").dataTable().api().ajax.reload(null, false);
                }
            }
        }
    }
    userMange.config.init();
    userMange.methods.init();
}

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
var d2 = {
    textField: "PROFILE_NAME",
    valueField: "PROFILE_KEY",
    canDisplayWholeItem: false,
    fireOnInit: true,
    queryParams: function () {
        return {
            m: "LIST",
            JSON_TYPE: "NOTOTAL",
            TB_NAME: "PROFILE"
        }
    }
}
var HospitalConfig = {
    url: handler_url,
    queryParams: function () {
        return {
            m: "LIST",
            JSON_TYPE: "NOTOTAL",
            TB_NAME: "IVBABY_HOSPITAL"
        }
    },
    onLoadSuccess: function (data) {
    },
    autoFillFirstData: false,
    canDisplayWholeItem: false,
    textField: 'HOSPITAL_NAME',
    valueField: 'HOSPITAL_KEY'
}
var DoctorConfig = {
    url: handler_url,
    queryParams: function () {
        return {
            m: "LIST",
            JSON_TYPE: "NOTOTAL",
            TB_NAME: "IVBABY_DOCTOR",
            IS_ALL: "Y"
        }
    },
    onLoadSuccess: function (data) {
    },
    autoFillFirstData: false,
    canDisplayWholeItem: false,
    textField: 'DOCTOR_NAME',
    valueField: 'DOCTOR_KEY'

}
var SexConfig = {
    url: handler_url,
    queryParams: function () {
        return {
            m: "LIST",
            JSON_TYPE: "NOTOTAL",
            TB_NAME: "VARIABLE",
            DB_NAME: "GLOBAL",
            VARIABLE_TYPE: "SEX_VARIABLE_KEY"
        }
    },
    onLoadSuccess: function (data) {
    },
    autoFillFirstData: false,
    canDisplayWholeItem: false,
    textField: 'VARIABLE_DESC',
    valueField: 'VARIABLE_KEY'
}
var CertTypeConfig = {
    url: handler_url,
    queryParams: function () {
        return {
            m: "LIST",
            JSON_TYPE: "NOTOTAL",
            TB_NAME: "VARIABLE",
            DB_NAME: "GLOBAL",
            VARIABLE_TYPE: "CERT_VARIABLE_KEY"
        }
    },
    onLoadSuccess: function (data) {
    },
    autoFillFirstData: false,
    canDisplayWholeItem: false,
    textField: 'VARIABLE_DESC',
    valueField: 'VARIABLE_KEY'
}