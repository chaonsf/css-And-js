import '../scss/weui.min.css';
import '../scss/iconfont.css'
import '../scss/public.scss';
import '../scss/index.scss';
import '../scss/popup.css';
import descroll from "../es6/components/scroll";
import Applyer  from  '../es6/components/applyer';
import listWindow from '../es6/components/listWindow';
import addition from '../es6/components/additional';
import versionUpdate from '../es6/components/version';
var $picker=null;
var commumal={
    dateToday(dateNumber){
        let  today=moment().format("YYYY-MM-DD");
        let dayName="";
        if(moment(dateNumber).format("YYYY-MM-DD")==today){
            dayName="今天";
        }
        else if(moment(dateNumber).add(1,'d').format("YYYY-MM-DD")==today){
            dayName="昨天";
        }
        else if(moment(dateNumber).add(2,'d').format("YYYY-MM-DD")==today){
            dayName="前天";
        }else if(moment(dateNumber).add(3,'d').format("YYYY-MM-DD")==today){
            dayName="大前天"
        }else{
            dayName=dateNumber;
        }
        return dayName
    },
    timePicker(opts){
        $picker= weui.datePicker({
                start:2017,
                end:2050,
                defaultValue:opts.default,
                onConfirm:function(result){
                    $("."+opts.className).find(".weui-picker").on('animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oAnimationEnd', function() {
                       commumal.HourMin(opts.finger, result,opts.hours,opts.className);
                  });
              },
              id:opts.className,
              className: opts.className
            })
    },
    HourMin(_this,date,tim,className){
        date[1]=date[1]-1;
        var dat =moment(date).format("YYYY-MM-DD");
        if (!commumal.hours.length) {
            for (var i = 0; i< 24; i++) {
                var hours_item = {};
                hours_item.label = ('' + i).length === 1 ? '0' + i : '' + i;
                hours_item.value = i;
                commumal.hours.push(hours_item);
            }
        }
        if (!commumal.minites.length) {
            for (var j= 0; j < 60; j++) {
                var minites_item = {};
                minites_item.label = ('' + j).length === 1 ? '0' + j : '' + j;
                minites_item.value = j;
                commumal.minites.push(minites_item);
            }
        }
       
     $picker=weui.picker(commumal.hours, commumal.symbol, commumal.minites, {
            defaultValue:tim,
            onConfirm: function(result) {
                var time = result[0].label + ':' + result[2].label;
                var expect_date = dat + ' ' + time;
                $(_this).val(expect_date)
            },
            id:"f"+className
        });
    },
    hours:[],
    minites:[],
    symbol:[{ label: ':', value: 0 }],
    isEmptyObj(obj){
        for(let key in obj){
            return false;
        }
        return true;
    },
    caching(){
        let item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "EHUSER";
        var ehuser=localStorage.getItem(item)
        return ehuser
    },
    uploader:0,
    picture(opts){
        weui.uploader(opts.ids, {
            url: '../file/Upload',
            auto:false,
            onQueued:opts.queued,
            onBeforeSend:opts.beforeSend,
            onBeforeQueued: function onBeforeQueued(files) {
                if (["image/jpg", "image/jpeg", "image/png", "image/gif"].indexOf(this.type) < 0) {
                    weui.alert('请上传图片');
                    return false;
                }
                if (this.size > 8 * 1024 * 1024) {
                    weui.alert('请上传不超过8M的图片');
                    return false;
                }
                if (files.length>8) {
                    weui.alert('最多只能上传8张图片，请重新选择');
                    return false;
                }
                if(commumal.uploader+1>8){
                    weui.alert('最多只能上传8张图片');
                    return false;
                }
                ++commumal.uploader;
            },
            onProgress: function onProgress(procent) {

            },
            onSuccess:opts.success,
            onError: function onError(err) {

            }
        });
    },
    onShowImg(e){
        var $target = $(e.target);
        while (!$target.hasClass('weui-uploader__file') && $target) {
            $target = $target.parent();
        }
        if (!$target.length) return;

        var url = $target.attr('style') || '';
        var id = $target.data('id');


        if (url) {
            url = url.match(/url\((.*?)\)/)[1].replace(/"/g, '');
        }
        var gallery = weui.gallery(url, {
            onDelete: function onDelete() {
                weui.confirm('确定删除该图片？', function () {
                    $target.remove();
                    --commumal.uploader;
                    gallery.hide();
                });
            }
        });
    },
    urlencode(str){
        str = (str + '').toString();
        return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
        replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
    },
    back(){
        history.go(-1)
    },
    confirm(opts){
       $picker= weui.confirm("", {
            title:opts.title||"是否确定提交?",
            buttons: [{
                label: '取消',
                type: 'default',
            }, {
                label: '确定',
                type: 'primary',
                onClick:opts.click
            }]
        });
    },
    datePicker(opts){
       let date=moment().format("YYYY-MM-DD").split("-");
       let dateTime=opts.dateTime;
       let start=new Date().getFullYear();
       $picker=weui.datePicker({
          start:start,
          end:2032,
          defaultValue:dateTime==""?[date[0], date[1], date[2]]:[dateTime[0],dateTime[1],dateTime[2]],
          onConfirm:(result)=>{
              opts.confirm(result)
          },
          id:opts.id
       })
    },
    reimbursePicker(opts){
        $picker=weui.picker(opts.data,{
            depth: 1,
            defaultValue:opts.default,
            onConfirm(result){
                opts.confirm(result)
            },
            id:opts.id
        })
    },
    isThrough(){
        let boff=$("#switchCP").prop("checked");
        if(boff){
            $("label.result").text("审核通过")
        }else{
            $("label.result").text("审核不通过")
        }
    },
    notice(){
        $.defs.myPost({
            m:"SELECT",
            SP_NAME:"SP_DPPS_ALARM_SHOW"
        }).then((data)=>{
            $(".lingdang").html(data[0].WCOUNT)
            if(data[0].WCOUNT==0){
                $(".lingdang").hide()
            }else{
                if(!localStorage.getItem("status")){
                    commumal.noticeList()
                }
                localStorage.setItem("status","notRefresh")
               
            }
        })
    },
    noticeList(){
        $.defs.loadingshow();
        $.defs.myPost({
            m:"SELECT",
            SP_NAME:"SP_DPPS_ALARM_SHOW",
            TYPE:"list"
        }).then((data)=>{
             $.defs.loadinghide();
             let outhtml=commumal.noticeListHtml(data)
           $picker=weui.dialog({
                title: '消息',
                content: outhtml.html(),
                className: 'custom-classn',
                buttons: [{
                    label: '关闭',
                    type: 'primary',
                }]
            });
            $($picker).find(".weui-dialog__bd").addClass("padding0");
            $($picker).find(".weui-cell").on("click",function(){
                var $item=$(this).closest(".weui-cell");
                var oaType=$item.attr("index");
                window.location.href="../index/audited";
                localStorage.setItem("audited",oaType)  //不用url传参是为了避免这个和缓存冲突
                $picker.hide()
            })
             

        })
    },
    noticeListHtml(data){
        let html=""
         data.forEach((item)=>{
             if(item.OA_LINK){
                  html+=`
                   <div class="weui-cell weui-cell_access borTine f12" index="${item.OA_TYPE}">
                    <div class="weui-cell__bd">
                       <span>${item.OA_TYPE_DESC}</span>
                       <span class="ml10 weui-badge">${item.WCOUNT}</span>
                    </div>
                     <div class="weui-cell__ft"></div>
                   </div>
                  `
             }
         })
         let outHtml=`<div  class="tips dn">
                       <div class="weui-cells"></div>
                    </div>`
        let $out=$(outHtml);
        $out.find(".weui-cells").append(html);
        return $out
    },
    versionAndNotice(){
        var ver =localStorage.getItem("version")?localStorage.getItem("version"):0;
        if(versionUpdate.config.versionNumber>ver){
            localStorage.setItem("version",versionUpdate.config.versionNumber);
            versionUpdate.events.version(commumal.notice)
        }else{
            commumal.notice()
        }
    },
    loadDate:function () {  //other模块
        var span=$(".seledate").find("span")
         var day=new Date()
        var date=day.getDate()
        var month=day.getMonth();
        var year=day.getFullYear()
        if(month==11){
            month=-1;
            year=year+1
        }
        $.each(span,function (i,v) {
            var index = $(v).attr('data-index');
            if(index==1){
                $(v).attr("data-start",moment().subtract(date-1, 'd').format('YYYY-MM-DD'))
                $(v).attr("data-end",moment([year,month+1,1]).subtract(1,"d").format('YYYY-MM-DD'))
            }else if(index==2){
                $(v).attr("data-start",moment().subtract(date-1, 'd').subtract(1,"M").format('YYYY-MM-DD'))
                $(v).attr("data-end",moment().subtract(date,"d").format('YYYY-MM-DD'))
            }else if(index==3){
                $(v).attr("data-start",moment().subtract(date-1, 'd').subtract(2,"M").format('YYYY-MM-DD'))
                $(v).attr("data-end",moment([year,month+1,1]).subtract(1,"d").format('YYYY-MM-DD'))
            }
        })
        commumal.timeFrame()
    },
    spanSelect:function () {  //other模块选择时间范围
        $(this).addClass("seleted").siblings().removeClass("seleted")
        commumal.timeFrame()
    },
    timeFrame:function () {//other模块
        var start=$(".seleted").attr("data-start");
        var end=$(".seleted").attr("data-end");
        $(".shijian span").html(start+"至"+end)
    },
    
}
$(function(){
    window.addEventListener('resize', function () {
        if(document.activeElement.tagName === 'INPUT'||document.activeElement.tagName === 'TEXTAREA'){
            document.activeElement.scrollIntoView({behavior: "smooth"})
        }
    })
    $("h2.back").off("click").on("click",commumal.back);
    window.onhashchange=function(e){
        $.hidebox()
         if($picker){
              $picker.hide()
         }
    }
    $(".lingdang").off("click").on("click",()=>{
        commumal.noticeList()
    })
    let path=location.protocol+'//'+location.host+'/login';
    if(document.referrer!=path){
        commumal.notice()
    }
    setInterval(()=>{
        commumal.notice()
    },900000)
})
export {commumal,descroll,Applyer,listWindow,addition,versionUpdate} 
