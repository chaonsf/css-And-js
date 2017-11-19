  var Head=document.getElementsByClassName("head")[0];
  var aspan=document.getElementsByTagName("span")[0];
  aspan.onclick=function(){
  	Head.style.display="none";
  }
  
var adiv=document.getElementsByClassName("uyi")[0];
var itop=document.getElementById("top");
var aspana=itop.getElementsByTagName("span")[0];
var aul=itop.getElementsByClassName("dizhi")[0];
var aa=itop.getElementsByTagName("a");
adiv.onmousemove=function(){
	aul.style.display="block";
	for( var i=0;i<aa.length;i++){
		aa[i].index=i;
		aa[i].onclick=function(){
			this.style.background="red"
			this.style.color="#fff"
			aspana.innerHTML=this.innerHTML;
			for(var j=0;j<aa.length;j++){
				if(j!=this.index){
					aa[j].style.background="";
				    aa[j].style.color="";
				}
			}	
		}
	}
}
adiv.onmouseout=function(){
	aul.style.display="none";
}

