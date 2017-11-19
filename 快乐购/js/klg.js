$(".toplb span em").click(function(){
	$(".toplb span").hide()
})
$(".toprb").mousemove(function(){
	$(".toprb p").show()
})
$(".toprb").mouseout(function(){
	$(".toprb p").hide()
})
$(".toprc").mousemove(function(){
	$(".toprc ul").show()
	$(".topr .toprc").addClass("to")
})

$(".toprc").mouseout(function(){
	$(".toprc ul").hide()
	$(".topr .toprc").removeClass("to")
})
/*以下是轮播图*/

			var focusBanner=function(){
				var $focusBanner=$(".focus-banner"),
					$bannerList=$(".focus-banner-list li"),
					$focusHandle=$(".focus-handle"),
					$bannerImg=$(".focus-banner-img"),
					$nextBnt=$(".next-img"),
					$prevBnt=$(".prev-img"),
					$focusBubble=$(".focus-bubble"),
					bannerLength=$bannerList.length,
					_index=0,
					_timer="";

					var _height=$(".focus-banner-img").find("img").height();
					$focusBanner.height(_height);
					$bannerImg.height(_height);

					$(window).resize(function(){
						window.location.reload()
					});

					for(var i=0; i<bannerLength; i++){
						$bannerList.eq(i).css("zIndex",bannerLength-i);
						$focusBubble.append("<li></li>");
					}
					$focusBubble.find("li").eq(0).addClass("current");
					var bubbleLength=$focusBubble.find("li").length;
					$focusBubble.css({
						"width":bubbleLength*22,
						"marginLeft":-bubbleLength*11
					});//初始化

					$focusBubble.on("click","li",function(){
						$(this).addClass("current").siblings().removeClass("current");
						_index=$(this).index();
						changeImg(_index);
					});//点击轮换

					$nextBnt.on("click",function(){
						_index++
						if(_index>bannerLength-1){
							_index=0;
						}
						changeImg(_index);
					});//下一张

					$prevBnt.on("click",function(){
						_index--
						if(_index<0){
							_index=bannerLength-1;
						}
						changeImg(_index);
					});//上一张

					function changeImg(_index){
						$bannerList.eq(_index).fadeIn(250);
						$bannerList.eq(_index).siblings().fadeOut(200);
						$focusBubble.find("li").removeClass("current");
						$focusBubble.find("li").eq(_index).addClass("current");
						clearInterval(_timer);
						_timer=setInterval(function(){$nextBnt.click()},5000)
					}//切换主函数
					_timer=setInterval(function(){$nextBnt.click()},5000)
			}();
/*以下是定位在轮播图上面的内容*/		
$(".bannerg").mousemove(function(){
	var num=$(this).index();
	$(".bannerc").eq(num).show();
	$(".bannerg").mouseout(function(){
	
	$(".bannerc").eq(num).hide()
})
})
/*以下是突然出现的搜索框*/
/*以下是今日直播*/
   $(function(){
   	var num=0;
   	$(".aright").click(function(){
   		num++;
   		if(num>2){
   			num=0;
   		}
   	 $(".seedtab ul").animate({
   	 	left:-1200*num,
   	 })
   	})
   	$(".aleft").click(function(){
   		num--;
   		if(num<0){
   			num=2;
   		}
   	     $(".seedtab ul").animate({
   	 	left:-1200*num,
   	 })
   	})
   })
/*以下是限时抢购*/
$(".xsqg_title ul li").mousemove(function(){
	$(this).addClass("on").siblings().removeClass("on");
	var num=$(this).index();
	$(".xsqg_tab ul").eq(num).addClass("xsqgon").siblings().removeClass("xsqgon");
})
/*限时抢购里面的倒计时*/
 
 /*以下是新品推荐*/
$(".newgroom_list li").mousemove(function(){
	$(this).addClass("goodList").siblings().removeClass("goodList");
	$(".newgroom_list li").mouseout(function(){
		$(this).removeClass("goodList")
	})
})
/*以下是精选活动*/
$(".newselect").find("li").mousemove(function(){
	$(this).find(".select5").show();
	$(".newselect li").mouseout(function(){
		$(this).find(".select5").hide();
	})
})
