
import axios from "axios";

$.defs={
      ajax(opt){
          let opts=opt||{};
          let obj={
              method:opts.type||'post',
              url:opts.url||"../api/json",
              responseType: opts.dataType || 'json',
              data:opts.data ||{}
          }
          
           if( opts.type =='post'){
                 obj.data =opts.data||{}
            }else{
              obj.params = opts.data || {}
           }
          axios(obj).then((res)=>{
               if(res.status==200){
                    if(opts.success){
                        opts.success(res.data,res)
                    }
               }
          }).catch((error)=>{
              $.defs.msg(error)
          })
          
      },
      msg(content){
          let html=`
            <div id="toasta">
              <div class="weui-mask_transparent"></div>
              <div class="weui-toast" style="width: 110px">
                 <i class="weui-icon-info-circle" style="margin-top:0.2rem"></i>
                 <p class="weui-toast__content">${content}</p>
               </div>
            </div>
          `
          let $html=$(html);
          $(document.body).append($html);
          setTimeout(function() {
            $html.find("#toasta").fadeOut(1000)
            $html.remove()
         }, 2000);
      },
      loadingshow(content){
        let _content=content||"数据加载中"
        let html=`
        <div id="loadingToast">
           <div class="weui-mask_transparent"></div>
          <div class="weui-toast">
             <i class="weui-loading weui-icon_toast"></i>
             <p class="weui-toast__content">${_content}</p>
          </div>
       </div>
        `
        let $html=$(html);
        $(document.body).append($html);
      },
      loadinghide(){
        $('#loadingToast').remove();
      },
      selectOption(data, key, name){
         var optionHtml = "";
        for (var i = 0; i < data.length; i++) {
            optionHtml += "<option value='" + data[i][key] + "'>" + data[i][name] + "</option>"
        }
         return optionHtml
      },
      myGet(param,url){
          let _url=url||$.defs.url;
          return new Promise((resolve,reject)=>{
               axios.get(_url,param).then((res)=>{
                    resolve(res.data)
               })
               .catch((err)=>{
                   reject(err)
               })
          })
      },
      myPost(param,url){
          let _url=url|| $.defs.url;
          return new Promise((resolve,reject)=>{
              axios.post(_url,param).then((res)=>{
                   resolve(res.data)
              })
              .catch((err)=>{
                  reject(err)
              })
          })
      },
      url:"../api/json",
      submit(opt){   //获取某个容器里的数据
          let opts=opt||{};
          let container=opts.container||'body';
          let param={};
          $.each($(container).find('[field]'),(i,v)=>{
            var item = $(v);
            var key = item.attr('field');
            if(key){
                var value = $.defs.getValue(item);
                 param[key] = value;
             }
             
          })
          return param

      },
      getValue(item){
          let param;
          if(item.is('select')){
              param= item.find('option:selected').val()
          }else if(item.is('input')){
              param= item.val();
          }else{
            param = item.html();
          }
          return param;
      },
      fillData(opts){
         let container=opts.container||'body';
         let data=opts.data ||{};
         $.each($(container).find('[field]'),(i,v)=>{
              let item=$(v);
              let key=item.attr("field");
              if(key){
                  $.defs.setValue(item,data[key])
              }
         })
      },
      setValue(item,data){
           if(item.is('select')){
               item.val(data)
           }else if(item.is('input')){
               item.val(data)
           }else{
               item.text(data)
           }
      },
      getQueryString(url){//获取url完整参数
        var url = url|| window.location.href;
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
      }
}
