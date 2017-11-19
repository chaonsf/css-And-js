var acity=document.getElementsByClassName("city")[0];
var aa=acity.getElementsByClassName("aa")[0];
var aul=acity.getElementsByTagName("ul")[0];
var al=aul.getElementsByTagName("a");
var boff=true;
aa.onclick=function(){
	 aa.index=10;
	if(boff){
		aul.style.display="block";
	for(var i=0;i<al.length;i++){
		al[i].index=i;
		al[i].onclick=function(){
			aa.innerHTML=al[this.index].innerHTML;
		}
	}
      
	}else{
		aul.style.display="none";
	}
	boff=!boff;
	
}
document.onclick=function(){
	if(aa.index!=10){
		aul.style.display="none";
		boff=true;
		}
		aa.index=""
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

var nava=document.getElementsByClassName("nav")[0];
var bli=nava.getElementsByTagName("li");
var da=nava.getElementsByTagName("a")
var ap=nava.getElementsByTagName("p")[0];
var awith=parseInt(getStyle(bli[0],"width"));
var awitho=parseInt(getStyle(bli[4],"width"));
var alo=parseInt(getStyle(ap,"left"));
var num=0;
for(var i=0;i<bli.length;i++){
			bli[i].index=i;
			bli[i].onmousemove=function(){
				ap.style.display="block"; 
				if(this.index<bli.length-1){
					num=this.index*awith;
					ap.style.width=awith+"px";
				}else{
					num=(this.index-1)*awith+awitho;
					ap.style.width=awitho+"px";
				}
			num=this.index*(awith+50);
				startMove(ap,{
					left:num
				},3000)
			}
			bli[i].onmouseout=function(){
				ap.style.display="none";
			}
		}
/*bannner轮播图*/
var qul=document.getElementsByClassName("qul")[0];
var qli=qul.getElementsByTagName("li");
var left=document.getElementsByClassName("left")[0];
var right=document.getElementsByClassName("right")[0];
var quo=document.getElementsByClassName("quo")[0];
var cli=quo.getElementsByTagName("li");
var aaa=0;
var time=null;
 function abcd(){
 	for(var i=0;i<qli.length;i++){
 		qli[i].style.display="none";
 	}
 	aaa++;
 	if(aaa==qli.length){
 		aaa=0;
 	}
 	qli[aaa].style.display="block"
 	for(var i=0;i<cli.length;i++){
 		if(i!=aaa){
 			cli[i].style.background="#ccc"
 		}else{
 			cli[i].style.background="#fff"
 		}
 	}
 }
 time=setInterval(abcd,2000);
left.onclick=function(){
	
	for(var i=0;i<qli.length;i++){
		qli[i].style.display="none";
	}aaa--;
	if(aaa==-1){
		aaa=qli.length-1
	}
	qli[aaa].style.display="block";
	for(var i=0;i<cli.length;i++){
		cli[i].style.background="#ccc"
	}cli[aaa].style.background="#fff";
	clearInterval(time);
	time=setInterval(abcd,2000);
}
right.onclick=function(){
	for(var i=0;i<qli.length;i++){
				qli[i].style.display="none";
			}
			aaa++;
			if(aaa==qli.length){
				aaa=0;
			}
			qli[aaa].style.display="block";
			for(var i=0;i<cli.length;i++){
				cli[i].style.background="#ccc";
			}
			  cli[aaa].style.background="#fff";
			  clearInterval(time);
	time=setInterval(abcd,2000);
}
/*轮播图上的搜索*/
var sa=document.getElementsByClassName("s3")[0];
var dli=sa.getElementsByTagName("li");
var dul=sa.getElementsByTagName("ul")[0];
sa.onclick=function(){
	dul.style.display="block";
	for(var i=0;i<dli.length;i++){
		dli[i].index=i;
		dli[i].onclick=function(){
			sa.innerHTML=dli[this.index].innerHTML;
			dul.style.display="none";
		}
	}
}
/*以下是小轮播图*/
var eul=document.getElementsByClassName("cul")[0];
var eli=eul.getElementsByTagName("li");
var ful=document.getElementsByClassName("dul")[0];
var fli=ful.getElementsByTagName("li");
var bb=0;
var tim=null;
function abc(){
			for( var i=0;i<eli.length;i++){
				eli[i].style.display="none";
			}
			bb++
			if(bb==eli.length){
				bb=0;
			}
			eli[bb].style.display="block";
		}
tim=setInterval(abc,4000);
/*以下是选项卡*/
var ayu=document.getElementsByClassName("main1center")[0];
var adiv=ayu.getElementsByTagName("div")
var gul=ayu.getElementsByClassName("gul")[0];
var gli=gul.getElementsByTagName("li");
for(var i=0;i<gli.length;i++){
	gli[i].index=i;
	gli[i].onmousemove=function(){
		for(var j=0;j<gli.length;j++){
			adiv[j].style.display="none";
		}
		adiv[this.index].style.display="block"
	}
}
/*快速申请的职业身份*/
var tyq=document.getElementsByClassName("tyq")[0];
var aspan=tyq.getElementsByClassName("aa3")[0];
var hul=aspan.getElementsByTagName("ul")[0];
var hli=hul.getElementsByTagName("li");
aspan.onclick=function(){
	hul.style.display="block";
	for(var i=0;i<hli.length;i++){
		hli[i].index=i;
		hli[i].onclick=function(){
			aspan.innerHTML=hli[this.index].innerHTML;
		}
	}
}
