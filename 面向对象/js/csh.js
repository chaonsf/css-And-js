$(document).ready(function(){
	//游戏区域初始化
	Common.$mainbox.width(Common.width*Common.box);
	Common.$mainbox.height(Common.height*Common.box);
	//生成蛇和食物对象
	Common.snake=new Snake();
	Common.snake.create();
	Common.food=new Food();
	Common.food.create();
	Common.timer=setInterval(function(){
		Common.snake.move();
	},Common.speed)
	$(document).swipe({
		swipe:function(){
			var direction=arguments[1];
			Common.snake.dir=direction;
			Common.snake.move();
		}
	})
})
