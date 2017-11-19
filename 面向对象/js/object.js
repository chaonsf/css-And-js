var Common={
	width:20,
	height:20,
	box:15,
	speed:300,
	timer:null,
	snake:null,
	food:null,
	$mainbox:$(".mainbox")
}
function Snake(){
	this.$head=null;/*蛇头*/
	this.tail=[]; /*存蛇尾*/
	this.dir="right";/*代表运动方向*/
	this.pos={
		x:0,
		y:0
	}         /*代表蛇头的位置*/
}
Snake.prototype={
	/*c创建蛇头对象*/
   create:function(){
   	this.$head=$("<span class='snakehead'></span>");
   	this.$head.css({
   		height:Common.box,
   		width:Common.box,
   		left:this.pos.x,
   		top:this.pos.y
   	});
   	Common.$mainbox.append(this.$head)
   },
   /*移动*/
move:function(){
	var pos={
		x:this.pos.x,
		y:this.pos.y
	}
	switch(this.dir){
		case "up":this.pos.y-=Common.box; break;
		case "down":this.pos.y+=Common.box; break;
		case "left":this.pos.x-=Common.box; break;
		case "right":this.pos.x+=Common.box;break;
	};
	this.$head.css({
		top:this.pos.y,
		left:this.pos.x,
	})
	this.collidListener();/*碰撞监听*/
	this.tailsmove(pos);/*蛇尾的运动*/
},
collidListener:function(){
	if(this.pos.x<0||this.pos.x>(Common.width-1)*Common.box||this.pos.y<0||this.pos.y>(Common.height-1)*Common.box){
		this.over();
	}
	if(this.pos.y==Common.food.pos.y&&this.pos.x==Common.food.pos.x){
		this.eat();
	}
	if(this.tails.length){
		for(var i=0;i<this.tails.length;i++){
			if(parseInt(this.tails[i].css("left"))=this.pos.x&&parseInt(this.tails[i].css("top"))=this.pos.y){
				this.over();
			}
		}
	}
},
/*吃食物*/
eat:function(){
	this.addTails();
	Common.food.update();
},
//游戏结束
over:function(){
	clearInterval(Common.timer);
	alert("game over");
},
/*添加蛇尾*/
addTails:function(){
	var tail=$("<span class="snake"></span>");
	Common.$mainbox.append(tail);
	this.tails.push(tail);
	tail.css({
		width:Common.box,
		height:Common.box
	})
}
/*蛇尾运动*/
tailsmove:function(){
	if(this.tails.length){
   var las=this.tails.length-1    /*数组的最后一个值*/
      this.tails[las].css({
      	 left:pos.x,
      	 top:pos.y
      })
      this.tails.unshift(this.tails.pop())
	}
},
}
//蛇对象完成
//以下是食物对象
function Food(){
	this.$el=null;
	this.pos={
		x:0,
		y:0
	}
}
Food.prototype={
	create:function(){
		this.$el=$("<span class="food"></span>");
		this.createPosition();
		this.$el.css({
			width:Common.box,
			height:Common.box,
			left:this.pos.x,
			top:this.pos.y
		})
		Common.$mainbox.append(this.$el);
	},
	//更新食物
   update:function(){
   	 this.createPosition();
   	 this.$el.css({
   	 	left:this.pos.x,
   	 	top:this.pos.y
   	 })
   },
   //生成食物坐标
   createPosition:function(){
   	var x=Math.floor(Math.random()*Common.width*Common.box);
   	var y=Math.floor(Math.random()*Common.width*Common.box);
   	 this.pos={
   	 	x:x,
   	 	y:y
   	 }
   }
}
