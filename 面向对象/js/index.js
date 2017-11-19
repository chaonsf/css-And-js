function move(obj,attr,target){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				var speed=(target-parseInt(getStyle(obj,attr)))/8;
				var speedInt=speed>0?Math.ceil(speed):Math.floor(speed);
				if(parseInt(obj.style[attr]==target)){
					clearInterval(obj.timer)
				}else{
					obj.style[attr]=parseInt(getStyle(obj,attr))+speedInt+"px"
				}
			},50)
		}
		function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr]
			}else{
				return getComputedStyle(obj)[attr]
			}
		}
		function $(obj){
			return document.getElementById(obj)
		}
		function startMove(obj,json,fnEnd){
			//每次调用的时候，就需要只有一个定时器在工作，（开始运动时候关闭所有定时器）
			//并且关闭或开启都是当前物体的定时器，防止与页面上其他定时器冲突，使每个定时器互不干扰。
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				var bStop=true; //假设所有的都已经到达目标了。
				for(var name in json){
					var iTarget=json[name] //所有的目标点
				 if(name=="opacity"){
				 	var cur=parseInt(parseFloat(getStyle(obj,name))*100)
				 }else{
				 	var cur=parseInt(getStyle(obj,name))   //cur是当前移动的数值
				 }
				 var speed=(iTarget-cur)/10;   
				 //物体运动的速度，数字越小运动的越慢。
				 speed=speed>0?Math.ceil(speed):Math.floor(speed);
				 if(name=="opacity"){
				 	obj.style.opacity=(cur+speed)/100
				 }else{
				 	obj.style[name]=cur+speed+"px";
				 }
				 //某个值不等于目标点
			     if(cur!=iTarget){
			     	bStop=false;
			     }
				}
				
			     if(bStop){
			     	clearInterval(obj.timer);
			     	if(fnEnd){
			     		fnEnd();
			     	}
			     }
			},20)
		}


