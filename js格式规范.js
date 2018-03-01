在这上面可以写全局变量之类的或者 $(function(){})
!(function(){
   var title={ 
       methods:{
           init:function(){
           }
 
      },
      events:{
        //写函数
      }，
       configs:{
         init:function(){
            
          }
      }
     $(function(){
      title.configs.init();
      title.methods.init();
     })

}(jQuery, window))