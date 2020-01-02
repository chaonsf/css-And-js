var num=[1,2,3,4,5,4,6];
var everyResult=num.every(function(item,index,array){
   return (item>2);
})
console.log( everyResult);//false

var someResult=num.some(function(item,index,array){
   return (item>2);
})
console.log( someResult);//true

var filterResult=num.filter(function(item,index,array){
   return (item>2);
})
console.log( fikterResult);//[3,4,5,4,6]

var mapResult=num.map(function(item,index,array){
   return item*2;
})
console.log( mapResult);//[2,4,6,8,10,8,12]

num.forEach(function(item,index,array){
  //执行某些操作
})
//对数组的每一项运行给定函数，这个方法没有返回值
