function move(obj,attr,target){
			clearInterval(obj.timer);
			obj.timer=setInterval(function(){
				var speed=(target-parseInt(getStyle(obj,attr)))/8;
				var speedInt=speed>0?Math.ceil(speed):Math.floor(speed);
				if(parseInt(obj.style[attr])==target){
					clearInterval(obj.timer);
				}else{
					obj.style[attr]=parseInt(getStyle(obj,attr))+speedInt+"px";
				}
			},50)
		}
		function getStyle(obj,attr){
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj)[attr];
			}
			
		}
		
        function aa(){
        	return document.getElementsByClassName();
        }
     aa("li0")[0].onmouseover=function(){
     	
     }
